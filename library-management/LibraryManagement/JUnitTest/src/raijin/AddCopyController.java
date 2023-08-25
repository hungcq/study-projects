package raijin;

/**
 * Created by 1918 on 19-Nov-17.
 */

public class AddCopyController {

    public AddCopyController() {
    }

    public boolean checkBookNumber(String bookNumber) {
        if (bookNumber.length() != 6) return false;
        for (int i = 0; i < 2; i++) {
            if (!Utils.isEnglishLetter(bookNumber.charAt(i))) {
                return false;
            }
        }
        for(int i = 2; i < 6; i++) {
            if (!Utils.isDigit(bookNumber.charAt(i))) {
                return false;
            }
        }
        return true;
    }

    public boolean checkType(String type) {
        if (type.length() != 1) return false;
        if(type.charAt(0) != 'B' && type.charAt(0) != 'R') {
            return false;
        }
        return true;
    }

    public boolean checkPrice(String price) {
        for(int i = 0; i < price.length(); i++) {
            if (!Utils.isDigit(price.charAt(i))) {
                return false;
            }
        }
        return true;
    }
}
