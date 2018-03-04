package raijin.librarymanagementsystem.controllers;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

/**
 * Created by 1918 on 05-Dec-17.
 */
public class RegisterControllerTest {

    private RegisterController registerController;

    @Before
    public void setUp() throws Exception {
        registerController = new RegisterController();
    }

    @Test
    public void checkUsernameTestCase1() throws Exception {
        assertEquals(true, registerController.checkUsername("hungcq"));
    }

    @Test
    public void checkUsernameTestCase2() throws Exception {
        assertEquals(false, registerController.checkUsername("_user1"));
    }

    @Test
    public void checkPasswordTestCase1() throws Exception {
        assertEquals(true, registerController.checkPassword("password"));
    }

    @Test
    public void checkPasswordTestCase2() throws Exception {
        assertEquals(false, registerController.checkPassword("abcd"));
    }

    @Test
    public void checkNameTestCase1() throws Exception {
        assertEquals(true, registerController.checkName("Chu Quoc Hung"));
    }

    @Test
    public void checkNameTestCase2() throws Exception {
        assertEquals(false, registerController.checkName("Invalid_name"));
    }

    @Test
    public void checkEmailTestCase1() throws Exception {
        assertEquals(true, registerController.checkEmail("hungcq1996@gmail.com"));
    }

    @Test
    public void checkEmailTestCase2() throws Exception {
        assertEquals(false, registerController.checkEmail("hungcq1996.com"));
    }

    @Test
    public void checkGenderTestCase1() throws Exception {
        assertEquals(true, registerController.checkGender("M"));
    }

    @Test
    public void checkGenderTestCase2() throws Exception {
        assertEquals(false, registerController.checkGender("B"));
    }

    @Test
    public void checkGenderTestCase3() throws Exception {
        assertEquals(false, registerController.checkGender("M1"));
    }

    @Test
    public void checkGenderTestCase4() throws Exception {
        assertEquals(false, registerController.checkGender("B12312"));
    }

    @Test
    public void checkContactTestCase1() throws Exception {
        assertEquals(true, registerController.checkContact("0123456789"));
    }

    @Test
    public void checkContactTestCase2() throws Exception {
        assertEquals(false, registerController.checkContact("0123abc789"));
    }

    @Test
    public void checkStudentIdTestCase1() throws Exception {
        assertEquals(true, registerController.checkStudentId("20142137"));
    }

    @Test
    public void checkStudentIdTestCase2() throws Exception {
        assertEquals(false, registerController.checkStudentId("2014213721"));
    }

    @Test
    public void checkStudentIdTestCase3() throws Exception {
        assertEquals(false, registerController.checkStudentId("20142abc"));
    }

    @Test
    public void checkStudentIdTestCase4() throws Exception {
        assertEquals(false, registerController.checkStudentId("20142137abc"));
    }

    @Test
    public void checkStudyPeriodTestCase1() throws Exception {
        assertEquals(true, registerController.checkStudyPeriod("2014-2019"));
    }

    @Test
    public void checkStudyPeriodTestCase2() throws Exception {
        assertEquals(false, registerController.checkStudyPeriod("2014"));
    }
}