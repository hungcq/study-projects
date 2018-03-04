
package raijin.studentmanager.models.classes;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Classes {

    @SerializedName("id")
    @Expose
    private String id;
    @SerializedName("name")
    @Expose
    private String name;
    @SerializedName("order")
    @Expose
    private Integer order;
    @SerializedName("type")
    @Expose
    private String type;
    @SerializedName("curriculum")
    @Expose
    private Integer curriculum;

    public Classes(String name, Integer order, String type, Integer curriculum) {
        this.name = name;
        this.order = order;
        this.type = type;
        this.curriculum = curriculum;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getOrder() {
        return order;
    }

    public void setOrder(Integer order) {
        this.order = order;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getCurriculum() {
        return curriculum;
    }

    public void setCurriculum(Integer curriculum) {
        this.curriculum = curriculum;
    }

}
