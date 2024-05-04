const { openai } = require('../services/openai')
const { queryVectors } = require('../services/pinecone')
const embeddingData = require('../processed/filtered_prudential_embedding.json')
const ws = require('@es-labs/node/services/websocket')

const { CONTEXT_MAX } = global.CONFIG
const getCompletion = async (prompt, sessionId) => {
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.9,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: ["\n"]
    });

    return completion.data.choices[0].text
  }catch(e) {
    console.log("getCompletion", e.response.data)
    sendError(e.response.data, sessionId)
  }
}

const getEmbedding = async (data, message) => {
  try {
    let str = message
    /* for(var item of data) {
      str += ' ' + item.message
    } */

    console.log("str", str)
    const response = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: str,
    })
    return response.data.data[0].embedding
  }catch(e) {
    console.log("getEmbedding", e)
  }
  
}

const create_context = async (embedding) => {
  try {
    const rv = await queryVectors(embedding)
    let context = []
    let urlArray = []
    // console.log('URL ARRAY 1', urlArray)
    let curr_len = 0
    for(var item of rv) {
      let json = embeddingData[Number(item.id)]
      // console.log('JSON> ', json.id, json.url)
      curr_len += Number(json.tokens)
      if(curr_len > CONTEXT_MAX) {
        break;
      }
      context.push(json.data)

      if(!urlArray.includes(json.url)) {
        if(rv[0].score < 0.7) { // idk if this is correct > if score < 0.77 then it is out of context
          urlArray.push('www.prudential.com.sg')
        }
        urlArray.push(json.url)
      }
    }
    console.log("url", urlArray)
    return {context: context.join("\n\n###\n\n"), urlArray: urlArray }
  }catch(e) {
    console.log("create_context", e.toString())
  }
}

const checkName = async (name) => {
  try {
    name = name[0].toUpperCase() + name.slice(1)
    let prompt = `Reply with yes or no, whether the input is a name or not.\n\nInput: James\nAnswer: Yes\n\nInput: Home\nAnswer: No\n\nInput: ke qing\nAnswer: Yes\n\nInput: Town\nAnswer: No\n\nInput: wei ling\nAnswer:  Yes\n\nInput: Ken\nAnswer: Yes\n\nInput: Jonathan\nAnswer: Yes\n\nInput: ${name}\nAnswer: `
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.9,
      max_tokens: 10,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: ["Input", "\n", "."]
    });
    console.log('Name input', name)
    console.log('Name result', completion.data.choices[0].text)
    if(completion.data.choices[0].text.toLowerCase().includes('no')) {
      return false
    }else {
      return true
    }

  }catch(e) {
    console.log('checkName', e.response.statusText)
    console.log("checkName", e.response.data)
  }
}

const checkProfession = async (profession) => {
  try {
    let prompt = `Reply with yes or no, whether the input is a profession.\n\nInput: Doctor\nAnswer: Yes\n\nInput: Home\nAnswer: No\n\nInput: Sales\nAnswer: Yes\n\nInput: Town\nAnswer: No\n\nInput: developer\nAnswer:  Yes\n\nInput: ${profession}\nAnswer: `
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.9,
      max_tokens: 10,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: ["Input", "\n", "."]
    });
    if(completion.data.choices[0].text.toLowerCase().includes('no')) {
      return false
    }else {
      return true
    }
  } catch (error) {
    console.log("checkProfession", e.response.data)
  }
}

const checkNationality = async (nationality) => {
  try {
    let prompt = `Reply either yes or no if the question is a nationality or country.\n\nQuestion: Singaporean\nAnswer: yes\n\nQuestion: Malyasian\nAnswer:  yes\n\nQuestion: Malay\nAnswer:  No\n\nQuestion: American\nAnswer:  Yes\n\nQuestion Switzeland\nAnswer:  Yes\n\nQuestion: Singapore\nAnswer: Yes\n\nQuestion: ${nationality}\nAnswer: `
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.9,
      max_tokens: 10,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: ["Question"]
    });
    console.log('Nationality', completion.data.choices[0].text)
    if(completion.data.choices[0].text.toLowerCase().includes('no')) {
      return false
    }else {
      return true
    }

  }catch(e) {
    console.log("checkNationality", e.response.data)
  }
}

const sendWsReply = (data, sessionId) => {
  try {
    ws.send(JSON.stringify(data), sessionId)
  }catch(e) {
    console.log("e: sendWsReply", e.toString())
  }
}

const sendError = async (data, sessionId) => {
  sendWsReply({
    error: 'Openai Error',
    message: data.error.message
  }, sessionId)
}

module.exports = {
  getCompletion,
  getEmbedding,
  checkName,
  create_context,
  checkNationality,
  checkProfession
}
