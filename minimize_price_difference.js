const fs = require("fs").promises;

// Function to read the input file
const readInputFile = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return data;
  } catch (err) {
    throw new Error(`Error reading input file: ${err.message}`);
  }
};

// Function to process goodies and find the optimal subset
const findOptimalGoodies = (data) => {
  const lines = data.split("\n").map((line) => line.trim());

  // Validate number of employees line
  if (lines.length < 1 || !lines[0].includes(":")) {
    throw new Error(
      "Invalid input: Missing or incorrect number of employees line"
    );
  }

  const numEmployees = parseInt(lines[0].split(":")[1].trim());
  if (isNaN(numEmployees) || numEmployees <= 0) {
    throw new Error(
      "Invalid input: Number of employees must be a positive integer"
    );
  }

  const goodies = [];
  for (let i = 2; i < lines.length; i++) {
    const [name, price] = lines[i].split(":");
    if (!name || !price) {
      throw new Error(
        `Invalid input: Goodie line "${lines[i]}" is not in the correct format`
      );
    }
    const priceValue = parseInt(price.trim());
    if (isNaN(priceValue) || priceValue < 0) {
      throw new Error(
        `Invalid input: Price "${price.trim()}" for goodie "${name.trim()}" is not a valid positive integer`
      );
    }
    goodies.push({ name: name.trim(), price: priceValue });
  }

  // Ensure there are enough goodies for the number of employees
  if (goodies.length < numEmployees) {
    throw new Error(
      "Invalid input: Not enough goodies for the number of employees"
    );
  }

  // Sort the goodies by price in ascending order
  goodies.sort((a, b) => a.price - b.price);

  // Initialize variables for tracking the minimum difference
  let minDiff = Infinity;
  let startIdx = 0;

  // Use a sliding window of size M to find the optimal subset
  for (let i = 0; i <= goodies.length - numEmployees; i++) {
    const diff = goodies[i + numEmployees - 1].price - goodies[i].price;
    if (diff < minDiff) {
      minDiff = diff;
      startIdx = i;
    }
  }

  // Extract the optimal subset of goodies
  const selectedGoodies = goodies.slice(startIdx, startIdx + numEmployees);

  return { selectedGoodies, minDiff };
};

// Function to write the output file
const writeOutputFile = async (filePath, selectedGoodies, minDiff) => {
  const output = [
    "The goodies selected for distribution are:",
    ...selectedGoodies.map((goodie) => `${goodie.name}: ${goodie.price}`),
    `And the difference between the chosen goodie with highest price and the lowest price is ${minDiff}`,
  ].join("\n");

  try {
    await fs.writeFile(filePath, output, "utf8");
    console.log("Output written to", filePath);
  } catch (err) {
    throw new Error(`Error writing output file: ${err.message}`);
  }
};

// Main function to read input, process goodies, and write output
const minimizePriceDifference = async (inputFilePath, outputFilePath) => {
  try {
    const data = await readInputFile(inputFilePath);
    const { selectedGoodies, minDiff } = findOptimalGoodies(data);
    await writeOutputFile(outputFilePath, selectedGoodies, minDiff);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  minimizePriceDifference,
  findOptimalGoodies,
};
