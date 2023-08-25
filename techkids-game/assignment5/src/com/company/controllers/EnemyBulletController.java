package com.company.controllers;

import com.company.models.GameConfig;
import com.company.models.GameObject;
import com.company.models.Plane;
import com.company.views.GameDrawer;

/**
 * Created by 1918 on 03-May-16.
 */
public class EnemyBulletController extends SingleController implements Colliable {
    public EnemyBulletController(GameObject gameObject, GameDrawer gameDrawer) {
        super(gameObject, gameDrawer);
        this.gameVector.dy = 5;
        CollisionPool.getInst().add(this);
    }

    public void run() {
        super.run();
        if(!GameConfig.getInst().isInScreen(this.gameObject.getRect())) {
            this.gameObject.setAlive(false);
        }
    }
    @Override
    public void onCollide(Colliable c) {
        if (c instanceof PlaneController) {
            Plane plane = (Plane) c.getGameObject();
            plane.decreaseHP();
            if (plane.getHP() <= 0) {
                plane.setAlive(false);
            }
        }
    }
}
