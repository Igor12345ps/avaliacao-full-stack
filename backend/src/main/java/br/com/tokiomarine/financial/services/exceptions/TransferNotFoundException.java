package br.com.tokiomarine.financial.services.exceptions;

public class TransferNotFoundException extends RuntimeException{

    public TransferNotFoundException(String message) {
        super(message);
    }
}
