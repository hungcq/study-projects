package raijin.librarymanagementsystem.controllers;

import raijin.librarymanagementsystem.entities.Book;
import raijin.librarymanagementsystem.entities.PostResult;
import raijin.librarymanagementsystem.entities.webservices.DataHandler;
import raijin.librarymanagementsystem.utils.Utils;

/**
 * Created by Huy Nguyen on 19-Nov-17.
 */

public class AddBookController {

    private BookController bookController;
    private AddCopyController addCopyController;

    public AddBookController() {
        bookController = new BookController();
        addCopyController = new AddCopyController();
    }

    public PostResult addBook(String title, String author, String publisher, String isbn, String classification, String type, String price) {
        PostResult postResult = new PostResult(false, "No internet connection.");
        try {
            String bookNumber = bookController.generateBookNumber(classification);
            Book book = new Book(bookNumber, title, author, publisher, isbn, classification);
            postResult = DataHandler.requestAddBook(book);
            if (postResult.getStatus() == true) {
                postResult = addCopyController.addCopy(bookNumber, type, price);
            }
        } catch (NumberFormatException e) {

        }
        return postResult;
    }

    public CheckResult checkForm(String title, String author, String publisher, String isbn, String classification, String type, String price) {
        if (!checkISBN(isbn)) {
            return new CheckResult(false, "Invalid ISBN.");
        }
        if (!checkType(type)) {
            return new CheckResult(false, "Invalid type. Only B and R are allowed.");
        }
        if (!checkPrice(price)) {
            return new CheckResult(false, "Invalid price.");
        }
        if (!checkClassification(classification)) {
            return new CheckResult(false, "Invalid classification.");
        }
        return new CheckResult(true, "");
    }

    public boolean checkISBN(String isbn) {
        if (isbn.length() < 10 || isbn.length() > 13) {
            return false;
        }
        for (int i = 0; i < isbn.length(); i++) {
            if (!Utils.isDigit(isbn.charAt(i))) {
                return false;
            }
        }
        return true;
    }

    public boolean checkClassification(String classification) {
        if (classification.length() < 2) {
            return false;
        }
        for (int i = 0; i < 2; i++) {
            if (!Utils.isEnglishLetter(classification.charAt(i))) {
                return false;
            }
        }
        return true;
    }

    public boolean checkType(String type) {
        if (type.length() != 1) return false;
        if (type.charAt(0) != 'B' && type.charAt(0) != 'R') {
            return false;
        }
        return true;
    }

    public boolean checkPrice(String price) {
        if (price.length() == 0) return false;
        for (int i = 0; i < price.length(); i++) {
            if (!Utils.isDigit(price.charAt(i))) {
                return false;
            }
        }
        return true;
    }
}
