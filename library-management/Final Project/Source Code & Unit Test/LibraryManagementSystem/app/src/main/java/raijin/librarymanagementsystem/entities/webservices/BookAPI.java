package raijin.librarymanagementsystem.entities.webservices;

import java.util.List;

import raijin.librarymanagementsystem.entities.Book;
import raijin.librarymanagementsystem.entities.PostResult;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;

/**
 * Created by 1918 on 23-Nov-17.
 */

public interface BookAPI {
    @GET("/book")
    Call<List<Book>> getBookList ();
    @POST("/book")
    Call<PostResult> addBook(@Body Book book);
}
