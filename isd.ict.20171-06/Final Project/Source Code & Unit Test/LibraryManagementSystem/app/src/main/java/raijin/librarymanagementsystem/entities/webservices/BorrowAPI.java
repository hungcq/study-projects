package raijin.librarymanagementsystem.entities.webservices;

import java.util.List;

import raijin.librarymanagementsystem.entities.Book;
import raijin.librarymanagementsystem.entities.BorrowInfo;
import raijin.librarymanagementsystem.entities.PostResult;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;

/**
 * Created by 1918 on 27-Nov-17.
 */

public interface BorrowAPI {
    @POST("/borrow")
    Call<PostResult> borrowBook(@Body BorrowInfo borrowInfo);
    @GET("/borrow/{username}")
    Call<List<BorrowInfo>> getBorrowInfo(@Path("username") String username);
}
