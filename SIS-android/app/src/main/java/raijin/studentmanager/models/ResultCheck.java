
package raijin.studentmanager.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class ResultCheck {

    @SerializedName("reason")
    @Expose
    private String reason;
    @SerializedName("result")
    @Expose
    private Boolean result;

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public Boolean getResult() {
        return result;
    }

    public void setResult(Boolean result) {
        this.result = result;
    }

}
