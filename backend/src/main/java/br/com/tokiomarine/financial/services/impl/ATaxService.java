package br.com.tokiomarine.financial.services.impl;

import br.com.tokiomarine.financial.services.TaxCalcService;
import br.com.tokiomarine.financial.services.dto.TransferValueTax;
import org.springframework.stereotype.Service;

@Service
public class ATaxService implements TaxCalcService {

    final Double FIX_TAX = 3.0;
    final Double percent = 3.0;

    @Override
    public TransferValueTax calculate(Double transferValue, int days) {
        TransferValueTax new_transferValue = new TransferValueTax();
        new_transferValue.setTax(FIX_TAX);

        Double new_transferValue_calc;
        new_transferValue_calc = transferValue - FIX_TAX;
        new_transferValue_calc = new_transferValue_calc - ((new_transferValue_calc * percent) / 100);
        new_transferValue.setTransferValue(new_transferValue_calc);

        return new_transferValue;
    }
}
