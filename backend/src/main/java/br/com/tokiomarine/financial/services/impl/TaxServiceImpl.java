package br.com.tokiomarine.financial.services.impl;

import br.com.tokiomarine.financial.domain.Account;
import br.com.tokiomarine.financial.domain.Transfer;
import br.com.tokiomarine.financial.domain.dto.TransferInputDTO;
import br.com.tokiomarine.financial.repositories.TransferRepository;
import br.com.tokiomarine.financial.services.TaxService;
import br.com.tokiomarine.financial.services.exceptions.AccountNotFoundException;
import br.com.tokiomarine.financial.services.exceptions.TransferNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class TaxServiceImpl implements TaxService {

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private TaxTypeServiceImpl taxTypeService;

    @Autowired
    private AccountServiceImpl accountService;

    @Autowired
    private TransferRepository transferRepository;

    @Override
    public Transfer quote(TransferInputDTO transfer) {

        LocalDate schedulingDate = LocalDate.parse(transfer.getSchedulingDate());
        LocalDate transferCompletionDate = LocalDate.parse(transfer.getTransferCompletionDate());

        Double new_tax = taxTypeService.calculateTax(schedulingDate, transferCompletionDate, transfer.getTransferValue());

        Optional<Account> originAccount = accountService.findByNumber(transfer.getOriginAccount());
        Optional<Account> destinationAccount = accountService.findByNumber(transfer.getDestinationAccount());


        Transfer transfer_new = mapper.map(transfer, Transfer.class);

        if(originAccount.isPresent()){
            transfer_new.setOriginAccount(originAccount.get());
        } else {
            throw new AccountNotFoundException("Origin account number does not exist.");
        }

        if(destinationAccount.isPresent()){
            transfer_new.setDestinationAccount(destinationAccount.get());
        } else {
            throw new AccountNotFoundException("Destination account number does not exist.");
        }


        transfer_new.setTax(new_tax);
        transfer_new.setSchedulingDate(schedulingDate);
        transfer_new.setTransferCompletionDate(transferCompletionDate);



        return transferRepository.save(transfer_new);
    }

    @Override
    public Transfer getQuotationById(Long id) {
        Optional<Transfer> transfer = transferRepository.findById(id);
        return transfer.orElseThrow(() -> new TransferNotFoundException("Transfer not found by id."));
    }

    @Override
    public List<Transfer> getAll() {
        return transferRepository.findAll();
    }
}
