package raijin.studentmanager.webservices;

import raijin.studentmanager.models.auth.Authorization;
import raijin.studentmanager.models.auth.User;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

/**
 * Created by 1918 on 03-May-17.
 */

public interface LoginAPI {
    @POST("/auth/token/obtain/")
    Call<Authorization> callAuthorization(@Body User user);
}
