package raijin;

import raijin.controllers.Controller;
import raijin.models.*;
import raijin.utils.DataManager;

public class Main {

    public static void main(String[] args) {
	// write your code here
        Main main = new Main();
//        main.initData();
//        main.readdata();
        main.run2();
    }

    void initData() {
        DataManager dataManager = DataManager.getInst();
        Course course1 = new Course("IT2017", "Computer Network");
        Course course2 = new Course("IT2018", "Database");
        Course course3 = new Course("IT2019", "Database Lab");
        Course course4 = new Course("IT2020", "Computer Architecture");
        Course course5 = new Course("IT2021", "Computer Architecture Lab");
        Course course6 = new Course("IT2022", "Software Engineering");
        Course course7 = new Course("MI1001", "Math I");
        Course course8 = new Course("MI1002", "Math II");
        Course course9 = new Course("MI1003", "Math III");
        Course course10 = new Course("MI1004", "Math IV");
        dataManager.addCourse(course1);
        dataManager.addCourse(course2);
        dataManager.addCourse(course3);
        dataManager.addCourse(course4);
        dataManager.addCourse(course5);
        dataManager.addCourse(course6);
        dataManager.addCourse(course7);
        dataManager.addCourse(course8);
        dataManager.addCourse(course9);
        dataManager.addCourse(course10);
        //
        CreditStudent creditStudent1 = new CreditStudent("20142137", "hung96", "19-1-1996", "0987134200");
        CreditStudent creditStudent2 = new CreditStudent("S1001", "nghia123", "1-1-1996", "0987134435");
        CreditStudent creditStudent3 = new CreditStudent("S1002", "thanhlt", "2-2-1996", "0987134567");
        CreditStudent creditStudent4 = new CreditStudent("S1003", "cong123", "3-3-1996", "0987134548");
        CreditStudent creditStudent5 = new CreditStudent("S1004", "tuan123", "4-4-1996", "0987134478");
        dataManager.addStudent(creditStudent1);
        dataManager.addStudent(creditStudent2);
        dataManager.addStudent(creditStudent3);
        dataManager.addStudent(creditStudent4);
        dataManager.addStudent(creditStudent5);
        for (int i = 10; i < 100; i++) {
            dataManager.addStudent(new CreditStudent("S10"+i, "hung96", "19-1-1996", "0987134200"));
        }
        AnnualStudent annualStudent1 = new AnnualStudent("AS1005", "cuong123", "5-5-1996", "0934523456");
        AnnualStudent annualStudent2 = new AnnualStudent("AS1006", "dung123", "6-6-1996", "0934527852");
        AnnualStudent annualStudent3 = new AnnualStudent("AS1007", "nam123", "7-7-1996", "0934525489");
        AnnualStudent annualStudent4 = new AnnualStudent("AS1008", "quynhanh123", "8-8-1996", "0934521704");
        AnnualStudent annualStudent5 = new AnnualStudent("AS1009", "huy123", "9-9-1996", "0934528947");
        dataManager.addStudent(annualStudent1);
        dataManager.addStudent(annualStudent2);
        dataManager.addStudent(annualStudent3);
        dataManager.addStudent(annualStudent4);
        dataManager.addStudent(annualStudent5);
        for (int i = 10; i < 100; i++) {
            dataManager.addStudent(new AnnualStudent("AS10"+i, "hung96", "19-1-1996", "0987134200"));
        }
        //
        AnnualClass annualClass1 = new AnnualClass("C1061", "ICT K61");
        AnnualClass annualClass2 = new AnnualClass("C1060", "ICT K60");
        AnnualClass annualClass3 = new AnnualClass("C1059", "ICT K59");
        AnnualClass annualClass4 = new AnnualClass("C1058", "ICT K58");
        AnnualClass annualClass5 = new AnnualClass("C1057", "ICT K57");
        dataManager.addAnnualClass(annualClass1);
        dataManager.addAnnualClass(annualClass2);
        dataManager.addAnnualClass(annualClass3);
        dataManager.addAnnualClass(annualClass4);
        dataManager.addAnnualClass(annualClass5);
        //
        Manager manager = new Manager("M1001", "hung96", "19-1-1996", "0987135429");
        Manager manager2 = new Manager("M1002", "hung96", "19-1-1996", "0987135341");
        dataManager.addManager(manager);
        dataManager.addManager(manager2);
    }

    void readdata() {
        DataManager dataManager = DataManager.getInst();
        System.out.println("print course:");
        for (Course course : DataManager.getInst().getCourseList()) {
            System.out.println(course.getId() + " " + course.getName());
        }
        System.out.println("print student:");
        for (Student student : dataManager.getStudentList()) {
            System.out.println(student.getId()  + " " +  student.getName());
        }
        System.out.println("print class:");
        for (AnnualClass annualClass1 : dataManager.getAnnualClassList()) {
            System.out.println(annualClass1.getId()  + " " + annualClass1.getName());
        }
        System.out.println("print manager:");
        for (Manager manager : dataManager.getManagerList()) {
            System.out.println(manager.getId() + " " + manager.getName());
        }
        System.out.println("dependence:");
        System.out.println(dataManager.findCourseByID("IT2017").getStudentResultList().size());
        System.out.println(dataManager.findStudentByID("20142137").getCourseList());
    }

    void run2() {
        Controller controller = new Controller();
    }
}
