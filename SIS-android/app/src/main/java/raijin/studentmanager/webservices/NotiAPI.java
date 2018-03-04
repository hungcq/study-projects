package raijin.studentmanager.webservices;

import java.util.List;

import raijin.studentmanager.models.notification.Noti;
import raijin.studentmanager.models.notification.NotiModel;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;
import retrofit2.http.Query;

/**
 * Created by 1918 on 17-Jun-17.
 */

public interface NotiAPI {
    @GET("/notifications/")
    Call<NotiModel> callNoti(@Query("format") String format, @Query("limit") int limit, @Query("offset") int offset);
    @GET("/notifications/list_noti_for_user/")
    Call<List<Integer>> callUserNoti(@Query("format") String format);
    @POST("/notifications/list_noti_detail/")
    Call<List<Noti>> callDetailList(@Query("format") String format, @Body List<Integer> notiIdList);
    @POST("/notifications/")
    Call<Noti> createNoti(@Body Noti noti);
    @PUT("/notifications/{id}/")
    Call<Noti> updateNoti(@Path("id") int notiID, @Body Noti noti);
    @DELETE("/notifications/{id}/")
    Call<Void> deleteNoti(@Path("id") int notiID);
}
