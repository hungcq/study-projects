package raijin;

/**
 * Created by 1918 on 18-Nov-17.
 */

public class Utils {
    public static boolean isEnglishLetter(char c) {
        return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');
    }

    public static boolean isDigit(char c) {
        return c >= '0' && c <= '9';
    }
}
