package raijin.librarymanagementsystem.controllers;

import java.text.DecimalFormat;
import java.util.List;
import java.util.Observable;

import raijin.librarymanagementsystem.entities.Book;
import raijin.librarymanagementsystem.entities.webservices.DataHandler;

/**
 * Created by 1918 on 23-Nov-17.
 */

public class BookController extends Observable {

    private List<Book> bookList;
//    private Callback<List<Book>> callback;

    public BookController() {
//        bookList = new ArrayList<>();
//        callback = new Callback<List<Book>>() {
//            @Override
//            public void onResponse(Call<List<Book>> call, Response<List<Book>> response) {
//                bookList.addAll(response.body());
//                setChanged();
//                notifyObservers();
//            }
//
//            @Override
//            public void onFailure(Call<List<Book>> call, Throwable t) {
//
//            }
//        };
    }

    public List<Book> getBookList() {
        refreshBookList();
        return bookList;
    }

    public Book getBookByBookNumber(String bookNumber) {
        for (Book book : bookList) {
            if (book.getBooknumber().equals(bookNumber)) {
                return book;
            }
        }
        return null;
    }

    public void refreshBookList() {
        bookList = DataHandler.requestBookList();
    }

    private int getHighestBookNumber(String classification) {
        refreshBookList();
        int max = 0;
        for (Book book : bookList) {
            if (book.getBooknumber().substring(0, 2).toLowerCase().equals(classification.substring(0, 2).toLowerCase())) {
                int tmp = Integer.parseInt(book.getBooknumber().substring(2));
                if (tmp > max) {
                    max = tmp;
                }
            }
        }
        return max;
    }

    public String generateBookNumber(String classification) {
        String type = classification.substring(0, 2).toUpperCase();
        String number = new DecimalFormat("0000").format((getHighestBookNumber(classification) + 1) % 10000);
        return type + number;
    }
}
