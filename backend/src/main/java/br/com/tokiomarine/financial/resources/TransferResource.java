package br.com.tokiomarine.financial.resources;

import br.com.tokiomarine.financial.domain.Transfer;
import br.com.tokiomarine.financial.domain.dto.TransferInputDTO;
import br.com.tokiomarine.financial.domain.dto.TransferOutputDTO;
import br.com.tokiomarine.financial.services.impl.TaxServiceImpl;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transfers")
public class TransferResource {

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private TaxServiceImpl taxService;


    @PostMapping
    public ResponseEntity<?> quote(@RequestBody TransferInputDTO transfer) {
        Transfer transferDone = taxService.quote(transfer);
        TransferOutputDTO transferOutputDTO = new TransferOutputDTO();
        transferOutputDTO.setOriginAccount(transferDone.getOriginAccount().getNumber());
        transferOutputDTO.setDestinationAccount(transferDone.getDestinationAccount().getNumber());
        transferOutputDTO.setId(transferDone.getId());
        transferOutputDTO.setTransferValue(transferDone.getTransferValue());
        transferOutputDTO.setTax(transferDone.getTax());
        transferOutputDTO.setTransferCompletionDate(transferDone.getTransferCompletionDate());
        transferOutputDTO.setSchedulingDate(transferDone.getSchedulingDate());

        return ResponseEntity.ok().body(transferOutputDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransferOutputDTO> getQuotationById(@PathVariable Long id) {
        return ResponseEntity.ok().body(mapper.map(taxService.getQuotationById(id), TransferOutputDTO.class));
    }

    @GetMapping
    public ResponseEntity<List<TransferOutputDTO>> getAll(){
        return ResponseEntity.ok().body(taxService.getAll().stream().map(x -> mapper.map(x, TransferOutputDTO.class)).toList());
    }

}
