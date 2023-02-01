package br.com.tokiomarine.financial.services.impl;

import br.com.tokiomarine.financial.services.TaxCalcService;
import org.springframework.stereotype.Service;

@Service
public class BTaxService implements TaxCalcService {

    final Double FIX_TAX = 12.0;

    @Override
    public Double calculate(Double transferValue, int days) {
        return FIX_TAX;
    }
}
