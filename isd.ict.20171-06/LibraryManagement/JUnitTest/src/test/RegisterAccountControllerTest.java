package test;

import org.junit.Before;
import org.junit.Test;

import raijin.RegisterAccountController;

import static org.junit.Assert.*;

public class RegisterAccountControllerTest {

    private RegisterAccountController registerAccountController;

    @Before
    public void setUp() throws Exception {
        registerAccountController = new RegisterAccountController();
    }

    @Test
    public void checkEmailTestCase1() throws Exception {
        assertEquals(true, registerAccountController.checkEmail("hungcq1996@gmail.com"));
    }

    @Test
    public void checkEmailTestCase2() throws Exception {
        assertEquals(false, registerAccountController.checkEmail("hungcq1996.com"));
    }

    @Test
    public void checkGenderTestCase1() throws Exception {
        assertEquals(true, registerAccountController.checkGender("M"));
    }

    @Test
    public void checkGenderTestCase2() throws Exception {
        assertEquals(false, registerAccountController.checkGender("B"));
    }

    @Test
    public void checkGenderTestCase3() throws Exception {
        assertEquals(false, registerAccountController.checkGender("M1"));
    }

    @Test
    public void checkGenderTestCase4() throws Exception {
        assertEquals(false, registerAccountController.checkGender("B12312"));
    }

    @Test
    public void checkContactTestCase1() throws Exception {
        assertEquals(true, registerAccountController.checkContact("0123456789"));
    }

    @Test
    public void checkContactTestCase2() throws Exception {
        assertEquals(false, registerAccountController.checkContact("0123abc789"));
    }
}