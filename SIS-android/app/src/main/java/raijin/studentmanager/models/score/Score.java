
package raijin.studentmanager.models.score;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Score {

    @SerializedName("id")
    @Expose
    private Integer id;
    @SerializedName("score")
    @Expose
    private Double score;
    @SerializedName("student_id")
    @Expose
    private Integer studentId;
    @SerializedName("session_id")
    @Expose
    private Integer sessionId;
    @SerializedName("course_name")
    @Expose
    private String courseName;
    @SerializedName("course_id")
    @Expose
    private String courseId;
    @SerializedName("cost")
    @Expose
    private Integer cost;
    @SerializedName("semester")
    @Expose
    private Integer semester;
    @SerializedName("year")
    @Expose
    private Integer year;

    public Score(Double score, Integer studentId, Integer sessionId) {
        this.score = score;
        this.studentId = studentId;
        this.sessionId = sessionId;
    }

    public void setData(Score score) {
        this.score = score.score;
        studentId = score.studentId;
        sessionId = score.sessionId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }

    public Integer getStudentId() {
        return studentId;
    }

    public void setStudentId(Integer studentId) {
        this.studentId = studentId;
    }

    public Integer getSessionId() {
        return sessionId;
    }

    public void setSessionId(Integer sessionId) {
        this.sessionId = sessionId;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public Integer getCost() {
        return cost;
    }

    public void setCost(Integer cost) {
        this.cost = cost;
    }

    public Integer getSemester() {
        return semester;
    }

    public void setSemester(Integer semester) {
        this.semester = semester;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

}
