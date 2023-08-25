package vn.edu.techkids;

import java.util.Vector;

public class Main {

    public static void main(String[] args) {

        Vector<Integer> integerVector = new Vector<Integer>();
        integerVector.add(-1);
        integerVector.add(7);
        integerVector.add(10);
        integerVector.add(-2);
        integerVector.add(20);

        for(Integer i : integerVector) {
            if(i < 0){
                integerVector.remove(i);
            }
        }

        //GameWindow gameWindow = new GameWindow();
    }
}
