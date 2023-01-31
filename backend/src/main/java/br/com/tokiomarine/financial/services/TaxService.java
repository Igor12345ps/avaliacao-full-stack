package br.com.tokiomarine.financial.services;

import br.com.tokiomarine.financial.domain.Transfer;
import br.com.tokiomarine.financial.domain.dto.TransferInputDTO;

import java.util.List;

public interface TaxService {

    Transfer quote(TransferInputDTO transfer);

    Transfer getQuotationById(Long id);

    List<Transfer> getAll();

}
