package raijin.librarymanagementsystem.controllers;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import raijin.librarymanagementsystem.entities.BorrowInfo;
import raijin.librarymanagementsystem.entities.webservices.DataHandler;

/**
 * Created by 1918 on 27-Nov-17.
 */

public class BorrowInfoController {
    private List<BorrowInfo> borrowInfoList;

    public List<BorrowInfo> getBorrowInfoList(String username) {
        refreshBorrowInfoList(username);
        return borrowInfoList;
    }

    private void refreshBorrowInfoList(String username) {
        borrowInfoList = DataHandler.requestBorrowInfoList(username);
    }

    public boolean checkUnreturnedBook(String username) {
        refreshBorrowInfoList(username);
        for (BorrowInfo borrowInfo : borrowInfoList) {
            Date date = new Date();
            try {
                date = new SimpleDateFormat("yyyy-MM-dd").parse(borrowInfo.getReturndate().substring(0, 10));
            } catch (ParseException e) {
                e.printStackTrace();
            }
            if (date.before(new Date())) return false;
        }
        return true;
    }

    public boolean checkLentNumber(String username) {
        refreshBorrowInfoList(username);
        return borrowInfoList.size() <= 5;
    }
}
