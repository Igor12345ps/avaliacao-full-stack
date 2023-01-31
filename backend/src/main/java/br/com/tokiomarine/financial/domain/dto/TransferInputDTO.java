package br.com.tokiomarine.financial.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransferInputDTO {

    private String originAccount;

    private String destinationAccount;

    private Double transferValue;

    private String transferCompletionDate;

    private String schedulingDate;

}