# README

Run

```sh
make
```

Test

```sh
curl -X POST localhost:8080/test -H 'Content-Type: application/json' -d '{"MAP": 55.3, "ldh": 340, "Charlson_with_Age": 9, "pulseOx": 92, "egfr": 63, "troponin": 0.01, "ddimerIni": 1.24, "rr": 22, "mcv": 93.5, "calcium": 5.2}'
# properties have to start with lowercase and match setters
curl -X POST localhost:8080/test -H 'Content-Type: application/json' -d '{"map": 55.3, "ldh": 340, "charlson_with_Age": 9, "pulseOx": 92, "egfr": 63, "troponin": 0.01, "ddimerIni": 1.24, "rr": 22, "mcv": 93.5, "calcium": 5.2}'
```