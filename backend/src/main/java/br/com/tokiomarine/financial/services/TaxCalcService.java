package br.com.tokiomarine.financial.services;

public interface TaxCalcService {

    Double calculate(Double transferValue, int days);
}
