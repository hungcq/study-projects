package vn.edu.techkids.controllers;

import vn.edu.techkids.models.GameConfig;

/**
 * Created by qhuydtvt on 5/13/2016.
 */
public class BombControllerManager extends ControllerManager {

    private int interval = 0;

    @Override
    public void run() {
        super.run();
        interval++;
        if(GameConfig.getInst().durationInSeconds(interval) > 1) {
            interval = 0;
            BombController bombController = BombController.create();
            add(bombController);
        }
    }

    /* TODO Singleton */

}
