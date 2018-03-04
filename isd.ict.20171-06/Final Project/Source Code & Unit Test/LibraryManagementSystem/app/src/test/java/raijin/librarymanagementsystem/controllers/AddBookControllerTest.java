package raijin.librarymanagementsystem.controllers;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class AddBookControllerTest {

    private AddBookController addBookController;

    @Before
    public void setUp() throws Exception {
        addBookController = new AddBookController();
    }

    @Test
    public void checkISBNTestCase1() throws Exception {
        assertEquals(true, addBookController.checkISBN("12345678901"));
    }

    @Test
    public void checkISBNTestCase2() throws Exception {
        assertEquals(false, addBookController.checkISBN("123456789abc"));
    }

    @Test
    public void checkISBNTestCase3() throws Exception {
        assertEquals(false, addBookController.checkISBN("12345678"));
    }

    @Test
    public void checkISBNTestCase4() throws Exception {
        assertEquals(false, addBookController.checkISBN("123456ab"));
    }

    @Test
    public void checkISBNTestCase5() throws Exception {
        assertEquals(false, addBookController.checkISBN("12345689012345"));
    }

    @Test
    public void checkISBNTestCase6() throws Exception {
        assertEquals(false, addBookController.checkISBN("1234567890123ab"));
    }

    @Test
    public void checkTypeTestCase1() throws Exception {
        assertEquals(true, addBookController.checkType("B"));
    }

    @Test
    public void checkTypeTestCase2() throws Exception {
        assertEquals(false, addBookController.checkType("A"));
    }

    @Test
    public void checkTypeTestCase3() throws Exception {
        assertEquals(false, addBookController.checkType("B12ab"));
    }

    @Test
    public void checkTypeTestCase4() throws Exception {
        assertEquals(false, addBookController.checkType(""));
    }

    @Test
    public void checkPriceTestCase1() throws Exception {
        assertEquals(true, addBookController.checkPrice("700000"));
    }

    @Test
    public void checkPriceTestCase2() throws Exception {
        assertEquals(false, addBookController.checkPrice("700abc00"));
    }

}