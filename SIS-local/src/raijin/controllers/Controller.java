package raijin.controllers;

import raijin.models.Registerable;
import raijin.views.LoginView;
import raijin.views.ViewInterface;
import raijin.models.*;
import raijin.utils.DataManager;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by 1918 on 24-Apr-17.
 */
public class Controller implements ControllerInterface {

    private DataManager dataManager;

    public Controller() {
        LoginView view = new LoginView(this);
        view.pack();
        view.setLocationRelativeTo(null);
        view.setVisible(true);
        dataManager = DataManager.getInst();
    }


    @Override
    public boolean editStudentPassword(String studentID, String newPassword) {
        Student student = dataManager.findStudentByID(studentID);
        if (student == null) return false;
        student.editInfo(newPassword);
        dataManager.saveData();
        return true;
    }

    @Override
    public boolean editStudentInfo(String studentID, String birthday, String phoneNumber) {
        Student student = dataManager.findStudentByID(studentID);
        if (student == null) return false;
        student.editInfo(birthday, phoneNumber);
        dataManager.saveData();
        return true;
    }

    @Override
    public boolean addStudent(Student student) {
        return dataManager.addStudent(student);
    }

    @Override
    public boolean removeStudent(Student student) {
        return dataManager.removeStudent(student);
    }

    @Override
    public boolean addCourse(Course course) {
        return  dataManager.addCourse(course);
    }

    @Override
    public boolean removeCourse(Course course) {
        return dataManager.removeCourse(course);
    }

    @Override
    public boolean addManager(Manager manager) {
        return dataManager.addManager(manager);
    }

    @Override
    public boolean addStudentToClass(AnnualClass annualClass, AnnualStudent student) {
        return annualClass.addStudent(student.getId());
    }

    @Override
    public boolean removeStudentFromClass(AnnualClass annualClass, AnnualStudent student) {
        return annualClass.removeStudent(student.getId());
    }

    @Override
    public boolean registerCourse(Registerable registerable, Course course) {
        return registerable.registerCourse(course.getId());
    }

    @Override
    public boolean updateStudentResult(Course course, String studentID, double midPoint, double finalPoint) {
        return course.updateStudentResult(studentID, midPoint, finalPoint);
    }

    @Override
    public boolean ableToGraduate(Student student) {
        return student.ableToGraduate();
    }

    @Override
    public LoginResult login(String userName, String password) {
        Student student = DataManager.getInst().findStudentByID(userName);
        Manager manager = DataManager.getInst().findManagerByID(userName);
        if (student != null) {
            if (student.getPassword().equals(password)) return LoginResult.TYPE_STUDENT;
            else return LoginResult.LOGIN_FAIL;
        }
        if (manager != null) {
            if (manager.getPassword().equals(password)) return LoginResult.TYPE_MANAGER;
            else return LoginResult.LOGIN_FAIL;
        }
        return LoginResult.LOGIN_FAIL;
    }

    @Override
    public List<Student> getStudentList() {
        return dataManager.getStudentList();
    }

    @Override
    public List<Course> getCourseList() {
        return dataManager.getCourseList();
    }

    @Override
    public List<Manager> getManagerList() {
        return dataManager.getManagerList();
    }

    @Override
    public List<AnnualClass> getClassList() {
        return dataManager.getAnnualClassList();
    }

    @Override
    public List<StudentResult> getStudentResultList(Course course) {
        return course.getStudentResultList();
    }

    @Override
    public List<Student> getStudentListInClass(AnnualClass annualClass) {
        List<Student> resultList = new ArrayList<>();
        for (String studentID : annualClass.getStudentIDList()) {
            Student student = dataManager.findStudentByID(studentID);
            if (student != null)
                resultList.add(dataManager.findStudentByID(studentID));
        }
        return resultList;
    }

    @Override
    public List<Course> getRegisteredCourses(String studentID) {
        List<Course> courseList = new ArrayList<>();
        if (dataManager.findStudentByID(studentID) == null) {
            return courseList;
        }
        Student student = dataManager.findStudentByID(studentID);
        for (String courseID : student.getCourseList()) {
            Course course = dataManager.findCourseByID(courseID);
            if (course != null) courseList.add(course);
        }
        return courseList;
    }

    public void logOut() {
        DataManager.setCurrentUser(null);
        DataManager.getInst().saveData();
    }
}
