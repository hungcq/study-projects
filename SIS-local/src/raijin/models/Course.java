package raijin.models;

import raijin.utils.DataManager;

import java.io.Serializable;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by CongTT on 31-Mar-17.
 */
public class Course implements Serializable {

    private ArrayList<StudentResult> studentResultList;
    private String id;
    private String name;

    public Course(String id, String name) {
        this.id = id;
        this.name = name;
        studentResultList = new ArrayList<>();
    }

    public List<StudentResult> getStudentResultList() {
        return studentResultList;
    }

    public boolean updateStudentResult(String studentID, double midtermPoint, double finalPoint) {
        if (midtermPoint > 10 || midtermPoint < 0 || finalPoint > 10 || finalPoint < 0) return false;
        for (StudentResult studentResult : studentResultList) {
            if (studentResult.getStudentID().equals(studentID)) {
                studentResult.setMidtermPoint(midtermPoint);
                studentResult.setFinalPoint(finalPoint);
                studentResult.setPoint(Double.parseDouble(new DecimalFormat("0.0").format(midtermPoint * 0.3 + finalPoint * 0.7)));
            }
        }
        DataManager.getInst().saveData();
        return true;
    }

    public double getStudentPoint(String studentID) {
        for (StudentResult studentResult : studentResultList) {
            if (studentResult.getStudentID().equals(studentID)) {
                return studentResult.getPoint();
            }
        }
        return -1;
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
}
