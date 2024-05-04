'use strict'
const crypto = require('crypto')

let client

exports.setupStorage = (options = global.CONFIG) => {
  const { OSS_BUCKET, OSS_ACCESS_ID, OSS_ACCESS_KEY } = options || {}
  if (!client && OSS_ACCESS_ID && OSS_ACCESS_KEY) {
    const OSS = require('ali-oss');
    client = new OSS({
      // Set yourRegion to the endpoint of the region in which the bucket is located. For example, if your bucket is located in the China (Hangzhou) region, set yourRegion to oss-cn-hangzhou. 
      region: 'oss-ap-southeast-1',
      // Security risks may arise if you use the AccessKey pair of an Alibaba Cloud account to access OSS because the account has permissions on all API operations. We recommend that you use a RAM user to call API operations or perform routine operations and maintenance. To create a RAM user, log on to the RAM console. 
      accessKeyId: OSS_ACCESS_ID,
      accessKeySecret: OSS_ACCESS_KEY,
      // Specify the name of the bucket to which you want to upload the object. Example: examplebucket. 
      bucket: OSS_BUCKET,
    });
    if (client) {
      console.log(`OSS bucket ${OSS_BUCKET} connected!`)
    }
  }
}

exports.getUploadURL = async (req, res) => {
  const filename = req.body.filename
  const action = req.body.action
  if (!action || !filename) return res.status(400).json({ error: 'filename and action required' })
  try {
    let url
    const options = {
      expires: 7200, // 120 minutes
      method: 'PUT',
      'Content-Type': 'application/octet-stream'
    }

    if (action == 'write') {
      let arr = filename.split('.')
      arr[0] = crypto.createHash('sha256').update(arr[0] + new Date().getTime()).digest('hex')
      let newFilename = arr.join('.')
      url = await client.signatureUrl(newFilename, options)
    } else {
      url = await client.signatureUrl(filename)
    }

    return res.json(url)

  } catch (e) {
    return res.status(500).json({ error: e.toString() })
  }

}


exports.putBuffer = async (bufferedFile, fileName) => {
  try {
    console.log('put buffer filename:', fileName)
    let arr = fileName.split('.')
    arr[0] = crypto.createHash('sha256').update(arr[0] + new Date().getTime()).digest('hex')

    let ossFileName = arr.join('.')

    await client.put(ossFileName, Buffer.from(bufferedFile))

    return ossFileName
  } catch (e) {
    console.log('putBuffer error:', e.toString())
    return e.toString()
  }
}

exports.deleteFile = async (filename) => {
  try {
    let result = await client.delete(filename);
    return result
  } catch (e) {
    return e.toString()
  }
}

exports.getReadURL = async (filename) => {
  try {
    return await client.signatureUrl(filename)
  } catch (e) {
    return e.toString()
  }
}

exports.getObjectURL = async (filename) => {
  try {
    return await client.generateObjectUrl(filename)
  } catch (e) {
    return e.toString()
  }
}