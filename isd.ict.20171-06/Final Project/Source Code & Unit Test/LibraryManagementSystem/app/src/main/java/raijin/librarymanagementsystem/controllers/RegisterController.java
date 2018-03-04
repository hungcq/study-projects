package raijin.librarymanagementsystem.controllers;

import java.util.Date;

import raijin.librarymanagementsystem.Constants;
import raijin.librarymanagementsystem.entities.PostResult;
import raijin.librarymanagementsystem.entities.Account;
import raijin.librarymanagementsystem.entities.webservices.DataHandler;
import raijin.librarymanagementsystem.utils.Utils;

/**
 * Created by 1918 on 19-Nov-17.
 */

public class RegisterController {

    public RegisterController() {
    }

    public PostResult registerAccount(String username, String password, String name, String email, String gender, String contact) {
        Account user = new Account(username, password, name, email, gender, contact, Constants.CUSTOMER);
        return DataHandler.requestAddAccount(user);
    }

    public PostResult registerHustAccount(String username, String password, String name, String email,
                                          String gender, String contact, String studentId, String studyPeriod) {
        Account user = new Account(username, password, name, email, gender, contact, studentId, studyPeriod, Constants.CUSTOMER);
        return DataHandler.requestAddAccount(user);
    }

    public CheckResult checkForm(String username, String password, String name, String email,
                                 String gender, String contact, String studentId, String period, boolean isHustStudent) {
        if (!checkUsername(username)) {
            return new CheckResult(false, "Invalid username. Must start with a letter.");
        }
        if (!checkPassword(password)) {
            return new CheckResult(false, "Invalid password. < 6 characters.");
        }
        if (!checkName(name)) {
            return new CheckResult(false, "Invalid name.");
        }
        if (!checkEmail(email)) {
            return new CheckResult(false, "Invalid email.");
        }
        if (!checkGender(gender)) {
            return new CheckResult(false, "Invalid gender. Only F and M are allowed.");
        }
        if (!checkContact(contact)) {
            return new CheckResult(false, "Invalid phone number.");
        }
        if (isHustStudent) {
            if (!checkStudentId(studentId)) {
                return new CheckResult(false, "Invalid student ID.");
            }
            if (!checkStudyPeriod(period)) {
                return new CheckResult(false, "Invalid study period.");
            }
        }
        return new CheckResult(true, "");
    }

    public boolean checkUsername(String username) {
        if (username.length() == 0) return false;
        if (!Utils.isEnglishLetter(username.charAt(0))) {
            return false;
        }
        return true;
    }

    public boolean checkPassword(String password) {
        if (password.length() < 6) {
            return false;
        }
        return true;
    }

    public boolean checkName(String name) {
        if (name.length() == 0) return false;
        for (int i = 0; i < name.length(); i++) {
            if (!Utils.isEnglishLetter(name.charAt(i)) && !(name.charAt(i) == ' ')) {
                return false;
            }
        }
        return true;
    }

    public boolean checkEmail(String email) {
        for (int i = 0; i < email.length(); i++) {
            if (email.charAt(i) == '@') {
                return true;
            }
        }
        return false;
    }

    public boolean checkGender(String gender) {
        if (gender.length() != 1) {
            return false;
        }
        if (gender.charAt(0) != 'M' && gender.charAt(0) != 'F') {
            return false;
        }
        return true;
    }

    public boolean checkContact(String contact) {
        if (contact.length() == 0) return false;
        for (int i = 0; i < contact.length(); i++) {
            if (!Utils.isDigit(contact.charAt(i))) {
                return false;
            }
        }
        return true;
    }

    public boolean checkStudentId(String studentID) {
        if (studentID.length() != 8) return false;
        for (int i = 0; i < studentID.length(); i++) {
            if (!Utils.isDigit(studentID.charAt(i))) {
                return false;
            }
        }

        return true;
    }

    public boolean checkStudyPeriod(String period) {
        if (period.length() != 9) return false;
        for (int i = 0; i < 4; i++) {
            if (!Utils.isDigit(period.charAt(i))) {
                return false;
            }
        }
        if (period.charAt(4) != '-') {
            return false;
        }
        for (int i = 5; i < 9; i++) {
            if (!Utils.isDigit(period.charAt(i))) {
                return false;
            }
        }
        Date date = new Date();
        date.setYear(Integer.parseInt(period.substring(5)));
        if (date.before(new Date())) {
            return false;
        }
        return true;
    }
}
