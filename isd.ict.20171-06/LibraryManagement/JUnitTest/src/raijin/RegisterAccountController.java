package raijin;

/**
 * Created by 1918 on 19-Nov-17.
 */

public class RegisterAccountController {

    public RegisterAccountController() {
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
        for (int i = 0; i < contact.length(); i++) {
            if (!Character.isDigit(contact.charAt(i))) {
                return false;
            }
        }
        return true;
    }
}
