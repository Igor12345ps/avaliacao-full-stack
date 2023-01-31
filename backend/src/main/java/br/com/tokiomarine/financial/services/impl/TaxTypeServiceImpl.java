package br.com.tokiomarine.financial.services.impl;

import br.com.tokiomarine.financial.services.TaxTypeService;
import br.com.tokiomarine.financial.services.dto.TransferValueTax;
import br.com.tokiomarine.financial.services.exceptions.ImpossibleToCalculateTaxException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;

@Service
public class TaxTypeServiceImpl implements TaxTypeService {

    @Override
    public TransferValueTax calculateTax(LocalDate schedulingDate, LocalDate transferCompletionDate, Double transferValue) {
        Period period = Period.between(schedulingDate, transferCompletionDate);
        int daysBetween = period.getDays();

        if(transferValue <= 1000){
            //TaxType A
            if (daysBetween == 0){
                ATaxService aTaxService = new ATaxService();
                return aTaxService.calculate(transferValue, daysBetween);
            } else {
                throw new ImpossibleToCalculateTaxException("There is no tax applicable to this situation in type A.");
            }
        } else if (transferValue > 1000 && transferValue <= 2000) {
            //TaxType B
            if (daysBetween <= 10){
                BTaxService bTaxService = new BTaxService();
                return bTaxService.calculate(transferValue, daysBetween);
            } else {
                throw new ImpossibleToCalculateTaxException("There is no tax applicable to this situation in type B.");
            }
        } else {
            //TaxType C
            if (daysBetween > 10) {
                CTaxService cTaxService = new CTaxService();
                return cTaxService.calculate(transferValue, daysBetween);
            } else {
                throw new ImpossibleToCalculateTaxException("There is no tax applicable to this situation in type C.");
            }
        }
    }

}
