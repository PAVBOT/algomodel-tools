class Probability {
    static randomExperiment(outcomes) {
        return outcomes[Math.floor(Math.random() * outcomes.length)];
    }
  
    static sampleSpace(...outcomes) {
        return new Set(outcomes);
    }
  
    static probability(eventCount, totalCount) {
        if (totalCount === 0) throw new Error("Total count cannot be zero.");
        return eventCount / totalCount;
    }
  
    static classicalProbability(favorable, total) {
        return Probability.probability(favorable, total);
    }
  
    static empiricalProbability(eventOccurrences, totalTrials) {
        return Probability.probability(eventOccurrences, totalTrials);
    }
  
    static additionRule(pA, pB, pAandB = 0) {
        return pA + pB - pAandB;
    }
  
    static multiplicationRule(pA, pBgivenA) {
        return pA * pBgivenA;
    }
  
    static conditionalProbability(pAandB, pB) {
        if (pB === 0) throw new Error("P(B) cannot be zero.");
        return pAandB / pB;
    }
  
    static bayesTheorem(pBgivenA, pA, pB) {
        if (pB === 0) throw new Error("P(B) cannot be zero.");
        return (pBgivenA * pA) / pB;
    }
}
module.exports = Probability; // <-- This ensures it's exported properly