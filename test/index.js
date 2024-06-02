const { findOptimalGoodiesTests } = require("./minimize_price_difference.test");
const { maximizeEarningsTests } = require("./jobs_left.test");

// Simple test runner
const runTests = (tests) => {
  tests.forEach((test, index) => {
    try {
      test();
      console.log(`Test suite ${index + 1} passed.`);
    } catch (error) {
      console.error(`Test ${index + 1} failed: ${error.message}`);
    }
  });
};

// Collect all tests from both modules
const allTests = [findOptimalGoodiesTests, maximizeEarningsTests];

// Run all tests
runTests(allTests);
process.exit(0);
