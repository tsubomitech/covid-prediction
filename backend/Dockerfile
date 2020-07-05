FROM maven:3.6.3-jdk-8-slim as maven
COPY . /app/
WORKDIR /app
RUN mvn compile && mvn package
CMD mvn spring-boot:run
