const { findOptimalGoodies } = require("../minimize_price_difference");

// Test cases
const findOptimalGoodiesTests = () => {
  // Test case 1: Valid input
  let input = `Number of employees: 2\n\nGoodie1: 10\nGoodie2: 20\nGoodie3: 30\nGoodie4: 40`;
  let expectedOutput = {
    selectedGoodies: [
      { name: "Goodie1", price: 10 },
      { name: "Goodie2", price: 20 },
    ],
    minDiff: 10,
  };
  let result = findOptimalGoodies(input);
  console.assert(
    JSON.stringify(result) === JSON.stringify(expectedOutput),
    "Test Case 1 Failed"
  );

  // Test case 2: Invalid number of employees line
  input = `Number of employees 2\n\nGoodie1: 10\nGoodie2: 20`;
  try {
    findOptimalGoodies(input);
    console.assert(false, "Test Case 2 Failed");
  } catch (e) {
    console.assert(
      e.message ===
        "Invalid input: Missing or incorrect number of employees line",
      "Test Case 2 Failed"
    );
  }

  // Test case 3: Non-positive number of employees
  input = `Number of employees: 0\n\nGoodie1: 10\nGoodie2: 20`;
  try {
    findOptimalGoodies(input);
    console.assert(false, "Test Case 3 Failed");
  } catch (e) {
    console.assert(
      e.message ===
        "Invalid input: Number of employees must be a positive integer",
      "Test Case 3 Failed"
    );
  }

  // Test case 4: Not enough goodies
  input = `Number of employees: 3\n\nGoodie1: 10\nGoodie2: 20`;
  try {
    findOptimalGoodies(input);
    console.assert(false, "Test Case 4 Failed");
  } catch (e) {
    console.assert(
      e.message ===
        "Invalid input: Not enough goodies for the number of employees",
      "Test Case 4 Failed"
    );
  }

  // Test case 5: Invalid goodie line format
  input = `Number of employees: 2\n\nGoodie1: 10\nGoodie2 20`;
  try {
    findOptimalGoodies(input);
    console.assert(false, "Test Case 5 Failed");
  } catch (e) {
    console.assert(
      e.message ===
        'Invalid input: Goodie line "Goodie2 20" is not in the correct format',
      "Test Case 5 Failed"
    );
  }

  // Test case 6: Invalid goodie price format
  input = `Number of employees: 2\n\nGoodie1: 10\nGoodie2: twenty`;
  try {
    findOptimalGoodies(input);
    console.assert(false, "Test Case 6 Failed");
  } catch (e) {
    console.assert(
      e.message ===
        'Invalid input: Price "twenty" for goodie "Goodie2" is not a valid positive integer',
      "Test Case 6 Failed"
    );
  }

  console.log("All findOptimalGoodies test cases passed");
};

// Export the tests
module.exports = { findOptimalGoodiesTests };
