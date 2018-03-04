package raijin.librarymanagementsystem.controllers;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

/**
 * Created by 1918 on 05-Dec-17.
 */
public class BorrowInfoControllerTest {

    private BorrowInfoController borrowInfoController;

    @Before
    public void setUp() {
        borrowInfoController = new BorrowInfoController();
    }

    @Test
    public void checkUnreturnedBookTestCase1() throws Exception {
        assertEquals(true, borrowInfoController.checkUnreturnedBook("rt1918"));
    }

    @Test
    public void checkUnreturnedBookTestCase2() throws Exception {
        assertEquals(false, borrowInfoController.checkUnreturnedBook("huynq123"));
    }

    @Test
    public void checkLentNumberTestCase1() throws Exception {
        assertEquals(true, borrowInfoController.checkLentNumber("customer2"));
    }

    @Test
    public void checkLentNumberTestCase2() throws Exception {
        assertEquals(false, borrowInfoController.checkLentNumber("customer1"));
    }

}