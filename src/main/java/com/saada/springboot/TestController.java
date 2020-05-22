package com.saada.springboot;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.net.URL;
import java.util.Map;

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

    @PostMapping("/test")
	public Response index(@RequestBody Request req) throws Exception {
        ObjectMapper oMapper = new ObjectMapper();
        oMapper.setVisibility(PropertyAccessor.FIELD, Visibility.ANY);

        System.out.println(req.toString());
        RowData row = oMapper.convertValue(req, new TypeReference<RowData>(){});
        // RowData row = new RowData();
        // row.putAll(requestMap);
        return execute(row);
    }


    public Response execute(RowData row) throws Exception {
        URL mojoURL = TestController.class.getResource("GBM_1_AutoML_20200521_175236.zip");
        MojoReaderBackend reader = MojoReaderBackendFactory.createReaderBackend(mojoURL, MojoReaderBackendFactory.CachingStrategy.MEMORY);
        MojoModel model = ModelMojoReader.readFrom(reader);
        EasyPredictModelWrapper modelWrapper = new EasyPredictModelWrapper(model);
        BinomialModelPrediction prediction = (BinomialModelPrediction) modelWrapper.predict(row);

        Response res = new Response();
        res.probability0 = prediction.classProbabilities[0];
        res.probability1 = prediction.classProbabilities[1];
        return res;
    }
}