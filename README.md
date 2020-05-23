# README

Inspird by [mojo-resource](https://github.com/h2oai/h2o-tutorials/tree/master/tutorials/mojo-resource).

## Run

```sh
make
```

##  Test

```sh
curl -X POST localhost:8080/test -H 'Content-Type: application/json' -d '{"MAP": 55.3, "ldh": 340, "Charlson_with_Age": 9, "pulseOx": 92, "egfr": 63, "troponin": 0.01, "ddimerIni": 1.24, "rr": 22, "mcv": 93.5, "calcium": 5.2}'
# properties have to start with lowercase and match setters
curl -X POST localhost:8080/test -H 'Content-Type: application/json' -d '{"map": 55.3, "ldh": 340, "charlson_with_Age": 9, "pulseOx": 92, "egfr": 63, "troponin": 0.01, "ddimerIni": 1.24, "rr": 22, "mcv": 93.5, "calcium": 5.2}'
```

## Todos

- [x] resolve maven compile issues
- [x] create a webserver that receives the user input
- [x] map inputs to row columns
- [x] parse prediction output
- [x] return death probability values
- [x] frontend
- [ ] (eventually) store input data in a database
- [ ] google analytics