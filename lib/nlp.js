const fs = require("fs");
const path = require("path");
const Probability = require("./probability"); // Import Probability class

// Load NLP dataset
function loadDataset(filePath) {
    const data = fs.readFileSync(filePath, "utf8").split("\n");
    let mappings = {};

    // Parse dataset format: [hoq, how] -> how
    const regex = /\[([^\]]+)\]\s*->\s*(\w+)/;

    data.forEach(line => {
        let match = line.match(regex);
        if (match) {
            let words = match[1].split(",").map(w => w.trim().toLowerCase());
            let correctWord = match[2].trim().toLowerCase();
            words.forEach(word => {
                mappings[word] = correctWord;
            });
        }
    });

    return mappings;
}

// Tokenizer and Corrector
function tokenizeAndCorrect(text, datasetPath) {
    let tokens = text.match(/\b\w+\b/g) || []; // Tokenize words
    tokens = tokens.map(token => token.toLowerCase()); // Convert to lowercase

    const wordMappings = loadDataset(datasetPath); // Load dataset

    let correctedTokens = tokens.map(token => {
        if (wordMappings[token]) {
            let correctWord = wordMappings[token];
            
            // Use probability to decide correction: 99% correct, 1% keep original
            let correction = Probability.randomExperiment([
                { word: correctWord, weight: 99 },  // 99% correct word
                { word: token, weight: 1 }         // 1% original word
            ]);

            return correction;
        }
        return token;
    });

    return correctedTokens;
}

// Update Probability.randomExperiment to handle weighted selection
Probability.randomExperiment = function (weightedOutcomes) {
    let totalWeight = weightedOutcomes.reduce((sum, item) => sum + item.weight, 0);
    let randomNum = Math.random() * totalWeight;
    let currentSum = 0;

    for (let item of weightedOutcomes) {
        currentSum += item.weight;
        if (randomNum <= currentSum) {
            return item.word;
        }
    }
};

// Example usage
const text = "Artifical Inteligence (AI) is a tehnolgy that givs compter sytems or mashines the capabilties of humn inteligance. Throuhg AI, mashins can larn, slove prblems, mke decisons and evn undrstand and genrate languge. The gol of AI is to crete sytems that can funtion withot humn intervension.";
const datasetPath = path.join(__dirname, "../data/nlp.txt");

console.log(tokenizeAndCorrect(text.toLowerCase(), datasetPath).join(" "));
//module.exports = nlp;