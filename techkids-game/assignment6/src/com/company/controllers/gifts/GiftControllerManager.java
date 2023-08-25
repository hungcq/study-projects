package com.company.controllers.gifts;

import com.company.controllers.ControllerManager;
import com.company.controllers.enemyplanes.EnemyPlaneController;
import com.company.controllers.enemyplanes.EnemyPlaneControllerManager;
import com.company.controllers.enemyplanes.EnemyPlaneType;
import com.company.models.GameConfig;


/**
 * Created by 1918 on 12-May-16.
 */
public class GiftControllerManager extends ControllerManager {

    private  int count = 0;

    public void run() {
        super.run();
        count++;
        if (GameConfig.getInst().durationInSecond(count) > 3) {
            count = 0;
            int x = 300;
            this.singleControllerVector.add(GiftController.create(GiftType.BULLET, x+200, 0));
            this.singleControllerVector.add(GiftController.create(GiftType.BOOM, x, 0));
        }
    }

    private static GiftControllerManager inst;
    public static GiftControllerManager getInst() {
        if(inst == null) {
            inst = new GiftControllerManager();
        }
        return inst;
    }

}
