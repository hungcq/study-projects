package raijin.models;

import raijin.utils.DataManager;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by CongTT on 31-Mar-17.
 */
public class AnnualClass implements Registerable, Serializable {

    private List<String> studentIDList;
    private String id;
    private String name;

    public AnnualClass(String id, String name) {
        this.id = id;
        this.name = name;
        studentIDList = new ArrayList<>();
    }

    public List<String> getStudentIDList() {
        return studentIDList;
    }

    public void setStudentIDList(List<String> studentIDList) {
        this.studentIDList = studentIDList;
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

    public boolean addStudent(String studentID) {
        if (!studentIDList.contains(studentID)) {
            studentIDList.add(studentID);
            return true;
        }
        return false;
    }

    public boolean removeStudent(String studentID) {
        if (studentIDList.contains(studentID)) {
            studentIDList.remove(studentID);
            return true;
        }
        return false;
    }

    @Override
    public boolean registerCourse(String courseID) {
        for (String studentID : studentIDList) {
            Student student = DataManager.getInst().findStudentByID(studentID);
            if (student instanceof AnnualStudent) {
                ((AnnualStudent) student).registerCourse(courseID);
                DataManager.getInst().saveData();
            }
        }
        return true;
    }
}
