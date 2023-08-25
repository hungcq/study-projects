package raijin.librarymanagementsystem.controllers;

import java.text.DecimalFormat;
import java.util.List;

import raijin.librarymanagementsystem.Constants;
import raijin.librarymanagementsystem.entities.Copy;
import raijin.librarymanagementsystem.entities.webservices.DataHandler;

/**
 * Created by 1918 on 23-Nov-17.
 */

public class CopyController {

    private List<Copy> copyList;

    public List<Copy> getCopyList() {
        refreshCopyList();
        return copyList;
    }

    private void refreshCopyList() {
        copyList = DataHandler.requestCopyList();
    }


    private int getHighestCopyNumber(String bookNumber) {
        refreshCopyList();
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

    public String generateCopyNumber(String bookNumber) {
        String number = new DecimalFormat("00").format((getHighestCopyNumber(bookNumber) + 1) % 10);
        return bookNumber + number;
    }

    public boolean checkAvailableCopy(String bookNumber) {
        refreshCopyList();
        for (Copy copy : copyList) {
            if (copy.getBooknumber().equals(bookNumber) && copy.getType().equals(Constants.BORROWABLE)) {
                return true;
            }
        }
        return false;
    }
}
