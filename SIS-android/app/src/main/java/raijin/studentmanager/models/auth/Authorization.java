package raijin.studentmanager.models.auth;

import com.google.gson.annotations.SerializedName;

/**
 * Created by 1918 on 01-May-17.
 */

public class Authorization {
    @SerializedName("token")
    private String token;
    @SerializedName("group")
    private String group;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getGroup() {
        return group;
    }

    public void setGroup(String group) {
        this.group = group;
    }
}
