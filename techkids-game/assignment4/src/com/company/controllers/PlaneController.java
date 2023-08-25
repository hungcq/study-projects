package com.company.controllers;

import com.company.models.Bullet;
import com.company.models.EnemyPlane;
import com.company.models.Plane;
import com.company.views.GameDrawer;
import com.company.views.ImageDrawer;

import java.awt.*;

/**
 * Created by 1918 on 29-Apr-16.
 */
public class PlaneController extends SingleControllerWithHP implements Colliable {

    public final int SPEED = 5;
    public final int MAX_BULLET_COUNT = 3;

    private BulletControllerManager bulletControllerManager;

    private PlaneController(Plane gameObject, GameDrawer gameDrawer) {
        super(gameObject, gameDrawer);
        bulletControllerManager = new BulletControllerManager();
        CollisionPool.getInst().add(this);
    }

    public int getX() {
        return gameObject.getX();
    }

    public int getY() {
        return gameObject.getY();
    }

    public void move(PlaneDirection planeDirection) {
        switch (planeDirection) {
            case NONE:
                break;
            case UP:
                this.gameVector.dy = -SPEED;
                break;
            case DOWN:
                this.gameVector.dy = SPEED;
                break;
            case LEFT:
                this.gameVector.dx = -SPEED;
                break;
            case RIGHT:
                this.gameVector.dx = SPEED;
                break;
            case STOP_X:
                this.gameVector.dx = 0;
                break;
            case STOP_Y:
                this.gameVector.dy = 0;
                break;
        }
    }

    public void shoot() {
        if(bulletControllerManager.size() < MAX_BULLET_COUNT) {
            Bullet bullet = new Bullet(
                    gameObject.getX() - Bullet.DEFAULT_WIDTH / 2 + gameObject.getWidth() / 2,
                    gameObject.getY(),
                    Bullet.DEFAULT_WIDTH,
                    Bullet.DEFAULT_HEIGHT
            );
            ImageDrawer imageDrawer = new ImageDrawer("resources/bullet.png");
            BulletController bulletController = new BulletController(
                    bullet,
                    imageDrawer
            );
            this.bulletControllerManager.add(bulletController);
        }
    }

    private static PlaneController planeController1;
    public static PlaneController getPlaneController1() {
        if(planeController1 == null) {
            Plane plane = new Plane(100, 500, 70, 60);
            ImageDrawer planeDrawer = new ImageDrawer("resources/plane4.png");
            planeController1 = new PlaneController(plane, planeDrawer);
        }
        return planeController1;
    }

    @Override
    public void run() {
        super.run();
        bulletControllerManager.run();
    }

    @Override
    public void paint(Graphics g) {
        if(gameObject.isAlive == true) {
            super.paint(g);
            bulletControllerManager.paint(g);
        }
    }

    private static PlaneController planeController2;
    public static PlaneController getPlaneController2() {
        if(planeController2 == null) {
            Plane plane = new Plane(300, 500, 70, 60);
            ImageDrawer planeDrawer = new ImageDrawer("resources/plane2.png");
            planeController2 = new PlaneController(plane, planeDrawer);
        }
        return planeController2;
    }

    @Override
    public void onCollide(Colliable c) {
        if(c instanceof EnemyPlaneController) {
            EnemyPlane enemyPlane = (EnemyPlane) c.getGameObject();
            enemyPlane.setAlive(false);
        }
    }
    /* TODO: Work on the second plane */

}
