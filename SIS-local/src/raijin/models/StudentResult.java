package raijin.models;

import java.io.Serializable;

/**
 * Created by CongTT on 31-Mar-17.
 */
public class StudentResult implements Serializable {
    private String studentID;
    private String studentName;
    private double midtermPoint;
    private double finalPoint;
    private double point;
    public static double DEFAULT_POINT = -1;

    public StudentResult(String studentID, String studentName) {
        this.studentID = studentID;
        this.studentName = studentName;
        this.point = DEFAULT_POINT;
        this.midtermPoint = DEFAULT_POINT;
        this.finalPoint = DEFAULT_POINT;
    }

    public double getPoint() {
        return point;
    }

    public void setPoint(double point) {
        this.point = point;
    }

    public double getMidtermPoint() {
        return midtermPoint;
    }

    public void setMidtermPoint(double midtermPoint) {
        this.midtermPoint = midtermPoint;
    }

    public double getFinalPoint() {
        return finalPoint;
    }

    public void setFinalPoint(double finalPoint) {
        this.finalPoint = finalPoint;
    }

    public String getStudentID() {
        return studentID;
    }

    public String getStudentName() {
        return studentName;
    }
}
