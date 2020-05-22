FROM maven:3.2-jdk-8 as maven
COPY . /app/
WORKDIR /app
RUN mvn compile && mvn package

FROM java:8-jre
COPY . /app/
COPY --from=maven /app/ /app
WORKDIR /app
CMD java -cp target/mojo-resource-1.0-SNAPSHOT.jar:libs/* Main