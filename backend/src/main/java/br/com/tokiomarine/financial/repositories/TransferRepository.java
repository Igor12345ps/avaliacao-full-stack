package br.com.tokiomarine.financial.repositories;

import br.com.tokiomarine.financial.domain.Transfer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransferRepository extends JpaRepository<Transfer, Long> {
}
