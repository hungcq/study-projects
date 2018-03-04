package raijin.librarymanagementsystem.controllers;

import raijin.librarymanagementsystem.entities.Copy;
import raijin.librarymanagementsystem.entities.PostResult;
import raijin.librarymanagementsystem.entities.webservices.DataHandler;
import raijin.librarymanagementsystem.utils.Utils;

/**
 * Created by 1918 on 19-Nov-17.
 */

public class AddCopyController {

    private CopyController copyController;

    public AddCopyController() {
        copyController = new CopyController();
    }

    public PostResult addCopy(String bookNumber, String type, String price) {
        PostResult postResult = new PostResult(false, "No internet connection.");
        try {
            Copy copy = new Copy(bookNumber, copyController.generateCopyNumber(bookNumber), type, Double.parseDouble(price));
            postResult = DataHandler.requestAddCopy(copy);
        } catch (NumberFormatException e) {
        }
        return postResult;
    }

    public CheckResult checkForm(String bookNumber, String type, String price) {
        if(!checkBookNumber(bookNumber)) {
            return new CheckResult(false, "Invalid book number. Must be in the form XX9999.");
        }
        if(!checkType(type)) {
            return new CheckResult(false, "Invalid type. Only B and R are allowed.");
        }
        if(!checkPrice(price)) {
            return new CheckResult(false, "Invalid price.");
        }
        return new CheckResult(true, "");
    }

    public boolean checkBookNumber(String bookNumber) {
        if (bookNumber.length() != 6) return false;
        for (int i = 0; i < 2; i++) {
            if (!Utils.isEnglishLetter(bookNumber.charAt(i))) {
                return false;
            }
        }
        for(int i = 2; i < 6; i++) {
            if (!Utils.isDigit(bookNumber.charAt(i))) {
                return false;
            }
        }
        return true;
    }

    public boolean checkType(String type) {
        if (type.length() != 1) return false;
        if(type.charAt(0) != 'B' && type.charAt(0) != 'R') {
            return false;
        }
        return true;
    }

    public boolean checkPrice(String price) {
        if (price.length() == 0) return false;
        for(int i = 0; i < price.length(); i++) {
            if (!Utils.isDigit(price.charAt(i))) {
                return false;
            }
        }
        return true;
    }
}
