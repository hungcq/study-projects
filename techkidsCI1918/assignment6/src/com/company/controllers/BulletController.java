package com.company.controllers;

import com.company.controllers.enemybullets.EnemyBulletController;
import com.company.controllers.enemyplanes.EnemyPlaneController;
import com.company.models.*;
import com.company.views.ImageDrawer;

/**
 * Created by 1918 on 29-Apr-16.
 */
public class BulletController extends SingleController implements Colliable{

    public static int SPEED = 15;

    public BulletController(Bullet gameObject, ImageDrawer gameDrawer) {
        super(gameObject, gameDrawer);
        gameVector.dy = -SPEED;
        CollisionPool.getInst().add(this);
    }

    public BulletController(Bullet gameObject, ImageDrawer gameDrawer, GameVector gameVector) {
        super(gameObject, gameDrawer);
        this.gameVector = gameVector;
        CollisionPool.getInst().add(this);
    }

    public void run() {
        super.run();
        if(!GameConfig.getInst().isInScreen(this.gameObject.getRect())) {
            this.gameObject.setAlive(false);
        }
    }

    public static void increase(int ratio) {
        SPEED *= ratio;
        Bullet.bonusDamage(ratio);
    }

    @Override
    public void onCollide(Colliable c) {
        if (c instanceof EnemyPlaneController) {
            EnemyPlane enemyPlane = (EnemyPlane) c.getGameObject();
            enemyPlane.decreaseHP(Bullet.getDamage());
            if (enemyPlane.getHP() <= 0) {
                enemyPlane.setAlive(false);
            }
            gameObject.setAlive(false);
        } else if(c instanceof EnemyBulletController) {
            c.getGameObject().setAlive(false);
        }
    }
}
