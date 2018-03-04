
package raijin.studentmanager.models.course;

import java.util.List;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Course {

    @SerializedName("id")
    @Expose
    private String id;
    @SerializedName("name")
    @Expose
    private String name;
    @SerializedName("cost")
    @Expose
    private Integer cost;
    @SerializedName("active")
    @Expose
    private Boolean active;
    @SerializedName("session_num")
    @Expose
    private Integer sessionNum;
    @SerializedName("department")
    @Expose
    private String department;
    @SerializedName("requirements")
    @Expose
    private List<String> requirements = null;
    @SerializedName("requirement_name")
    @Expose
    private List<String> requirementNames = null;

    public Course(String id, String name, Integer cost, Boolean active, String department, List<String> requirements) {
        this.id = id;
        this.name = name;
        this.cost = cost;
        this.active = active;
        this.department = department;
        this.requirements = requirements;
    }

    public void setData(Course course) {
        id = course.id;
        name = course.name;
        cost = course.cost;
        active = course.active;
        department = course.department;
        requirements = course.requirements;
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

    public Integer getCost() {
        return cost;
    }

    public void setCost(Integer cost) {
        this.cost = cost;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public List<String> getRequirements() {
        return requirements;
    }

    public void setRequirements(List<String> requirements) {
        this.requirements = requirements;
    }

    public List<String> getRequirementNames() {
        return requirementNames;
    }

    public void setRequirementNames(List<String> requirementNames) {
        this.requirementNames = requirementNames;
    }

    public Integer getSessionNum() {
        return sessionNum;
    }

    public void setSessionNum(Integer sessionNum) {
        this.sessionNum = sessionNum;
    }

    @Override
    public String toString() {
        return id;
    }

}
