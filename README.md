Init
> npm install @google-cloud/functions-framework

Run local 
> FUNCTION_TARGET=gumtreeBuyer npx @google-cloud/functions-framework

> gcloud projects create hackathon-trial-01 # - Create a new google project
> gcloud config set core/project hackathon-trial-01 # - configure the project
> npm install @google-cloud/functions-framework
> FUNCTION_TARGET=gumtreeBuyer npx @google-cloud/functions-framework # - Run the project locally
> gcloud functions deploy "gumtreeBuyerPage" --trigger-http --runtime="nodejs10" --memory=1024mb # - Deploy the function in google cloud

