package raijin.studentmanager;

import java.util.List;

import raijin.studentmanager.models.department.Department;
import raijin.studentmanager.models.userinfo.UserInfo;

/**
 * Created by 1918 on 12-Mar-17.
 */

public class Utils {
    public static String AUTHORIZATION_TOKEN = null;

    public static String weekdayFromInt(int weekday) {
        String day = null;
        switch (weekday) {
            case 2:
                day = "Monday";
                break;
            case 3:
                day = "Tuesday";
                break;
            case 4:
                day = "Wednesday";
                break;
            case 5:
                day = "Thursday";
                break;
            case 6:
                day = "Friday";
                break;
            case 7:
                day = "Saturday";
                break;
            case 8:
                day = "Sunday";
                break;
            default:
                day = "Someday";
                break;
        }
        return day;
    }
}
