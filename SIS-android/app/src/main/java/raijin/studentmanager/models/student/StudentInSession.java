
package raijin.studentmanager.models.student;

import java.util.List;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class StudentInSession {

    @SerializedName("max_enroll")
    @Expose
    private Integer maxEnroll;
    @SerializedName("id")
    @Expose
    private Integer id;
    @SerializedName("password")
    @Expose
    private String password;
    @SerializedName("class_id")
    @Expose
    private String classId;
    @SerializedName("week_day")
    @Expose
    private Integer weekDay;
    @SerializedName("session_id")
    @Expose
    private Integer sessionId;
    @SerializedName("room")
    @Expose
    private Integer room;
    @SerializedName("course_id")
    @Expose
    private String courseId;
    @SerializedName("sessions")
    @Expose
    private List<Integer> sessions = null;
    @SerializedName("year")
    @Expose
    private Integer year;
    @SerializedName("name")
    @Expose
    private String name;
    @SerializedName("start_at")
    @Expose
    private Integer startAt;
    @SerializedName("first_name")
    @Expose
    private String firstName;
    @SerializedName("score")
    @Expose
    private Double score;
    @SerializedName("username")
    @Expose
    private String username;
    @SerializedName("end_at")
    @Expose
    private Integer endAt;
    @SerializedName("student_id")
    @Expose
    private Integer studentId;
    @SerializedName("last_name")
    @Expose
    private String lastName;
    @SerializedName("lecturer_id")
    @Expose
    private Integer lecturerId;
    @SerializedName("semester")
    @Expose
    private Integer semester;

    public Integer getMaxEnroll() {
        return maxEnroll;
    }

    public void setMaxEnroll(Integer maxEnroll) {
        this.maxEnroll = maxEnroll;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getClassId() {
        return classId;
    }

    public void setClassId(String classId) {
        this.classId = classId;
    }

    public Integer getWeekDay() {
        return weekDay;
    }

    public void setWeekDay(Integer weekDay) {
        this.weekDay = weekDay;
    }

    public Integer getSessionId() {
        return sessionId;
    }

    public void setSessionId(Integer sessionId) {
        this.sessionId = sessionId;
    }

    public Integer getRoom() {
        return room;
    }

    public void setRoom(Integer room) {
        this.room = room;
    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public List<Integer> getSessions() {
        return sessions;
    }

    public void setSessions(List<Integer> sessions) {
        this.sessions = sessions;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getStartAt() {
        return startAt;
    }

    public void setStartAt(Integer startAt) {
        this.startAt = startAt;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getEndAt() {
        return endAt;
    }

    public void setEndAt(Integer endAt) {
        this.endAt = endAt;
    }

    public Integer getStudentId() {
        return studentId;
    }

    public void setStudentId(Integer studentId) {
        this.studentId = studentId;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Integer getLecturerId() {
        return lecturerId;
    }

    public void setLecturerId(Integer lecturerId) {
        this.lecturerId = lecturerId;
    }

    public Integer getSemester() {
        return semester;
    }

    public void setSemester(Integer semester) {
        this.semester = semester;
    }

}
