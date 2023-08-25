package vn.edu.techkids.controllers;

import java.awt.*;
import java.util.Iterator;
import java.util.Vector;

/**
 * Created by qhuydtvt on 5/6/2016.
 */
public class ControllerManager implements Controller  {

    protected  Vector<SingleController> singleControllerVector;

    public ControllerManager() {
        singleControllerVector = new Vector<SingleController>();
    }

    public void add(SingleController controller) {
        singleControllerVector.add(controller);
    }

    public int size() {
        return this.singleControllerVector.size();
    }

    @Override
    public void run() {
        Iterator<SingleController> iterator = singleControllerVector.iterator();
        while(iterator.hasNext()) {
            SingleController singleController = iterator.next();
            if(!singleController.getGameObject().isAlive()) {
                iterator.remove();
            } else {
                singleController.run();
            }
        }
    }

    @Override
    public void paint(Graphics g) {
        for(SingleController controller : singleControllerVector) {
            controller.paint(g);
        }
    }
}
