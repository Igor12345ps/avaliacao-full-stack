package br.com.tokiomarine.financial.services;

import java.time.LocalDate;

public interface TaxTypeService {

    Object calculateTax(LocalDate schedulingDate, LocalDate transferCompletionDate, Double transferValue);

}
