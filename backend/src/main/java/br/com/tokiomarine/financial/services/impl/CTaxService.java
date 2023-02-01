package br.com.tokiomarine.financial.services.impl;

import br.com.tokiomarine.financial.services.TaxCalcService;
import org.springframework.stereotype.Service;

@Service
public class CTaxService implements TaxCalcService {

    @Override
    public Double calculate(Double transferValue, int days) {
        double specific_tax;

        if (days > 10 && days <= 20){
            double percent = 8.2;
            specific_tax = ((transferValue * percent) / 100);
        } else if (days > 20 && days <= 30){
            double percent = 6.9;
            specific_tax = ((transferValue * percent) / 100);
        } else if (days > 30 && days <= 40){
            double percent = 4.7;
            specific_tax = ((transferValue * percent) / 100);
        } else {
            double percent = 1.7;
            specific_tax = ((transferValue * percent) / 100);
        }

        return specific_tax;
    }

}
