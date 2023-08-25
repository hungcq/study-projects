package com.company.controllers.enemyplanes;

import com.company.controllers.ControllerManager;
import com.company.models.GameConfig;

/**
 * Created by 1918 on 06-May-16.
 */
public class EnemyPlaneControllerManager extends ControllerManager {

    private  int count = 0;
    private int planeType = 0;

    public EnemyPlaneControllerManager() {
        super();
    }

    public void run() {
        super.run();
        count++;
        planeType++;
        if (GameConfig.getInst().durationInSecond(count) > 2) {
            count = 0;
            for (int x = 40; x < GameConfig.getInst().getScreenWidth() - 40; x += 100) {
//                EnemyPlane enemyPlane = new EnemyPlane(x,0,32,32);
//                ImageDrawer imageDrawer = new ImageDrawer("resources/plane1.png");
//                EnemyPlaneController enemyPlaneController = new EnemyPlaneController(enemyPlane,imageDrawer);
//                this.singleControllerVector.add(enemyPlaneController);
                    if (planeType % 2 == 0) {
                        this.singleControllerVector.add(EnemyPlaneController.create(EnemyPlaneType.BLACK, x, 0));
                    } else {
                        this.singleControllerVector.add(EnemyPlaneController.create(EnemyPlaneType.WHITE, x, 0));
                    }
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
