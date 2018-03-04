import java.text.DecimalFormat;

import static java.lang.Math.sqrt;

public class Quadratic {

    public Quadratic(){

    }

    public String calculate(double a, double b, double c){
        DecimalFormat df = new DecimalFormat("#.###");
        if(a == 0){
            if (b != 0) {
                return String.valueOf(c / b);
            }
            return "No solution";
        } else {
            double delta = b * b - 4 * a * c;
            if (delta < 0) {
                return "No solution";
            } else if (delta == 0){
                return String.valueOf(-b / (2 * a));
            } else {
                double x1 = (-b + sqrt(delta)) / (2 * a);
                double x2 = (-b - sqrt(delta)) / (2 * a);
                return (String.valueOf(x1).concat(" and ")).concat(String.valueOf(x2));
            }
        }
    }
}

