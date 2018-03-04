package raijin.models;

import raijin.utils.DataManager;

/**
 * Created by ThanhLT on 31-Mar-17.
 */
public class AnnualStudent extends Student implements Registerable {

    public AnnualStudent(String id, String password, String dateOfBirth, String phoneNumber) {
        super(id, password, dateOfBirth, phoneNumber);
    }

    public AnnualStudent(String id, String name, String password, String dateOfBirth, String phoneNumber) {
        super(id, name, password, dateOfBirth, phoneNumber);
    }

    @Override
    public boolean registerCourse(String courseID) {
        if (!courseList.contains(courseID)) {
            courseList.add(courseID);
            DataManager.getInst().findCourseByID(courseID).getStudentResultList().add(new StudentResult(id, name));
            return true;
        }
        return false;
    }
}
