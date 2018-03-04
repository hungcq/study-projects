package raijin.studentmanager.webservices;

import java.util.List;

import raijin.studentmanager.models.room.Room;
import raijin.studentmanager.models.room.RoomModel;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Query;

/**
 * Created by 1918 on 16-Jun-17.
 */

public interface RoomAPI {
    @GET("/rooms/")
    Call<RoomModel> callRoom(@Query("format") String format, @Query("limit") int limit, @Query("offset") int offset);
    @GET("/rooms/list_building/")
    Call<List<String>> callBuilding(@Query("format") String format);
    @GET("/rooms/list_room_by_building/")
    Call<List<Room>> callRoomByBuilding(@Query("building") String building, @Query("format") String format);
}
