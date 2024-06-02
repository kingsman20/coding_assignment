const { maximizeEarnings } = require("../jobs_left");

// Test function
const maximizeEarningsTests = () => {
  // Test case 1: Basic valid input
  let jobs = [
    [900, 1100, 100],
    [1100, 1300, 200],
    [1200, 1400, 300],
    [1300, 1500, 250],
  ];
  let expectedOutput = [1, 300];
  let result = maximizeEarnings(jobs);
  console.assert(
    JSON.stringify(result) === JSON.stringify(expectedOutput),
    `Test Case 1 Failed: Expected ${JSON.stringify(
      expectedOutput
    )}, but got ${JSON.stringify(result)}`
  );

  // Test case 2: No overlapping jobs
  jobs = [
    [900, 1000, 100],
    [1100, 1200, 200],
    [1300, 1400, 300],
  ];
  expectedOutput = [0, 0];
  result = maximizeEarnings(jobs);
  console.assert(
    JSON.stringify(result) === JSON.stringify(expectedOutput),
    `Test Case 2 Failed: Expected ${JSON.stringify(
      expectedOutput
    )}, but got ${JSON.stringify(result)}`
  );

  // Test case 3: All jobs overlap
  jobs = [
    [900, 1100, 100],
    [1000, 1200, 200],
    [1000, 1300, 300],
  ];
  expectedOutput = [2, 300];
  result = maximizeEarnings(jobs);
  console.assert(
    JSON.stringify(result) === JSON.stringify(expectedOutput),
    `Test Case 3 Failed: Expected ${JSON.stringify(
      expectedOutput
    )}, but got ${JSON.stringify(result)}`
  );

  // Test case 4: Single job
  jobs = [[900, 1100, 100]];
  expectedOutput = [0, 0];
  result = maximizeEarnings(jobs);
  console.assert(
    JSON.stringify(result) === JSON.stringify(expectedOutput),
    `Test Case 4 Failed: Expected ${JSON.stringify(
      expectedOutput
    )}, but got ${JSON.stringify(result)}`
  );

  console.log("All maximizeEarnings test cases passed");
};

module.exports = {
  maximizeEarningsTests,
};
