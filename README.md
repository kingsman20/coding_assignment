# Coding Assignment

NB: You can also find the HD quality of the video using the link
https://drive.google.com/file/d/1Kub_fA7cBhGra4bGavIIqCpGKInIDmmb/view?usp=sharing

## Problem 1:

Problem Statement: <br>
A factory has a list of jobs to perform. Each job has a start time, end time,
and profit value. The manager has asked his employee John to pick jobs of his choice. John
wants to select jobs for him in such a way that would maximize his earnings.
Given a list of jobs, how many jobs and total earnings are left for other employees once John
picks jobs of his choice.
Note: John can perform only one job at a time.

### Solution

The problem can be solved using two methods.

- Using a Greedy Algorithm
- Dynamic programming with interval scheduling maximization (weighted).

A greedy approach would always select the biggest jobs first but this might not be the optimal solution in some cases because there could be smaller jobs that would give John more earnings. So a Dynamic programming approach was chosen.

### Running solution to Problem 1

Clone the Repo

Enable the line below in `index.js` file

```
const { calculateJobsAndEarningsLeft } = require("./jobs_left");

calculateJobsAndEarningsLeft();
```

Next run the command `npm run start`

## Problem 2:

Problem Statement: <br />
Let&#39;s say the HR team of a company has goodies set of size N each with a different price tag for
each goodie. Now the HR team has to distribute the goodies among the M employees in the
company such that one employee receives one goodie. Find out the goodies the HR team can
distribute so that the difference between the low price goodie and the high price goodie selected
is minimum.

### Solution

The problem is solved by

- sorting the input
- using a sliding window.

### Running solution to Problem 1

Clone the Repo

Enable the line below in `index.js` file

```
const { minimizePriceDifference } = require("./minimize_price_difference");

 const inputFilePath = "sample-inputs-outputs/sample_input.txt";
 const outputFilePath = "sample-inputs-outputs/sample_output.txt";

 // Call the async main function and handle the promise
 (async () => {
   try {
     await minimizePriceDifference(inputFilePath, outputFilePath);
   } catch (err) {
     console.error("Error:", err.message);
   }
 })();
```

Next run the command `npm run start`

### End
