package raijin.librarymanagementsystem.entities;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

/**
 * Created by 1918 on 23-Nov-17.
 */

public class LoginResult {
    @SerializedName("status")
    @Expose
    private Boolean status;
    @SerializedName("role")
    @Expose
    private String role;

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public LoginResult(Boolean status) {
        this.status = status;
    }
}
