package br.com.tokiomarine.financial.resources;

import br.com.tokiomarine.financial.domain.Account;
import br.com.tokiomarine.financial.services.impl.AccountServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/accounts")
public class AccountResource {

    @Autowired
    private AccountServiceImpl accountService;


    @PostMapping
    public ResponseEntity<?> create() {
        return ResponseEntity.ok().body(accountService.create());
    }

    @GetMapping("/{number}")
    public ResponseEntity<?> getAccountByNumber(@PathVariable int number) {
        Optional<Account> account = accountService.findByNumber(number);
        if(account.isPresent()){
            return ResponseEntity.ok().body(account);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Account>> getAll(){
        return ResponseEntity.ok().body(accountService.findAll());
    }

}
