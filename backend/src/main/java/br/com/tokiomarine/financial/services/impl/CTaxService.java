package br.com.tokiomarine.financial.services.impl;

import br.com.tokiomarine.financial.services.TaxCalcService;
import br.com.tokiomarine.financial.services.dto.TransferValueTax;
import org.springframework.stereotype.Service;

@Service
public class CTaxService implements TaxCalcService {

    @Override
    public TransferValueTax calculate(Double transferValue, int days) {
        TransferValueTax new_transferValue = new TransferValueTax();

        if (days > 10 && days <= 20){
            double tax = 8.2;
            new_transferValue.setTransferValue(specificTaxCalculator(tax, transferValue));
            new_transferValue.setTax(tax);
        } else if (days > 20 && days <= 30){
            double tax = 6.9;
            new_transferValue.setTransferValue(specificTaxCalculator(tax, transferValue));
            new_transferValue.setTax(tax);
        } else if (days > 30 && days <= 40){
            double tax = 4.7;
            new_transferValue.setTransferValue(specificTaxCalculator(tax, transferValue));
            new_transferValue.setTax(tax);
        } else {
            double tax = 1.7;
            new_transferValue.setTransferValue(specificTaxCalculator(tax, transferValue));
            new_transferValue.setTax(tax);
        }

        return new_transferValue;
    }

    private Double specificTaxCalculator(Double tax, Double transferValue){
        return transferValue - ((transferValue * tax) / 100);
    }
}
