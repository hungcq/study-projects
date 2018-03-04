package raijin.models;

import java.io.Serializable;

/**
 * Created by CongTT on 31-Mar-17.
 */
public abstract class User implements Serializable {
    protected String id;
    protected String password;
    protected String dateOfBirth;
    protected String phoneNumber;
    protected String name;
    private final String lastName[] = {"Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Đỗ", "Vũ", "Ngô"};
    private final String middleName[] = {"Thị", "Văn", "Quốc"};
    private final String firstName[] = {"Anh", "Công", "Cường", "Dũng", "Hưng", "Dương", "Đạt", "Kiên", "Long", "Phong", "Thành", "Tuấn", "Tùng", "Vinh"};

    public User(String id, String password, String dateOfBirth, String phoneNumber) {
        this.name = lastName[(int) (Math.random()*lastName.length)] + " "
                + middleName[(int) (Math.random()*middleName.length)] + " " + firstName[(int) (Math.random()*firstName.length)];
        this.id = id;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
        this.phoneNumber = phoneNumber;
    }

    public User(String id, String name, String password, String dateOfBirth, String phoneNumber) {
        this.id = id;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
        this.phoneNumber = phoneNumber;
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void editInfo(String password) {
        this.password = password;
    }

    public void editInfo(String dateOfBirth, String phoneNumber) {
        this.dateOfBirth = dateOfBirth;
        this.phoneNumber = phoneNumber;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
