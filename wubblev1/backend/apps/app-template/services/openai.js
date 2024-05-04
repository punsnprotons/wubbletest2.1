const { Configuration, OpenAIApi } = require("openai");
const { OPENAI_API_KEY } = global.CONFIG

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = {
  openai
}