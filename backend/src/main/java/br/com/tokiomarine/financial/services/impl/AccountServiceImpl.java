package br.com.tokiomarine.financial.services.impl;

import br.com.tokiomarine.financial.domain.Account;
import br.com.tokiomarine.financial.repositories.AccountRepository;
import br.com.tokiomarine.financial.services.AccountService;
import br.com.tokiomarine.financial.util.AccountRandomNumberGen;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public Account create() {
        Account account = new Account();
        account.setNumber(AccountRandomNumberGen.generateNumber());
        return accountRepository.save(account);
    }

    @Override
    public Optional<Account> findByNumber(int number) {
        return accountRepository.findByNumber(number);
    }

    @Override
    public List<Account> findAll() {
        return accountRepository.findAll();
    }
}
