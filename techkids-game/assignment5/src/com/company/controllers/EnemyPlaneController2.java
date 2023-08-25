package com.company.controllers;

import com.company.models.*;
import com.company.views.GameDrawer;
import com.company.views.ImageDrawer;

import java.awt.*;

/**
 * Created by 1918 on 09-May-16.
 */
public class EnemyPlaneController2 extends SingleController implements Colliable{

    private EnemyBulletControllerManager enemyBulletControllerManager;
    private int count = 0;
    public EnemyPlaneController2(GameObject gameObject, GameDrawer gameDrawer) {
        super(gameObject, gameDrawer);
        this.gameVector.dy = 2;
        this.gameVector.dx = 2;
        enemyBulletControllerManager = new EnemyBulletControllerManager();
        CollisionPool.getInst().add(this);
    }

    public void run() {
        super.run();
        this.enemyBulletControllerManager.run();

        count++;
        if(GameConfig.getInst().durationInSecond(count) >= 2) {
            count = 0;
            EnemyBullet enemyBullet = new EnemyBullet(
                    gameObject.getX() + gameObject.getWidth() / 2 - EnemyBullet.WIDTH/2,
                    gameObject.getY() + gameObject.getHeight(),
                    EnemyBullet.WIDTH,
                    EnemyBullet.HEIGHT
            );
            ImageDrawer imageDrawer = new ImageDrawer("resources/enemy_bullet.png");
            EnemyBulletController2 enemyBulletController2 = new EnemyBulletController2(
                    enemyBullet,
                    imageDrawer
            );
            this.enemyBulletControllerManager.add(enemyBulletController2);

        }
        if(!GameConfig.getInst().isInScreen(this.gameObject.getRect())) {
            this.gameObject.setAlive(false);
        }
    }

    public void paint(Graphics g) {
        super.paint(g);
        this.enemyBulletControllerManager.paint(g);
    }

    @Override
    public void onCollide(Colliable c) {
        if(c instanceof PlaneController){
            Plane plane=(Plane)c.getGameObject();
            plane.decreaseHP(0);
        }
    }
}
