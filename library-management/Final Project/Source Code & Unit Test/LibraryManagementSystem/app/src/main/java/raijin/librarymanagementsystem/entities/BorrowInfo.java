
package raijin.librarymanagementsystem.entities;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class BorrowInfo {

    @SerializedName("borrowid")
    @Expose
    private Integer borrowid;
    @SerializedName("username")
    @Expose
    private String username;
    @SerializedName("copynumber")
    @Expose
    private String copynumber;
    @SerializedName("current")
    @Expose
    private String current;
    @SerializedName("borrowdate")
    @Expose
    private String borrowdate;
    @SerializedName("returndate")
    @Expose
    private String returndate;

    public BorrowInfo(String username, String copynumber) {
        this.username = username;
        this.copynumber = copynumber;
    }

    public Integer getBorrowid() {
        return borrowid;
    }

    public void setBorrowid(Integer borrowid) {
        this.borrowid = borrowid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getCopynumber() {
        return copynumber;
    }

    public void setCopynumber(String copynumber) {
        this.copynumber = copynumber;
    }

    public String getCurrent() {
        return current;
    }

    public void setCurrent(String current) {
        this.current = current;
    }

    public String getBorrowdate() {
        return borrowdate;
    }

    public void setBorrowdate(String borrowdate) {
        this.borrowdate = borrowdate;
    }

    public String getReturndate() {
        return returndate;
    }

    public void setReturndate(String returndate) {
        this.returndate = returndate;
    }

}
