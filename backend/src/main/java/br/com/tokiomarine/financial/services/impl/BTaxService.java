package br.com.tokiomarine.financial.services.impl;

import br.com.tokiomarine.financial.services.TaxCalcService;
import br.com.tokiomarine.financial.services.dto.TransferValueTax;
import org.springframework.stereotype.Service;

@Service
public class BTaxService implements TaxCalcService {

    final Double FIX_TAX = 12.0;

    @Override
    public TransferValueTax calculate(Double transferValue, int days) {
        TransferValueTax new_transferValue = new TransferValueTax();
        new_transferValue.setTax(FIX_TAX);
        new_transferValue.setTransferValue(transferValue-FIX_TAX);
        return  new_transferValue;
    }
}
