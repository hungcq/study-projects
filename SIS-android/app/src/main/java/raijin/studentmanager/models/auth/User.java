package raijin.studentmanager.models.auth;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

/**
 * Created by 1918 on 02-May-17.
 */

public class User {
    @SerializedName("username")
    @Expose
    private String username;
    @SerializedName("password")
    @Expose
    private String password;

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }
}
