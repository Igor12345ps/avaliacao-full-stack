package br.com.tokiomarine.financial.resources.Exceptions;

import br.com.tokiomarine.financial.services.exceptions.AccountNotFoundException;
import br.com.tokiomarine.financial.services.exceptions.ImpossibleToCalculateTaxException;
import br.com.tokiomarine.financial.services.exceptions.TransferNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class ResourceExceptionHandler {

    @ExceptionHandler(ImpossibleToCalculateTaxException.class)
    public ResponseEntity<StandardError> impossibleToCalculateTax(ImpossibleToCalculateTaxException ex, HttpServletRequest request){
        StandardError error = new StandardError(LocalDateTime.now(),
                HttpStatus.BAD_REQUEST.value(),
                ex.getMessage(),
                request.getRequestURI()
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    @ExceptionHandler(TransferNotFoundException.class)
    public ResponseEntity<StandardError> objectNotFound(TransferNotFoundException ex, HttpServletRequest request){
        StandardError error = new StandardError(LocalDateTime.now(),
                HttpStatus.NOT_FOUND.value(),
                ex.getMessage(),
                request.getRequestURI()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(AccountNotFoundException.class)
    public ResponseEntity<StandardError> accountNotFound(TransferNotFoundException ex, HttpServletRequest request){
        StandardError error = new StandardError(LocalDateTime.now(),
                HttpStatus.NOT_FOUND.value(),
                ex.getMessage(),
                request.getRequestURI()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
}
