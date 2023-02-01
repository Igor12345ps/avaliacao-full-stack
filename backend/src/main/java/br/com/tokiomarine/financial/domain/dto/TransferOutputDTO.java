package br.com.tokiomarine.financial.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransferOutputDTO {

    private Long id;

    private String originAccount;

    private String destinationAccount;

    private Double transferValue;

    private Double tax;

    private LocalDate transferCompletionDate;

    private LocalDate schedulingDate;

}