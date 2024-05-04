const Replicate = require("replicate")
const axios = require('axios')
const fetch = require('cross-fetch')
require('cross-fetch/polyfill')
const { randomMilliomNumber, randomTopK } = require('../constants/index')

const API_URL = "https://api.replicate.com/v1"
//const REPLICATE_API_TOKEN = "8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05"
//REPLICATE_API_TOKEN=r8_NspMCV9GU85rGB0R4crd62Xs3xH3gz61ZLdfC
const REPLICATE_API_TOKEN="r8_dMW9NbOlXHQIttdSwTILZc8C4cUit5g2c4gKk"
const replicate = new Replicate({
    auth: REPLICATE_API_TOKEN,
    fetch: fetch,
});

const fetchModelVersion = async () => {
    try {
        const { data } = await axios({
            method: 'get',
            url: `${API_URL}/models/facebookresearch/musicgen/versions`,
            headers: {
                Authorization: `Token ${REPLICATE_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
        })

        return data ? data.results[0] : null
    } catch (error) {
        console.log(error)
    }

    return null
}

const generateReplicate = async (prompt, file) => {

    try {
        const getModel = await fetchModelVersion()

        let model = `meta/musicgen:${getModel.id}`;

        let input = {
            model_version: "large",
            prompt,
            duration: 30,
            continuation: false,
            continuation_start: 0,
            // continuation_end: 9,
            normalization_strategy: 'clip',
            top_k: randomTopK(),
            temperature: 1,
            classifier_free_guidance: 3,
            output_format: 'wav',
            seed: randomMilliomNumber(),
        };

        if (file) {
            // input.input_audio = file
            input = {
                model_version: "melody-large",
                // prompt,
                duration: 30,
                continuation: false,
                continuation_start: 0,
                // continuation_end: 9,
                normalization_strategy: 'clip',
                top_k: randomTopK(),
                temperature: 1,
                classifier_free_guidance: 3,
                output_format: 'wav',
                seed: randomMilliomNumber(),
                input_audio: file
            };
        }

        const output = await replicate.run(model, { input });

        return output
    } catch (e) {
        console.log('replicate error:', e)
        return false
    }
}

const getModel = async () => {
    try {
        const { data } = await axios({
            method: 'get',
            url: `${API_URL}/models/facebookresearch/musicgen`,
            headers: {
                Authorization: `Token ${REPLICATE_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
        })

        return data ? data.data : null
    } catch (error) {
        console.log(error)
    }

    return null
}

module.exports = {
    generateReplicate,
    getModel
}