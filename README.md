# GT Buyer Page

## Install the project
```
> npm install
```

## Deploy the web app to GCP cloud functions
```
> npm run deploy
```

## Deploy the current state of app and start the tests
```
> node deploy.js
```

## Start from scratch
```
> npm install @google-cloud/functions-framework
>
> # - Create a new google project
> gcloud projects create hackathon-trial-01
>
> # - configure the project
> gcloud config set core/project hackathon-trial-01 
>
> # - Run the project locally
> npm install @google-cloud/functions-framework
> FUNCTION_TARGET=gumtreeBuyer npx @google-cloud/functions-framework 
```



