
package raijin.librarymanagementsystem.entities;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Book {

    @SerializedName("booknumber")
    @Expose
    private String booknumber;
    @SerializedName("title")
    @Expose
    private String title;
    @SerializedName("publisher")
    @Expose
    private String publisher;
    @SerializedName("isbn")
    @Expose
    private String isbn;
    @SerializedName("classification")
    @Expose
    private String classification;
    @SerializedName("author")
    @Expose
    private String author;

    public Book(String booknumber, String title, String author, String publisher, String isbn, String classification) {
        this.booknumber = booknumber;
        this.title = title;
        this.publisher = publisher;
        this.isbn = isbn;
        this.classification = classification;
        this.author = author;
    }

    public Book() {
    }

    public String getBooknumber() {
        return booknumber;
    }

    public void setBooknumber(String booknumber) {
        this.booknumber = booknumber;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getClassification() {
        return classification;
    }

    public void setClassification(String classification) {
        this.classification = classification;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }
}
