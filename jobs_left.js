const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const calculateJobsAndEarningsLeft = () => {
  let jobs = [];
  let currentJob = [];
  let inputCount = 0;
  let numberOfJobs;

  console.log("Enter the number of Jobs (1-99): ");

  rl.on("line", (input) => {
    if (!numberOfJobs) {
      numberOfJobs = parseInt(input);
      if (isNaN(numberOfJobs) || numberOfJobs <= 0 || numberOfJobs >= 100) {
        console.log(
          "Invalid number of jobs. Please enter a number between 1 and 99: "
        );
        numberOfJobs = undefined;
      } else {
        console.log("Enter job start time, end time, and earnings");
      }
    } else {
      currentJob.push(input);
      inputCount++;

      if (inputCount % 3 === 0) {
        const startTime = currentJob[0];
        const endTime = currentJob[1];
        const earnings = parseInt(currentJob[2]);

        if (isValidJob(startTime, endTime, earnings)) {
          jobs.push([parseInt(startTime), parseInt(endTime), earnings]);
          currentJob = [];
          if (jobs.length === numberOfJobs) {
            const result = maximizeEarnings(jobs);
            console.log(
              "The number of tasks and earnings available for others"
            );
            console.log(`Task: ${result[0]}`);
            console.log(`Earnings: ${result[1]}`);
            rl.close();
          } else {
            console.log("Enter job start time, end time, and earnings");
          }
        } else {
          console.log(
            "Invalid job entry. Ensure start time is less than end time, and times are in HHMM format. Earnings must be a positive number."
          );
          currentJob = [];
          inputCount -= 3;
        }
      }
    }
  });
};

// Function to validate the time input
function isValidTime(time) {
  return (
    /^[01][0-9][0-5][0-9]$|^[2][0-3][0-5][0-9]$/.test(time) &&
    parseInt(time) <= 2359
  );
}

// Function to validate the job inputs
function isValidJob(startTime, endTime, earnings) {
  return (
    isValidTime(startTime) &&
    isValidTime(endTime) &&
    startTime < endTime &&
    !isNaN(earnings) &&
    earnings > 0
  );
}

/**
 * Function to perform a binary search to find the latest job that doesn't conflict with the given job
 * @param {*} jobs list of jobs
 * @param {*} currentIndex current index
 * @returns number
 */
const findNonOverlappingJob = (jobs, currentIndex) => {
  let low = 0,
    high = currentIndex - 1;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (jobs[mid][1] <= jobs[currentIndex][0]) {
      if (jobs[mid + 1][1] <= jobs[currentIndex][0]) {
        low = mid + 1;
      } else {
        return mid;
      }
    } else {
      high = mid - 1;
    }
  }
  return -1;
};

/**
 * Main function to find the jobs John will take and the remaining jobs for other employees
 * @param {*} jobs list of jobs from the console
 * @returns [number_of_remaining_jobs, remaining_earnings]
 */
const maximizeEarnings = (jobs) => {
  // Sort jobs by end time
  jobs.sort((a, b) => a[1] - b[1]);

  // Initialize DP array
  const n = jobs.length;
  const dp = new Array(n).fill(0);
  dp[0] = jobs[0][2];

  // Fill DP array
  for (let i = 1; i < n; i++) {
    let profitIncludingCurrentJob = jobs[i][2];
    const nonOverlappingIndex = findNonOverlappingJob(jobs, i);
    if (nonOverlappingIndex != -1) {
      profitIncludingCurrentJob += dp[nonOverlappingIndex];
    }
    dp[i] = Math.max(dp[i - 1], profitIncludingCurrentJob);
  }

  // Find the jobs included in the optimal solution
  let jobsSelected = [];
  let i = n - 1;
  while (i >= 0) {
    if (i == 0 || dp[i] != dp[i - 1]) {
      jobsSelected.push(jobs[i]);
      const nonOverlappingIndex = findNonOverlappingJob(jobs, i);
      i = nonOverlappingIndex;
    } else {
      i--;
    }
  }
  jobsSelected.reverse(); // To maintain the order of selection

  // Calculate remaining jobs and earnings for other employees
  const remainingJobs = jobs.filter((job) => !jobsSelected.includes(job));
  const remainingEarnings = remainingJobs.reduce((sum, job) => sum + job[2], 0);

  return [remainingJobs.length, remainingEarnings];
};

module.exports = {
  calculateJobsAndEarningsLeft,
  maximizeEarnings,
};
