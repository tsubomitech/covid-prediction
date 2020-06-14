# backend
be:
	mvn spring-boot:run

# frontend
fe:
	cd frontend && npm run dev

docker:
	docker build -t kenji .
	docker run --rm -it -p 8080:8080 kenji

deploy-vercel:
	cd frontend && npx vercel

install:
	cd frontend && npm i