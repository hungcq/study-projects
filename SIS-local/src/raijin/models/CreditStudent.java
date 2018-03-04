package raijin.models;

import raijin.utils.DataManager;

/**
 * Created by ThanhLT on 31-Mar-17.
 */
public class CreditStudent extends Student implements Registerable {

    public CreditStudent(String id, String password, String dateOfBirth, String phoneNumber) {
        super(id, password, dateOfBirth, phoneNumber);
    }

    public CreditStudent(String id, String name, String password, String dateOfBirth, String phoneNumber) {
        super(id, name, password, dateOfBirth, phoneNumber);
    }

    @Override
    public boolean registerCourse(String courseID) {
        if (!courseList.contains(courseID)) {
            courseList.add(courseID);
            DataManager.getInst().findCourseByID(courseID).getStudentResultList().add(new StudentResult(id, name));
            DataManager.getInst().saveData();
            return true;
        }
        return false;
    }
}
