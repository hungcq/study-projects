package raijin.librarymanagementsystem.controllers;

import org.junit.Before;
import org.junit.Test;

import java.text.DecimalFormat;
import java.util.List;

import raijin.librarymanagementsystem.entities.Copy;
import raijin.librarymanagementsystem.entities.webservices.DataHandler;

import static org.junit.Assert.*;

/**
 * Created by 1918 on 05-Dec-17.
 */
public class CopyControllerTest {

    private CopyController copyController;

    @Before
    public void setUp() throws Exception {
        copyController = new CopyController();
    }

    @Test
    public void generateCopyNumberTestCase1() throws Exception {
        String bookNumber = "SC0001";
        String number = new DecimalFormat("00").format((getHighestCopyNumber(bookNumber) + 1) % 10);
        String copyNumber = bookNumber + number;
        assertEquals(copyNumber, copyController.generateCopyNumber(bookNumber));
    }

    @Test
    public void generateCopyNumberTestCase2() throws Exception {
        String bookNumber = "DR0001";
        String number = new DecimalFormat("00").format((getHighestCopyNumber(bookNumber) + 1) % 10);
        String copyNumber = bookNumber + number;
        assertEquals(copyNumber, copyController.generateCopyNumber(bookNumber));
    }

    @Test
    public void generateCopyNumberTestCase3() throws Exception {
        String bookNumber = "MA0001";
        String number = new DecimalFormat("00").format((getHighestCopyNumber(bookNumber) + 1) % 10);
        String copyNumber = bookNumber + number;
        assertEquals(copyNumber, copyController.generateCopyNumber(bookNumber));
    }

    @Test
    public void checkAvailableCopyTestCase1() throws Exception {
        assertEquals(false, copyController.checkAvailableCopy("SC0001"));
    }

    @Test
    public void checkAvailableCopyTestCase2() throws Exception {
        assertEquals(true, copyController.checkAvailableCopy("MA0001"));
    }

    private int getHighestCopyNumber(String bookNumber) {
        List<Copy> copyList = DataHandler.requestCopyList();
        int max = 0;
        for (Copy copy : copyList) {
            if (copy.getBooknumber().equals(bookNumber)) {
                int tmp = Integer.parseInt(copy.getCopynumber().substring(6));
                if (tmp > max) {
                    max = tmp;
                }
            }
        }
        return max;
    }
}