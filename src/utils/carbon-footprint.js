// Estimate carbon footprint (simplified calculation)
async function estimateCarbonFootprint(transferBytes) {
  // Average: 0.81 grams of CO2 per GB transferred (sustainable web design)
  const gbTransferred = transferBytes / (1024 * 1024 * 1024);
  const co2Grams = gbTransferred * 0.81;
  
  return {
    co2Grams: co2Grams.toFixed(4),
    rating: co2Grams < 0.5 ? 'Excellent' : co2Grams < 1.0 ? 'Good' : co2Grams < 2.0 ? 'Fair' : 'Poor'
  };
}

module.exports = {
  estimateCarbonFootprint
};
