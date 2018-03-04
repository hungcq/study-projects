package raijin.studentmanager.models.score;

import com.google.gson.annotations.SerializedName;

import java.util.List;

/**
 * Created by 1918 on 18-Jun-17.
 */

public class RegisterSessionModel {
    @SerializedName("session_ids")
    private List<Integer> sessionIdList;

    public List<Integer> getSessionIdList() {
        return sessionIdList;
    }

    public void setSessionIdList(List<Integer> sessionIdList) {
        this.sessionIdList = sessionIdList;
    }
}
