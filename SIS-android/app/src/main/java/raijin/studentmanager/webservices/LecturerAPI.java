package raijin.studentmanager.webservices;

import raijin.studentmanager.models.lecturer.LecturerModel;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Query;

/**
 * Created by 1918 on 02-Jun-17.
 */

public interface LecturerAPI {
    @GET("/lecturers/")
    Call<LecturerModel> callLecturer(@Query("format") String format, @Query("limit") int limit, @Query("offset") int offset);
    @GET("/lecturers/list_by_course_id/")
    Call<LecturerModel> callLecturerByCourse(@Query("format") String format, @Query("limit") int limit, @Query("offset") int offset,
                                     @Query("course_id") String courseID);
}
