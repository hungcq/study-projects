package raijin.librarymanagementsystem.entities.webservices;

import java.util.List;

import raijin.librarymanagementsystem.entities.Account;
import raijin.librarymanagementsystem.entities.PostResult;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;

/**
 * Created by 1918 on 23-Nov-17.
 */

public interface UserAPI {
    @GET("/user")
    Call<List<Account>> getUserList ();
    @POST("/user")
    Call<PostResult> addUser(@Body Account user);
}
