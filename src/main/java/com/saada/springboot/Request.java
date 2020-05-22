package com.saada.springboot;

public class Request {
    Double MAP;
    Double ldh;
    Double Charlson_with_Age;
    Double pulseOx;
    Double egfr;
    Double troponin;
    Double ddimerIni;
    Double rr;
    Double mcv;
    Double calcium;
    public void setMAP(String value) {
        this.MAP = Double.valueOf(value);
    }
    public void setLdh(String value) {
        this.ldh = Double.valueOf(value);
    }
    public void setCharlson_with_Age(String value) {
        this.Charlson_with_Age = Double.valueOf(value);
    }
    public void setPulseOx(String value) {
        this.pulseOx = Double.valueOf(value);
    }
    public void setEgfr(String value) {
        this.egfr = Double.valueOf(value);
    }
    public void setTroponin(String value) {
        this.troponin = Double.valueOf(value);
    }
    public void setDdimerIni(String value) {
        this.ddimerIni = Double.valueOf(value);
    }
    public void setRr(String value) {
        this.rr = Double.valueOf(value);
    }
    public void setMcv(String value) {
        this.mcv = Double.valueOf(value);
    }
    public void setCalcium(String value) {
        this.calcium = Double.valueOf(value);
    }

    public String toString() {
        return "MAP: " + this.MAP + " ldh: " + this.ldh;
    }
}