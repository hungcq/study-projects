package com.company.controllers;

import java.awt.*;
import java.util.Iterator;
import java.util.Vector;

/**
 * Created by 1918 on 06-May-16.
 */
public class ControllerManager implements Controller {

    protected Vector<SingleController> singleControllerVector;

    public ControllerManager () {
        singleControllerVector = new Vector<SingleController>();
    }

    public int size() {
        return this.singleControllerVector.size();
    }

    public Vector<SingleController> getSingleControllerVector() {
        return singleControllerVector;
    }

    public void setSingleControllerVector(Vector<SingleController> singleControllerVector) {
        this.singleControllerVector = singleControllerVector;
    }

    public void add(SingleController controller) {
        singleControllerVector.add(controller);
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
        for(SingleController controller: singleControllerVector) {
            controller.paint(g);
        }
    }
}
