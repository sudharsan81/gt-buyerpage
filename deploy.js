const util = require('util');
const exec = util.promisify(require('child_process').exec);
const replace = require("replace");
const { stat } = require('fs');


let output = [];
let url;
let status;
let newFn = `gumtreeBuyerPage${getRandomInt(1000)}`;

replace({
    regex: "gumtreeBuyerPage",
    replacement: newFn,
    paths: ['index.js'],
    recursive: true,
    silent: true,
});

async function lsWithGrep() {
    console.log('-> Deploying GT Buyer web application to Google Serverless Runtime ☁️☁');
    console.log('\t This usually takes 120 seconds..');
  try {
      const { stdout, stderr } = await exec(`gcloud functions deploy \"${newFn}\" --trigger-http --runtime=\"nodejs10\" --memory=1024mb --allow-unauthenticated`);
    //   console.log('stdout:', stdout);
    //   console.log('stderr:', stderr || 'No Errors :)');
      replace({
        regex: newFn,
        replacement: "gumtreeBuyerPage",
        paths: ['index.js'],
        recursive: true,
        silent: true,
    });


      stdout.split("\n").forEach((line) => {
          output.push(line);
      });

      output.forEach((o) => {
          if(o.split(":")[0].trim() === 'url') {
              url = o.trim().replace('url:', ' ').trim();
          }

          if(o.split(":")[0].trim() === 'status') {
            status = o.split(":")[1].trim();
          }
      });

      console.log(`\n-> Deployment is successful. 👌`);
      console.log(`\n-> New Service can be accessed form : ${url}`);

      if(status === 'ACTIVE') {
          console.log('\n-> Starting tests.......🤞\n\n');
          const testcases = [
              'CHECK_TRADEMARK',
              'CHECK_CAROUSEL'
            ];
            testcases.forEach(async (test) => {
                let invokeTest = `gcloud functions call gumtreeBuyerPageTest --data='{"url": "${url}", "iteration":"${newFn}", "testid":"CHECK_TRADEMARK"}'`;
                const { stdout, stderr } = await exec(invokeTest);
                console.log('stdout:', stdout);
                console.log('stderr:', stderr);
                await sleep(1200);
            });

      }

  } catch (err) {
     console.error(err);
  };
};

lsWithGrep();


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
