package com.company.controllers;

import com.company.models.GameConfig;
import com.company.models.GameObject;
import com.company.models.Plane;
import com.company.views.GameDrawer;

/**
 * Created by 1918 on 09-May-16.
 */
public class EnemyBulletController2 extends SingleController implements Colliable {
    public EnemyBulletController2(GameObject gameObject, GameDrawer gameDrawer) {
        super(gameObject, gameDrawer);
        this.gameVector.dy = 5;
        this.gameVector.dx = -5;
        CollisionPool.getInst().add(this);
    }

    public void run() {
        super.run();
        if (!GameConfig.getInst().isInScreen(this.gameObject.getRect())) {
            this.gameObject.setAlive(false);
        }
    }

    @Override
    public void onCollide(Colliable c) {
        if (c instanceof PlaneController) {
            Plane plane = (Plane) c.getGameObject();
            plane.decreaseHP(3);
            if (plane.getHP() <= 0) {
                plane.setAlive(false);
            }
        }
    }
}
