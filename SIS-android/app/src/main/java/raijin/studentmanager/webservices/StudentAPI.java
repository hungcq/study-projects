package raijin.studentmanager.webservices;

import raijin.studentmanager.models.student.Student;
import raijin.studentmanager.models.student.StudentModel;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.PATCH;
import retrofit2.http.POST;
import retrofit2.http.Path;
import retrofit2.http.Query;

/**
 * Created by 1918 on 07-May-17.
 */

public interface StudentAPI {
    @GET("/students/")
    Call<StudentModel> callStudent(@Query("format") String format, @Query("limit") int limit, @Query("offset") int offset);
    @POST("/students/")
    Call<Student> createStudent(@Body Student student);
    @PATCH("/students/{id}/")
    Call<Student> updateStudent(@Path("id") int studentID, @Body Student student);
    @DELETE("/students/{id}/")
    Call<Void> deleteStudent(@Path("id") int studentID);
    @GET("/students/list_by_username/")
    Call<StudentModel> callStudentByUsername(@Query("username") String username, @Query("format") String format,
                                             @Query("limit") int limit, @Query("offset") int offset);
}
