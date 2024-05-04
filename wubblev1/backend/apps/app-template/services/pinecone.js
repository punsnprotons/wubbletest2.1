require('cross-fetch/polyfill')
const { PineconeClient } = require('pinecone-client')
const { PINECONE_API_KEY } = global.CONFIG
const embeddings = require('../processed/filtered_prudential_embedding.json')

const pinecone = new PineconeClient({
  apiKey: PINECONE_API_KEY,
  baseUrl: 'https://prudential-08330a5.svc.us-west1-gcp-free.pinecone.io',
  namespace: 'prudential'
});

//Pinecones Functions

const upsertVectors = async () => {
  let pinconearray = []
  for(var [index,item] of embeddings.entries()) {
    let vector = {
      id: String(index),
      metadata: {},
      values: item.embeddings
    }
    pinconearray.push(vector)
  }
  const upsertrequest = {
    "vectors": pinconearray
  };
  try {
    let rv = await pinecone.upsert(upsertrequest);
    //console.log("rv", rv)
  }catch(e) {
    console.log("upsertVectors", e.toString())
  }
}
upsertVectors()
const queryVectors = async (vector) => {
  try {
    let rv = await pinecone.query({
      topK: 10,
      vector: vector,
      namespace: 'prudential'
    })
    /*let context = []
     for(var item of rv.matches) {
      if(item.score > 0.8) {
        context.push(item)
      }
    } 
    console.log("context", context)*/
    //console.log(rv.matches)
    return rv.matches
  }catch(e) {
    console.log(e.toString())
  }
}

module.exports = {
 queryVectors
}