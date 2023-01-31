package br.com.tokiomarine.financial.services.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransferValueTax {

    private Double transferValue;
    private Double tax;

}
