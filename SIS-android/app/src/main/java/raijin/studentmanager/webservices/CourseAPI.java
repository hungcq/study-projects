package raijin.studentmanager.webservices;

import raijin.studentmanager.models.course.Course;
import raijin.studentmanager.models.course.CourseModel;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;
import retrofit2.http.Query;

/**
 * Created by 1918 on 02-May-17.
 */

public interface CourseAPI {
    @GET("/courses/")
    Call<CourseModel> callCourse(@Query("format") String format, @Query("limit") int limit, @Query("offset") int offset);
    @POST("/courses/")
    Call<Course> createCourse(@Body Course course);
    @PUT("/courses/{id}/")
    Call<Course> updateCourse(@Path("id") String courseID, @Body Course course);
    @DELETE("/courses/{id}/")
    Call<Void> deleteCourse(@Path("id") String courseID);
}
