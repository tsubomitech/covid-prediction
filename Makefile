# backend
be:
	cd backend && mvn spring-boot:run

# frontend
install:
	cd frontend && npm i

fe: install
	cd frontend && npm run dev

docker: docker-network docker-fe docker-be

docker-network:
	docker network create --driver bridge covid

docker-fe:
	cd frontend && docker build -t covid-prediction-ui .
	docker run --network covid -p 3000:3000 -d --name covid-prediction-ui covid-prediction-ui

docker-be:
	cd backend && docker build -t covid-prediction-api .
	docker run --network covid -p 8080:8080 -d --name covid-prediction-api covid-prediction-api

docker-cleanup:
	docker rm -f covid-prediction-ui covid-prediction-api
	docker network rm covid

deploy-vercel:
	cd frontend && npx vercel
