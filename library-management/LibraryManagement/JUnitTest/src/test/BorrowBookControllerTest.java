package test;

import org.junit.Before;
import org.junit.Test;

import raijin.BorrowBookController;

import static org.junit.Assert.*;

public class BorrowBookControllerTest {

    private BorrowBookController borrowBookController;

    @Before
    public void setUp() throws Exception {
        borrowBookController = new BorrowBookController();
    }

    @Test
    public void checkBookNumberTestCase1() throws Exception {
        assertEquals(true, borrowBookController.checkBookNumber("XX1234"));
    }

    @Test
    public void checkBookNumberTestCase2() throws Exception {
        assertEquals(false, borrowBookController.checkBookNumber("XX1a34"));
    }

    @Test
    public void checkBookNumberTestCase3() throws Exception {
        assertEquals(false, borrowBookController.checkBookNumber("X@1234"));
    }

    @Test
    public void checkBookNumberTestCase4() throws Exception {
        assertEquals(false, borrowBookController.checkBookNumber("X@1k34"));
    }

    @Test
    public void checkBookNumberTestCase5() throws Exception {
        assertEquals(false, borrowBookController.checkBookNumber("XX1111abc"));
    }

    @Test
    public void checkBookNumberTestCase6() throws Exception {
        assertEquals(false, borrowBookController.checkBookNumber("XX1a34def"));
    }

    @Test
    public void checkBookNumberTestCase7() throws Exception {
        assertEquals(false, borrowBookController.checkBookNumber("X@1234ghi"));
    }

    @Test
    public void checkBookNumberTestCase8() throws Exception {
        assertEquals(false, borrowBookController.checkBookNumber("X@1k34klm"));
    }
}