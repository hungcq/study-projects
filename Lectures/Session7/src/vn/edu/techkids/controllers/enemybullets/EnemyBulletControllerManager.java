package vn.edu.techkids.controllers.enemybullets;

import vn.edu.techkids.controllers.ControllerManager;

/**
 * Created by qhuydtvt on 5/6/2016.
 */
public class EnemyBulletControllerManager extends ControllerManager {

    private EnemyBulletControllerManager() {
    }

    private static EnemyBulletControllerManager inst;
    public static EnemyBulletControllerManager getInst () {
        if(inst == null) {
            inst = new EnemyBulletControllerManager();
        }
        return inst;
    }
}
