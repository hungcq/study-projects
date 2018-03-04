package raijin;

/**
 * Created by 1918 on 21-Nov-17.
 */

public class BorrowBookController {

    public BorrowBookController() {
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
}
