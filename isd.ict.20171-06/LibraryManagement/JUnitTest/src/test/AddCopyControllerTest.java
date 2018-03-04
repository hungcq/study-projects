package test;

import org.junit.Test;
import org.junit.Before;

import raijin.AddCopyController;

import static org.junit.Assert.*;

public class AddCopyControllerTest {

    private AddCopyController addCopyController;

    @Before
    public void setUp() throws Exception {
        addCopyController = new AddCopyController();
    }

    @Test
    public void checkBookNumberTestCase1() throws Exception {
        assertEquals(true, addCopyController.checkBookNumber("XX1234"));
    }

    @Test
    public void checkBookNumberTestCase2() throws Exception {
        assertEquals(false, addCopyController.checkBookNumber("XX1a34"));
    }

    @Test
    public void checkBookNumberTestCase3() throws Exception {
        assertEquals(false, addCopyController.checkBookNumber("X@1234"));
    }

    @Test
    public void checkBookNumberTestCase4() throws Exception {
        assertEquals(false, addCopyController.checkBookNumber("X@1k34"));
    }

    @Test
    public void checkBookNumberTestCase5() throws Exception {
        assertEquals(false, addCopyController.checkBookNumber("XX1111abc"));
    }

    @Test
    public void checkBookNumberTestCase6() throws Exception {
        assertEquals(false, addCopyController.checkBookNumber("XX1a34def"));
    }

    @Test
    public void checkBookNumberTestCase7() throws Exception {
        assertEquals(false, addCopyController.checkBookNumber("X@1234ghi"));
    }

    @Test
    public void checkBookNumberTestCase8() throws Exception {
        assertEquals(false, addCopyController.checkBookNumber("X@1k34klm"));
    }

    @Test
    public void checkTypeTestCase1() throws Exception {
        assertEquals(true, addCopyController.checkType("B"));
    }

    @Test
    public void checkTypeTestCase2() throws Exception {
        assertEquals(false, addCopyController.checkType("A"));
    }

    @Test
    public void checkTypeTestCase3() throws Exception {
        assertEquals(false, addCopyController.checkType("B12ab"));
    }

    @Test
    public void checkTypeTestCase4() throws Exception {
        assertEquals(false, addCopyController.checkType(""));
    }

    @Test
    public void checkPriceTestCase1() throws Exception {
        assertEquals(true, addCopyController.checkPrice("700000"));
    }

    @Test
    public void checkPriceTestCase2() throws Exception {
        assertEquals(false, addCopyController.checkPrice("700abc00"));
    }
}