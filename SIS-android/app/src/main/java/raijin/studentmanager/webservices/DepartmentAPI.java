package raijin.studentmanager.webservices;

import raijin.studentmanager.models.department.Department;
import raijin.studentmanager.models.department.DepartmentModel;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;
import retrofit2.http.Query;

/**
 * Created by 1918 on 01-May-17.
 */

public interface DepartmentAPI {
    @GET("/departments/")
    Call<DepartmentModel> callDepartment(@Query("format") String format, @Query("limit") int limit, @Query("offset") int offset);
    @POST("/departments/")
    Call<Department> createDepartment(@Body Department Department);
    @PUT("/departments/{id}/")
    Call<Department> updateDepartment(@Path("id") String DepartmentID, @Body Department Department);
    @DELETE("/departments/{id}/")
    Call<Void> deleteDepartment(@Path("id") String DepartmentID);
}
