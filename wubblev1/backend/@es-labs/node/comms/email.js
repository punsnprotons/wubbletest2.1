'use strict'

const axios = require('axios')
let key
let sender

function setupSendGrid(options = global.CONFIG) {
  const { SENDGRID_KEY, SENDGRID_SENDER } = options || {}
  key = SENDGRID_KEY
  sender = SENDGRID_SENDER
}

async function sendSendGrid(to, from, subject, text, html) {
  try {
    let type, value
    if (!key) return
    if (!from) from = sender
    if (text) type = 'text/plain'; value = text
    if (html) type = 'text/html'; value = html 
    const body = {
      personalizations: [
        { to: [{ email: to }] }
      ],
      from: { email: from },
      subject,
      content: [{"type": type, "value": value}]
    }
    
    await axios.post('https://api.sendgrid.com/v3/mail/send', body, { headers: { Authorization: 'Bearer ' + key } })
    return true
  } catch (e) {
    console.log('sendMail err', e.toString(), key)
    return false
  }
}

async function sendDynamicTemplate(emailList, to,from,subject,text,html,templateId, emailData = {}) {
  try {
    let message
    if (!key) return
    if (!from) from = sender
    if (text) message = text
    if (html) message = html 
    const body = {
      personalizations: [
        { to: emailList,
          dynamic_template_data: {
            ...emailData,
            "message": message,
            "subject": subject,
          },
        },
      ],
      from: { email: from },
      "template_id":templateId
    }
    await axios.post('https://api.sendgrid.com/v3/mail/send', body, { headers: { Authorization: 'Bearer ' + key } })
    return true
  }catch(e) {
    console.log('sendMail err', e, key)
    return false
  }
}

// sendSendGrid('aaronjxz@gmail.com', 'eslabs.com@gmail.com', 'Subj', 'Test Message').then(a => console.log('ok', a)).catch(e => console.log('fail', e))

module.exports = {
  setupSendGrid,
  sendSendGrid,
  sendDynamicTemplate
}
