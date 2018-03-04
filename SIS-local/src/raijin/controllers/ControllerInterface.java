package raijin.controllers;

import raijin.models.Registerable;
import raijin.models.*;

import java.util.List;

/**
 * Created by 1918 on 05-May-17.
 */
public interface ControllerInterface {
    boolean editStudentPassword(String studentID, String newPassword);
    boolean editStudentInfo(String studentID, String birthday, String phoneNumber);
    // return false if studentID already exist
    boolean addStudent(Student student);
    // return false if not studentID already exist
    boolean removeStudent(Student student);

    boolean addCourse(Course course);
    boolean removeCourse(Course course);

    boolean addManager(Manager manager);

    boolean addStudentToClass(AnnualClass annualClass, AnnualStudent student);
    boolean removeStudentFromClass(AnnualClass annualClass, AnnualStudent student);

    // registerable truyen vao 1 thang student hoac 1 annual class
    boolean registerCourse(Registerable registerable, Course course);

    boolean updateStudentResult(Course course, String studentID, double midPoint, double finalPoint);

    boolean ableToGraduate(Student student);

    LoginResult login(String userName, String password);

    List<Student> getStudentList();
    List<Course> getCourseList();
    List<Manager> getManagerList();
    List<AnnualClass> getClassList();
    List<StudentResult> getStudentResultList(Course course);
    List<Student> getStudentListInClass(AnnualClass annualClass);
    List<Course> getRegisteredCourses(String studentID);
    void logOut();
}
