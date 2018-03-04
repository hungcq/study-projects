import java.text.DecimalFormat;

import static java.lang.Math.max;

public class Triangle {

    public Triangle(){

    }

    public String calculate(double A, double B, double C){
        if(A<=0 || B<=0 || C<=0){
            return "Invalid";
        }
        double max = Math.max(A,Math.max(B,C));

        if (max < (A+B+C-max)) {
            return "Triangle";
        }
        return "Not triangle";

    }
}
