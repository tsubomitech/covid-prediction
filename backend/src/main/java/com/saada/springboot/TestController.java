package com.saada.springboot;

import org.springframework.web.bind.annotation.RestController;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import hex.genmodel.*;
import hex.genmodel.easy.EasyPredictModelWrapper;
import hex.genmodel.easy.RowData;
import hex.genmodel.easy.prediction.BinomialModelPrediction;

@RestController
public class TestController {

    @GetMapping("/models")
    public ResponseEntity<String[]> listModels() throws IOException {
        String[] filenames = Files
            .list(Paths.get("src/main/resources/com/saada/springboot"))
            .filter(Files::isRegularFile)
            .map(p -> p.getFileName().toString())
            .filter(name -> name.endsWith(".zip"))
            .map(f -> f.replace(".zip", ""))
            .toArray(String[]::new);
        System.out.println(filenames);

        return new ResponseEntity<String[]>(filenames, HttpStatus.OK);
    }

    @PostMapping("/test")
    public Response index(@RequestBody Request req, @RequestHeader("x-model") String model) throws Exception {
        ObjectMapper oMapper = new ObjectMapper();
        oMapper.setVisibility(PropertyAccessor.FIELD, Visibility.ANY);

        RowData row = oMapper.convertValue(req, new TypeReference<RowData>() {
        });
        return execute(row, model);
    }

    public Response execute(RowData row, String model) throws Exception {
        URL mojoURL = TestController.class.getResource(model + ".zip");
        MojoReaderBackend reader = MojoReaderBackendFactory.createReaderBackend(mojoURL,
                MojoReaderBackendFactory.CachingStrategy.MEMORY);
        MojoModel mojoModel = ModelMojoReader.readFrom(reader);
        EasyPredictModelWrapper modelWrapper = new EasyPredictModelWrapper(mojoModel);

        System.out.println(row);
        BinomialModelPrediction prediction = modelWrapper.predictBinomial(row);

        Response res = new Response();
        res.probability0 = prediction.classProbabilities[0];
        res.probability1 = prediction.classProbabilities[1];
        return res;
    }
}