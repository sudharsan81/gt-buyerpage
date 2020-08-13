const {CloudFunctionsServiceClient} = require('@google-cloud/functions');
const client = new CloudFunctionsServiceClient();

async function listFunctions() {
    const [functions] = await client.listFunctions({
      parent: 'hackathon-trial-01',
      pageSize: 1,
      pageToken: '104319733153719768417',
    });
    console.info(functions);
  }
  
listFunctions();
