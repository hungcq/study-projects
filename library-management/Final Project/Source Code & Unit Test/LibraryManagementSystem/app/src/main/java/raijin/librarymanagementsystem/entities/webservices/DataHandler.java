package raijin.librarymanagementsystem.entities.webservices;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import raijin.librarymanagementsystem.entities.Book;
import raijin.librarymanagementsystem.entities.BorrowInfo;
import raijin.librarymanagementsystem.entities.Copy;
import raijin.librarymanagementsystem.entities.LoginResult;
import raijin.librarymanagementsystem.entities.PostResult;
import raijin.librarymanagementsystem.entities.Account;

/**
 * Created by 1918 on 23-Nov-17.
 */

public class DataHandler {

    public static List<Book> requestBookList() {
        BookAPI bookAPI = ServiceFactory.getInst().createService(BookAPI.class);
        List<Book> bookList = new ArrayList<>();
        try {
            bookList = bookAPI.getBookList().execute().body();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return bookList;
    }

    public static PostResult requestAddBook(Book book) {
        BookAPI bookAPI = ServiceFactory.getInst().createService(BookAPI.class);
        PostResult postResult = new PostResult(false, "No internet connection.");
        try {
            postResult = bookAPI.addBook(book).execute().body();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return postResult;
    }

    public static List<Copy> requestCopyList() {
        CopyAPI copyAPI = ServiceFactory.getInst().createService(CopyAPI.class);
        List<Copy> copyList = new ArrayList<>();
        try {
            copyList = copyAPI.getCopyList().execute().body();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return copyList;
    }

    public static PostResult requestAddCopy(Copy copy) {
        CopyAPI copyAPI = ServiceFactory.getInst().createService(CopyAPI.class);
        PostResult postResult = new PostResult(false, "No internet connection.");
        try {
            postResult = copyAPI.addCopy(copy).execute().body();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return postResult;
    }

    public static LoginResult requestLogin(Account user) {
        LoginAPI loginAPI = ServiceFactory.getInst().createService(LoginAPI.class);
        LoginResult loginResult = new LoginResult(false);
        try {
            loginResult = loginAPI.login(user).execute().body();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return loginResult;
    }

    public static List<Account> requestAccountList() {
        UserAPI userAPI = ServiceFactory.getInst().createService(UserAPI.class);
        List<Account> userList = new ArrayList<>();
        try {
            userList = userAPI.getUserList().execute().body();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return userList;
    }

    public static PostResult requestAddAccount(Account user) {
        UserAPI userAPI = ServiceFactory.getInst().createService(UserAPI.class);
        PostResult postResult = new PostResult(false, "No internet connection.");
        try {
            postResult = userAPI.addUser(user).execute().body();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return postResult;
    }

    public static PostResult requestBorrowBook(BorrowInfo borrowInfo) {
        BorrowAPI borrowAPI = ServiceFactory.getInst().createService(BorrowAPI.class);
        PostResult postResult = new PostResult(false, "No internet connection.");
        try {
            postResult = borrowAPI.borrowBook(borrowInfo).execute().body();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return postResult;
    }

    public static List<BorrowInfo> requestBorrowInfoList(String username) {
        BorrowAPI borrowAPI = ServiceFactory.getInst().createService(BorrowAPI.class);
        List<BorrowInfo> borrowInfoList = new ArrayList<>();
        try {
            borrowInfoList = borrowAPI.getBorrowInfo(username).execute().body();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return borrowInfoList;
    }
}
