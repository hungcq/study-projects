package raijin.models;

import raijin.utils.DataManager;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by ThanhLT on 31-Mar-17.
 */
public abstract class Student extends User {

    protected ArrayList<String> courseList;

    public Student(String id, String password, String dateOfBirth, String phoneNumber) {
        super(id, password, dateOfBirth, phoneNumber);
        courseList = new ArrayList<>();
    }

    public Student(String id, String name, String password, String dateOfBirth, String phoneNumber) {
        super(id, name, password, dateOfBirth, phoneNumber);
        courseList = new ArrayList<>();
    }

    public List<String> getCourseList() {
        return courseList;
    }

    public boolean ableToGraduate() {
        if (courseList.size() != DataManager.getInst().getCourseList().size()) return false;
        for (Course course : DataManager.getInst().getCourseList()) {
            if (course.getStudentPoint(id) < 5) return false;
        }
        return true;
    }
}
