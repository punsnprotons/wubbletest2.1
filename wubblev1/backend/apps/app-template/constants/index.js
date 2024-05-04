const modelVersion = [
    {
        id: 1,
        name: 'melody'
    },
    {
        id: 2,
        name: 'large'
    },
    {
        id: 3,
        name: 'encode-decode'
    },
]

const normalizationStrategy = [
    {
        id: 1,
        name: 'loudness'
    },
    {
        id: 2,
        name: 'clip'
    },
    {
        id: 3,
        name: 'peak'
    },
    {
        id: 4,
        name: 'rms'
    },
]

const outputFormat = [
    {
        id: 1,
        name: 'wav'
    },
    {
        id: 2,
        name: 'mp3'
    },
]

const randomMilliomNumber = () => Math.floor(Math.random() * 10000000) + 1
const randomTopK = () => {
    let min = 200;
    let max = 250;

    let randomNum = parseInt(Math.random() * (max - min) + min);
    return randomNum
}
const randomThousandNumber = () => Math.floor(Math.random() * 10000000) + 1

module.exports = {
    modelVersion,
    normalizationStrategy,
    outputFormat,
    randomMilliomNumber,
    randomTopK,
    randomThousandNumber
}