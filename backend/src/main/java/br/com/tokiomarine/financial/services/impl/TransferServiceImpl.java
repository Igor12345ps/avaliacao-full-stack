package br.com.tokiomarine.financial.services.impl;

import br.com.tokiomarine.financial.domain.Account;
import br.com.tokiomarine.financial.domain.Transfer;
import br.com.tokiomarine.financial.domain.dto.TransferInputDTO;
import br.com.tokiomarine.financial.repositories.TransferRepository;
import br.com.tokiomarine.financial.services.TransferService;
import br.com.tokiomarine.financial.services.exceptions.AccountNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class TransferServiceImpl implements TransferService {

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private TaxTypeServiceImpl taxTypeService;

    @Autowired
    private AccountServiceImpl accountService;

    @Autowired
    private TransferRepository transferRepository;

    @Override
    public Transfer transfer(TransferInputDTO transfer) {

        LocalDate schedulingDate = LocalDate.parse(transfer.getSchedulingDate());
        LocalDate transferCompletionDate = LocalDate.parse(transfer.getTransferCompletionDate());

        Double new_tax = taxTypeService.calculateTax(schedulingDate, transferCompletionDate, transfer.getTransferValue());

        Optional<Account> originAccount = accountService.findByNumber(transfer.getOriginAccount());
        Optional<Account> destinationAccount = accountService.findByNumber(transfer.getDestinationAccount());


        Transfer transfer_new = mapper.map(transfer, Transfer.class);

        if(originAccount.isPresent()){
            transfer_new.setOriginAccount(originAccount.get());
        } else {
            throw new AccountNotFoundException("A conta de origem não existe.");
        }

        if(destinationAccount.isPresent()){
            transfer_new.setDestinationAccount(destinationAccount.get());
        } else {
            throw new AccountNotFoundException("A conta de destino não existe.");
        }


        transfer_new.setTax(new_tax);
        transfer_new.setSchedulingDate(schedulingDate);
        transfer_new.setTransferCompletionDate(transferCompletionDate);



        return transferRepository.save(transfer_new);
    }

    @Override
    public List<Transfer> getAll() {
        return transferRepository.findAll();
    }
}
