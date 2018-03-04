package com.company.controllers;

import com.company.models.Bullet;
import com.company.models.GameConfig;
import com.company.views.ImageDrawer;
import com.company.models.EnemyPlane;

/**
 * Created by 1918 on 29-Apr-16.
 */
public class BulletController extends SingleController implements Colliable{

    public static final int SPEED = 15;

    public BulletController(Bullet gameObject, ImageDrawer gameDrawer) {
        super(gameObject, gameDrawer);
        gameVector.dy = -SPEED;
        CollisionPool.getInst().add(this);
    }
    public void run() {
        super.run();
        if(!GameConfig.getInst().isInScreen(this.gameObject)) {
            this.gameObject.setAlive(false);
        }
    }

    @Override
    public void onCollide(Colliable c) {
        if(c instanceof EnemyPlaneController) {
            EnemyPlane enemyPlane = (EnemyPlane)c.getGameObject();
            enemyPlane.decreaseHP();
            if(enemyPlane.getHP() <= 0) {
                enemyPlane.setAlive(false);
            }
            System.out.println(enemyPlane.getHP());
            gameObject.setAlive(false);
        }
    }
}
