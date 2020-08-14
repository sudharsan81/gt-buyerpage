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
      console.log('\n-> Gumtree Buyer web application is up and running.');
      console.log(`\n-> Gumtree Buyer url : ${url}`);

      if(status === 'ACTIVE') {
          console.log('\n-> Starting tests.......🤞\n\n');
          const testcases = [
            'Checking the title',
            'Checking the Post Ad Button',
            'Checking the Login/Register Button',
            'Checking the buttons in Message centre',
            'Checking the Auto text in Message centre',
            'Checking the Favourite butto',
            ];
            testcases.forEach(async (test) => {
                let invokeTest = `gcloud functions call gumtreeBuyerPageTest --data='{"url": "${url}", "tag":"${newFn}", "scenario":"${test}"}'`;
                const { stdout, stderr } = await exec(invokeTest);
                console.log('stdout:', stdout.trim());
                console.log('stderr:', stderr.trim());
                await sleep(1200);
                console.log('\n');
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
