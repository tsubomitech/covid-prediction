FROM maven:3.2-jdk-8 as maven
COPY . /app/
WORKDIR /app
RUN mvn compile && mvn package
CMD mvn spring-boot:run

# FROM java:8-jre
# COPY . /app/
# COPY --from=maven /app/ /app
# WORKDIR /app