package raijin.studentmanager.webservices;

import java.util.List;

import raijin.studentmanager.models.ResultCheck;
import raijin.studentmanager.models.score.RegisterSessionModel;
import raijin.studentmanager.models.score.Score;
import raijin.studentmanager.models.score.ScoreModel;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Query;

/**
 * Created by 1918 on 16-May-17.
 */

public interface ScoreAPI {
    @GET("/scores/register/")
    Call<ResultCheck> registerSession(@Query("session_id") int sessionID, @Query("format") String format);
    @GET("/scores/list_student_score/")
    Call<ScoreModel> getScores(@Query("format") String format, @Query("limit") int limit, @Query("offset") int offset);
    @POST("/scores/edit_many/")
    Call<ResultCheck> updateScore(@Body List<Score> scoreList);
    @POST("/scores/register_many/")
    Call<ResultCheck> registerManySession(@Body RegisterSessionModel registerSessionModel, @Query("format") String format);
}
