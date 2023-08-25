package com.company.controllers;

import com.company.models.Bullet;
import com.company.models.EnemyPlane;
import com.company.models.GameVector;
import com.company.models.Plane;
import com.company.views.GameDrawer;
import com.company.views.ImageDrawer;

import java.awt.*;
import java.util.Vector;

/**
 * Created by 1918 on 03-May-16.
 */
public class EnemyPlaneController extends SingleController {
    public final int SPEED = 5;

    protected Vector<BulletController> bulletControllerVector;

    public EnemyPlaneController(EnemyPlane gameObject, GameDrawer gameDrawer) {
        super(gameObject, gameDrawer);
        bulletControllerVector = new Vector<BulletController>();
    }

    public int getX() {
        return gameObject.getX();
    }

    public int getY() {
        return gameObject.getY();
    }

    public Rectangle setBound() {
        gameObject.rObject = new Rectangle(gameObject.getX(),gameObject.getY(),gameObject.getWidth(),gameObject.getHeight());
        return gameObject.rObject;
    }

    public int checkCollision(Rectangle r1,Rectangle r2) {
        if(r1.intersects(r2)) {
            return 1;
        }
        else return 0;
    }
    public void move() {
        this.gameVector.dy = SPEED;
    }

    public void shoot() {
        Bullet bullet = new Bullet(
                gameObject.getX() - Bullet.DEFAULT_WIDTH / 4 + gameObject.getWidth() / 2,
                gameObject.getY(),
                Bullet.DEFAULT_WIDTH/2,
                Bullet.DEFAULT_HEIGHT/2
        );
        ImageDrawer imageDrawer = new ImageDrawer("resources/bullet.png");
        EnemyBulletController enemyBulletController = new EnemyBulletController(
                bullet,
                imageDrawer
        );
        this.bulletControllerVector.add(enemyBulletController);
    }

    public static EnemyPlaneController enemyPlaneController1;
    public static EnemyPlaneController getEnemyPlaneController1(int x, int y) {
        if(enemyPlaneController1 == null) {
            EnemyPlane plane = new EnemyPlane(x, y, 40, 35);
            ImageDrawer planeDrawer = new ImageDrawer("resources/plane1.png");
            enemyPlaneController1 = new EnemyPlaneController(plane, planeDrawer);
        }
        return enemyPlaneController1;
    }

    @Override
    public void run() {
        super.run();
        for (BulletController bulletController : this.bulletControllerVector) {
            bulletController.run();
        }
    }

    @Override
    public void paint(Graphics g) {
        super.paint(g);
        for (BulletController bulletController : this.bulletControllerVector) {
            bulletController.paint(g);
        }
    }
}