package br.com.tokiomarine.financial.util;

import java.util.Random;

public class AccountRandomNumberGen {

    public static int generateNumber() {
        Random random = new Random();
        return 100000 + random.nextInt(900000);
    }
}
