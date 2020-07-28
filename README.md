# README

Inspird by [mojo-resource](https://github.com/h2oai/h2o-tutorials/tree/master/tutorials/mojo-resource).

## Dependencies

* [Nodejs](https://nodejs.org/en/)
* [Docker for Desktop](https://www.docker.com/products/docker-desktop)

## Run

```sh
# run or restart frontend and backend
make docker

# navigate to http://localhost:3000 to see webapp

# stop everything
make docker-cleanup
```

##  Test

```sh
# properties have to start with lowercase and match setters
curl -X POST localhost:8080/test \
    -H 'x-model: GLM_1_AutoML_20200608_155614' \
    -H 'Content-Type: application/json' \
    -d '{"systolicBP": 120, "diastolicBP": 60, "age": 50, "BUN": 7, "LDH": 140, "pulseOx": 98, "cr": 0.9, "Charlson_Score": 3, "troponin": 0.5, "ddimer": 1.5}'
```

## Infrastructure

* Google CloudRun
* Service account permissions are setup based on [tutorial](https://github.com/GoogleCloudPlatform/github-actions/tree/master/example-workflows/cloud-run)
* DNS CNAME record for covid.saada.dev -> ghs.googlehosted.com.
* Setup domain mapping for UI service -> covid.saada.dev
* Create bucket called 'jib-cache' in us-central1
* Setup Cloud Scheduler job to talk to prediction api public url using service account on /models

## Contributor Notes

```sh
make fe # supports hot reloading
make be # not hot reloading yet
```
