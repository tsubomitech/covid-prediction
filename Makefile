local:
	mvn spring-boot:run

docker:
	docker build -t kenji .
	docker run --rm -it -p 8080:8080 kenji

