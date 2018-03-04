package raijin.librarymanagementsystem.entities.webservices;

import raijin.librarymanagementsystem.entities.LoginResult;
import raijin.librarymanagementsystem.entities.Account;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

/**
 * Created by 1918 on 23-Nov-17.
 */

public interface LoginAPI {
    @POST("/user/login")
    Call<LoginResult> login(@Body Account user);
}
