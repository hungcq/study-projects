import java.text.DecimalFormat;

public class Linear {

    public Linear(){

    }

    public String calculate(double A1, double B1, double C1, double A2, double B2, double C2){


        if(A1==0&&A2==0&&B1==0&&B2==0&&C1==0&&C2==0){
            return "Infinite solutions";
        }

        double D =(A1*B2-A2*B1);
        if(D==0){
            if(A1==0 && B1 ==0 && C1 !=0) {

                return "No solution";

            }
            if(A2==0 && B2 ==0){
                if(C2!=0){

                    return "No solution";
                }
                else {
                    if(A1==0){

                    }
                    else if(B1==0){
                    }else {

                    }
                    return "Infinite solutions";
                }
            }
            if(A1==0 && B1 ==0 && C1 ==0) {
                if(A2==0){
                }
                else if(B2==0){

                }else {

                }

                return "Infinite solutions";
            }
            if(A1==0 && A2 ==0){
                if(C1/B1 == C2/B2){

                    return "Infinite solutions";
                }
                else {

                    return "No solution";
                }
            }
            if(B1==0 && B2 ==0){
                if(C1/A1 == C2/A2){

                    return "Infinite solutions";
                }
                else {

                    return "No solution";
                }
            }
            if(C2==C1*A2/A1){

                return "Infinite solutions";
            }else {

                return "No solution";
            }
        } else{

            double y =((C1*A2/A1-C2)/(B1*A2/A1-B2));
            double x = (C1-B1*y)/A1;

            return "1 solution";

        }


    }
}
