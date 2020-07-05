# README

Inspird by [mojo-resource](https://github.com/h2oai/h2o-tutorials/tree/master/tutorials/mojo-resource).

## Dependencies

* [Nodejs](https://nodejs.org/en/)
* [Docker for Desktop](https://www.docker.com/products/docker-desktop)

## Run

* Run frontend and backend

```sh
make docker
# navigate to http://localhost:3000 to see webapp
```

##  Test

```sh
# properties have to start with lowercase and match setters
curl -X POST localhost:8080/test -H 'x-model: GLM_1_AutoML_20200608_155614' -H 'Content-Type: application/json' -d '{"map": 55.3, "ldh": 340, "charlson_with_Age": 9, "pulseOx": 92, "egfr": 63, "troponin": 0.01, "ddimerIni": 1.24, "rr": 22, "mcv": 93.5, "calcium": 5.2}'
```

## Infrastructure

* Google CloudRun
* Service account permissions are setup based on [tutorial](https://github.com/GoogleCloudPlatform/github-actions/tree/master/example-workflows/cloud-run)
* DNS CNAME record for covid.saada.dev -> ghs.googlehosted.com.
* Setup domain mapping for UI service -> covid.saada.dev

## Todos

- [x] resolve maven compile issues
- [x] create a webserver that receives the user input
- [x] map inputs to row columns
- [x] parse prediction output
- [x] return death probability values
- [x] frontend
- [ ] (eventually) store input data in a database
- [ ] google analytics
