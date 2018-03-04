package raijin;

/**
 * Created by Huy Nguyen on 19-Nov-17.
 */

public class AddBookController {

    public AddBookController() {
    }

    public boolean checkISBN(String isbn) {
        if(isbn.length() < 10 || isbn.length() > 13) {
            return false;
        }
        for(int i = 0; i < isbn.length(); i++) {
            if (!Utils.isDigit(isbn.charAt(i))) {
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
