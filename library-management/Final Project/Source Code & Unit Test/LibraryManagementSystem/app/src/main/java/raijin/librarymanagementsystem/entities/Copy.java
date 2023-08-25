
package raijin.librarymanagementsystem.entities;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import raijin.librarymanagementsystem.Constants;

public class Copy {

    @SerializedName("copynumber")
    @Expose
    private String copynumber;
    @SerializedName("booknumber")
    @Expose
    private String booknumber;
    @SerializedName("price")
    @Expose
    private Double price;
    @SerializedName("type")
    @Expose
    private String type;

    public Copy() {
    }

    public Copy(String booknumber, String copynumber, String type, Double price) {
        this.booknumber = booknumber;
        this.copynumber = copynumber;
        this.price = price;
        this.type = type.equals("R")? Constants.REFERENCE:Constants.BORROWABLE;
    }

    public String getCopynumber() {
        return copynumber;
    }

    public void setCopynumber(String copynumber) {
        this.copynumber = copynumber;
    }

    public String getBooknumber() {
        return booknumber;
    }

    public void setBooknumber(String booknumber) {
        this.booknumber = booknumber;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

}
