package raijin.studentmanager.webservices;

import raijin.studentmanager.models.userinfo.UserInfo;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.PATCH;
import retrofit2.http.PUT;
import retrofit2.http.Path;
import retrofit2.http.Query;

/**
 * Created by 1918 on 07-May-17.
 */

public interface UserAPI {
    @GET("/users/")
    Call<UserInfo> callUserInfo(@Query("format") String format);
    @PATCH("/users/{id}/")
    Call<UserInfo> updateUserInfo(@Path("id") int userID, @Body UserInfo userInfo);
}
