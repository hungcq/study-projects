
package raijin.studentmanager.models.notification;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Noti {

    @SerializedName("id")
    @Expose
    private Integer id;
    @SerializedName("title")
    @Expose
    private String title;
    @SerializedName("content")
    @Expose
    private String content;
    @SerializedName("date")
    @Expose
    private String date;
    @SerializedName("session_id")
    @Expose
    private Integer sessionId;
    @SerializedName("course")
    @Expose
    private String course;
    @SerializedName("lecturer")
    @Expose
    private String lecturer;
    @SerializedName("session_name")
    @Expose
    private String sessionName;

    public Noti(String title, String content, Integer sessionId) {
        this.title = title;
        this.content = content;
        this.sessionId = sessionId;
    }

    public void setData(Noti noti) {
        title = noti.title;
        content = noti.content;
        id = noti.id;
        course = noti.course;
        lecturer = noti.lecturer;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Integer getSessionId() {
        return sessionId;
    }

    public void setSessionId(Integer sessionId) {
        this.sessionId = sessionId;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public String getLecturer() {
        return lecturer;
    }

    public void setLecturer(String lecturer) {
        this.lecturer = lecturer;
    }

    public String getSessionName() {
        return sessionName;
    }

    public void setSessionName(String sessionName) {
        this.sessionName = sessionName;
    }

}
