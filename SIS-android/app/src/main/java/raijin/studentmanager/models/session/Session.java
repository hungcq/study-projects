
package raijin.studentmanager.models.session;

import java.util.List;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import raijin.studentmanager.Utils;

public class Session {

    @SerializedName("id")
    @Expose
    private Integer id;
    @SerializedName("name")
    @Expose
    private String name;
    @SerializedName("semester")
    @Expose
    private Integer semester;
    @SerializedName("year")
    @Expose
    private Integer year;
    @SerializedName("max_enroll")
    @Expose
    private Integer maxEnroll;
    @SerializedName("start_at")
    @Expose
    private Integer startAt;
    @SerializedName("end_at")
    @Expose
    private Integer endAt;
    @SerializedName("week_day")
    @Expose
    private Integer weekDay;
    @SerializedName("room_name")
    @Expose
    private String room;
    @SerializedName("room")
    @Expose
    private Integer roomID;
    @SerializedName("course_id")
    @Expose
    private String courseId;
    @SerializedName("lecturer_id")
    @Expose
    private Integer lecturerId;
    @SerializedName("enrolled")
    @Expose
    private Integer enrolled;
    @SerializedName("students")
    @Expose
    private List<String> students = null;
    @SerializedName("course_name")
    @Expose
    private String courseName;
    @SerializedName("lecturer_name")
    @Expose
    private String lecturerName;

    public Session(Integer semester, Integer year, Integer maxEnroll, Integer startAt, Integer endAt, Integer weekDay, Integer roomID, String courseId, Integer lecturerId) {
        this.semester = semester;
        this.year = year;
        this.maxEnroll = maxEnroll;
        this.startAt = startAt;
        this.endAt = endAt;
        this.weekDay = weekDay;
        this.roomID = roomID;
        this.courseId = courseId;
        this.lecturerId = lecturerId;
    }

    public void setData(Session session) {
        semester = session.semester;
        year = session.year;
        maxEnroll = session.maxEnroll;
        startAt = session.startAt;
        endAt = session.endAt;
        weekDay = session.weekDay;
        roomID = session.roomID;
        courseId = session.courseId;
        lecturerId = session.lecturerId;
        lecturerName = session.lecturerName;
        room = session.room;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public Integer getMaxEnroll() {
        return maxEnroll;
    }

    public void setMaxEnroll(Integer maxEnroll) {
        this.maxEnroll = maxEnroll;
    }

    public Integer getStartAt() {
        return startAt;
    }

    public void setStartAt(Integer startAt) {
        this.startAt = startAt;
    }

    public Integer getEndAt() {
        return endAt;
    }

    public void setEndAt(Integer endAt) {
        this.endAt = endAt;
    }

    public Integer getWeekDay() {
        return weekDay;
    }

    public void setWeekDay(Integer weekDay) {
        this.weekDay = weekDay;
    }

    public String getRoom() {
        return room;
    }

    public void setRoom(String room) {
        this.room = room;
    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public Integer getLecturerId() {
        return lecturerId;
    }

    public void setLecturerId(Integer lecturerId) {
        this.lecturerId = lecturerId;
    }

    public Integer getEnrolled() {
        return enrolled;
    }

    public void setEnrolled(Integer enrolled) {
        this.enrolled = enrolled;
    }

    public List<String> getStudents() {
        return students;
    }

    public void setStudents(List<String> students) {
        this.students = students;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getLecturerName() {
        return lecturerName;
    }

    public void setLecturerName(String lecturerName) {
        this.lecturerName = lecturerName;
    }

    public Integer getRoomID() {
        return roomID;
    }

    public void setRoomID(Integer roomID) {
        this.roomID = roomID;
    }

    @Override
    public String toString() {
        return courseId + " - " + Utils.weekdayFromInt(weekDay) + ", Period: " + startAt + "-" + endAt;
    }
}
