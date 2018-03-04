package raijin.models;

/**
 * Created by CongTT on 31-Mar-17.
 */
public class Manager extends User {

    public Manager(String id, String password, String dateOfBirth, String phoneNumber) {
        super(id, password, dateOfBirth, phoneNumber);
    }

    public Manager(String id, String name, String password, String dateOfBirth, String phoneNumber) {
        super(id, name, password, dateOfBirth, phoneNumber);
    }
}
