package br.com.tokiomarine.financial.services;

import br.com.tokiomarine.financial.domain.Account;

import java.util.List;
import java.util.Optional;

public interface AccountService {

    Account create();

    Optional<Account> findByNumber(int number);

    List<Account> findAll();
}
