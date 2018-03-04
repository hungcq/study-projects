package raijin.utils;

import raijin.models.*;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * Created by 1918 on 01-May-17.
 */
public class DataManager {
    private static DataManager dataManager;
    private FileInputStream fileInputStream;
    private FileOutputStream fileOutputStream;
    private ObjectInputStream objectInputStream;
    private ObjectOutputStream objectOutputStream;

    private List<Course> courseList;
    private List<AnnualClass> annualClassList;
    private List<Student> studentList;
    private List<Manager> managerList;

    private static User currentUser;
    public static String getCurrentID(){
        return currentUser.getId();
    }
    public static String getCurrentPassword(){
        return currentUser.getPassword();
    }
    public static void setCurrentUser(User u){
        currentUser = u;
    }


    private DataManager() {
        readCourse();
        readAnnualClass();
        readStudent();
        readManager();
    }

    public static DataManager getInst() {
        if (dataManager == null) {
            dataManager = new DataManager();
        }
        return dataManager;
    }

    private void readCourse() {
        fileInputStream = null;
        objectInputStream = null;
        courseList = new ArrayList<>();
        try {
            fileInputStream = new FileInputStream("course.ser");
            objectInputStream = new ObjectInputStream(fileInputStream);
            courseList = (List<Course>) objectInputStream.readObject();
            objectInputStream.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void readAnnualClass() {
        fileInputStream = null;
        objectInputStream = null;
        annualClassList = new ArrayList<>();
        try {
            fileInputStream = new FileInputStream("annual_class.ser");
            objectInputStream = new ObjectInputStream(fileInputStream);
            annualClassList = (List<AnnualClass>) objectInputStream.readObject();
            objectInputStream.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void readStudent() {
        fileInputStream = null;
        objectInputStream = null;
        studentList = new ArrayList<>();
        try {
            fileInputStream = new FileInputStream("student.ser");
            objectInputStream = new ObjectInputStream(fileInputStream);
            studentList = (List<Student>) objectInputStream.readObject();
            objectInputStream.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void readManager() {
        fileInputStream = null;
        objectInputStream = null;
        managerList = new ArrayList<>();
        try {
            fileInputStream = new FileInputStream("manager.ser");
            objectInputStream = new ObjectInputStream(fileInputStream);
            managerList = (List<Manager>) objectInputStream.readObject();
            objectInputStream.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public List<Course> getCourseList() {
        return courseList;
    }

    public boolean addCourse(Course course) {
        for (Course course1 : courseList) {
            if (course1.getId().equals(course.getId())) return false;
        }
        courseList.add(course);
        saveCourse();
        return true;
    }

    public boolean removeCourse(Course course) {
        Iterator<Course>  iterator = courseList.iterator();
        while (iterator.hasNext()) {
            Course course1 = iterator.next();
            if (course1.equals(course)) {
                iterator.remove();
                saveCourse();
                return true;
            }
        }
        return false;
    }

    public List<AnnualClass> getAnnualClassList() {
        return annualClassList;
    }

    public boolean addAnnualClass(AnnualClass annualClass) {
        for (AnnualClass annualClass1 : annualClassList) {
            if (annualClass1.getId().equals(annualClass.getId())) return false;
        }
        annualClassList.add(annualClass);
        saveAnnualClass();
        return true;
    }

    public boolean removeClass(AnnualClass annualClass) {
        Iterator<AnnualClass>  iterator = annualClassList.iterator();
        while (iterator.hasNext()) {
            AnnualClass annualClass1 = iterator.next();
            if (annualClass1.equals(annualClass)) {
                iterator.remove();
                saveAnnualClass();
                return true;
            }
        }
        return false;
    }

    public List<Student> getStudentList() {
        return studentList;
    }

    public boolean addStudent(Student student) {
        for (Student student1 : studentList) {
            if (student1.getId().equals(student.getId())) return false;
        }
        studentList.add(student);
        saveStudent();
        return true;
    }

    public List<Manager> getManagerList() {
        return managerList;
    }

    public boolean addManager(Manager manager) {
        for (Manager manager1 : managerList) {
            if (manager1.getId().equals(manager.getId())) return false;
        }
        managerList.add(manager);
        saveManager();
        return true;
    }

    public boolean removeStudent(Student student) {
//        studentList.removeIf(student1 -> student1.equals(student));
        Iterator<Student>  iterator = studentList.iterator();
        while (iterator.hasNext()) {
            Student student1 = iterator.next();
            if (student1.equals(student)) {
                iterator.remove();
                saveStudent();
                return true;
            }
        }
        return false;
    }

    private void saveCourse() {
        fileOutputStream = null;
        objectOutputStream = null;
        try {
            fileOutputStream = new FileOutputStream("course.ser");
            objectOutputStream = new ObjectOutputStream(fileOutputStream);
            objectOutputStream.writeObject(courseList);
            objectOutputStream.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void saveAnnualClass() {
        fileOutputStream = null;
        objectOutputStream = null;
        try {
            fileOutputStream = new FileOutputStream("annual_class.ser");
            objectOutputStream = new ObjectOutputStream(fileOutputStream);
            objectOutputStream.writeObject(annualClassList);
            objectOutputStream.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void saveStudent() {
        fileOutputStream = null;
        objectOutputStream = null;
        try {
            fileOutputStream = new FileOutputStream("student.ser");
            objectOutputStream = new ObjectOutputStream(fileOutputStream);
            objectOutputStream.writeObject(studentList);
            objectOutputStream.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void saveManager() {
        fileOutputStream = null;
        objectOutputStream = null;
        try {
            fileOutputStream = new FileOutputStream("manager.ser");
            objectOutputStream = new ObjectOutputStream(fileOutputStream);
            objectOutputStream.writeObject(managerList);
            objectOutputStream.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void saveData() {
        saveCourse();
        saveStudent();
        saveAnnualClass();
        saveManager();
    }

    public Course findCourseByID(String courseID) {
        for (Course course : courseList) {
            if (course.getId().equals(courseID)) return course;
        }
        return null;
    }

    public Student findStudentByID(String studentID) {
        for (Student student : studentList) {
            if (student.getId().equals(studentID)) return student;
        }
        return null;
    }

    public Manager findManagerByID(String managerID) {
        for (Manager manager : managerList) {
            if (manager.getId().equals(managerID)) return manager;
        }
        return null;
    }

    public AnnualClass findClassByID(String classID) {
        for (AnnualClass annualClass : annualClassList) {
            if (annualClass.getId().equals(classID)) return annualClass;
        }
        return null;
    }
}
