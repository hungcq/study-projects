package raijin.studentmanager.webservices;

import java.util.List;

import raijin.studentmanager.models.session.Session;
import raijin.studentmanager.models.session.SessionModel;
import raijin.studentmanager.models.student.StudentInSession;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;
import retrofit2.http.Query;

/**
 * Created by 1918 on 16-May-17.
 */

public interface SessionAPI {
    @GET("/sessions/list_by_course_id/")
    Call<SessionModel> callSessionByCourse(@Query("course_id") String courseID, @Query("format") String format, @Query("limit") int limit, @Query("offset") int offset);
    @GET("/sessions/count_enroll_by_session/")
    Call<SessionModel> callNumberOfStudent(@Query("session_id") int sessionID, @Query("format") String format, @Query("limit") int limit, @Query("offset") int offset);
    @GET("/sessions/list_student_by_session/")
    Call<List<StudentInSession>> callStudentListOfSession(@Query("session_id") int sessionID, @Query("format") String format);
    @GET("/sessions/")
    Call<SessionModel> callSession(@Query("format") String format, @Query("limit") int limit, @Query("offset") int offset);
    @POST("/sessions/")
    Call<Session> createSession(@Body Session session);
    @PUT("/sessions/{id}/")
    Call<Session> updateSession(@Path("id") int sessionID, @Body Session session);
    @DELETE("/sessions/{id}/")
    Call<Void> deleteSession(@Path("id") int sessionID);
}
