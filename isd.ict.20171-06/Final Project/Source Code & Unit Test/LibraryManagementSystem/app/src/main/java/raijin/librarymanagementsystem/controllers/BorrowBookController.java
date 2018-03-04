package raijin.librarymanagementsystem.controllers;

import raijin.librarymanagementsystem.Constants;
import raijin.librarymanagementsystem.entities.BorrowInfo;
import raijin.librarymanagementsystem.entities.Copy;
import raijin.librarymanagementsystem.entities.PostResult;
import raijin.librarymanagementsystem.entities.webservices.DataHandler;

/**
 * Created by 1918 on 21-Nov-17.
 */

public class BorrowBookController {

    private CopyController copyController;
    private BorrowInfoController borrowInfoController;

    public BorrowBookController() {
        copyController = new CopyController();
        borrowInfoController = new BorrowInfoController();
    }

    public CheckResult ableToBorrow(String username, String bookNumber) {
        if (!borrowInfoController.checkUnreturnedBook(username)) {
            return new CheckResult(false, "Overdue unreturned book ");
        }
        if (!borrowInfoController.checkLentNumber(username)) {
            return new CheckResult(false, "Maximum number of copies allowed to be borrowed is 5");
        }
        if (!copyController.checkAvailableCopy(bookNumber)) {
            return new CheckResult(false, "No copy avaiable to borrow.");
        }
        return new CheckResult(true, "");
    }

    public PostResult borrowBook(String username, String bookNumber) {
        PostResult postResult = new PostResult(false, "No internet connection.");
        for (Copy copy : copyController.getCopyList()) {
            if (copy.getBooknumber().equals(bookNumber) && copy.getType().equals(Constants.BORROWABLE)) {
                BorrowInfo borrowInfo = new BorrowInfo(username, copy.getCopynumber());
                postResult = DataHandler.requestBorrowBook(borrowInfo);
            }
        }
        return postResult;
    }
}
