package com.company.controllers;

import com.company.models.EnemyPlane;
import com.company.models.GameConfig;
import com.company.views.ImageDrawer;

/**
 * Created by 1918 on 06-May-16.
 */
public class EnemyPlaneControllerManager extends ControllerManager{

    private  int count = 0;

    public EnemyPlaneControllerManager() {
        super();
    }

    public void run() {
        super.run();
        count++;
        if(GameConfig.getInst().durationInSecond(count) > 4) {
            count = 0;
            for(int x = 40; x<GameConfig.getInst().getScreenWidth() - 40;x+=100) {
                EnemyPlane enemyPlane = new EnemyPlane(x,0,32,32);
                ImageDrawer imageDrawer = new ImageDrawer("resources/enemy_plane_white_1.png");
                EnemyPlaneController enemyPlaneController = new EnemyPlaneController(enemyPlane,imageDrawer);
                this.singleControllerVector.add(enemyPlaneController);
            }
        }
    }

    private static EnemyPlaneControllerManager inst;
    public static EnemyPlaneControllerManager getInst() {
        if(inst == null) {
            inst = new EnemyPlaneControllerManager();
        }
        return inst;
    }

}
