package br.com.tokiomarine.financial.services;

import br.com.tokiomarine.financial.services.dto.TransferValueTax;

public interface TaxCalcService {

    TransferValueTax calculate(Double transferValue, int days);
}
