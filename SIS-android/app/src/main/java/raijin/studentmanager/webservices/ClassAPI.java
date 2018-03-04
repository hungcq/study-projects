package raijin.studentmanager.webservices;

import raijin.studentmanager.models.classes.ClassModel;
import raijin.studentmanager.models.classes.Classes;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Query;

/**
 * Created by 1918 on 07-May-17.
 */

public interface ClassAPI {
    @GET("/classes/")
    Call<ClassModel> callClass(@Query("format") String format, @Query("limit") int limit, @Query("offset") int offset);
    @POST("/classes/")
    Call<Classes> createClass(@Body Classes classes);
}
