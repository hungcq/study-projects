package com.company.controllers;

import com.company.models.EnemyBullet;
import com.company.models.GameConfig;
import com.company.models.GameObject;
import com.company.views.ImageDrawer;
import com.company.models.Plane;
import com.company.views.GameDrawer;

import java.awt.*;

/**
 * Created by 1918 on 03-May-16.
 */
public class EnemyPlaneController extends SingleControllerWithHP implements Colliable{

    private EnemyBulletControllerManager enemyBulletControllerManager;
    private int count = 0;
    public EnemyPlaneController(GameObject gameObject, GameDrawer gameDrawer) {
        super(gameObject, gameDrawer);
        this.gameVector.dy = 2;
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
            EnemyBulletController enemyBulletController = new EnemyBulletController(
                    enemyBullet,
                    imageDrawer
            );
            this.enemyBulletControllerManager.add(enemyBulletController);

        }
        if(!GameConfig.getInst().isInScreen(this.gameObject)) {
            this.gameObject.setAlive(false);
        }
    }

    public void paint(Graphics g) {
        super.paint(g);
        this.enemyBulletControllerManager.paint(g);
    }

    @Override
    public void onCollide(Colliable c) {
        if(c instanceof PlaneController) {
            Plane plane = (Plane) c.getGameObject();
            plane.decreaseHP(2);
        }
    }
//    public final int SPEED = 5;
//
//    protected Vector<BulletController> bulletControllerVector;
//
//    public EnemyPlaneController(EnemyPlane gameObject, GameDrawer gameDrawer) {
//        super(gameObject, gameDrawer);
//        bulletControllerVector = new Vector<BulletController>();
//    }
//
//    public int getX() {
//        return gameObject.getX();
//    }
//
//    public int getY() {
//        return gameObject.getY();
//    }
//
//    public Rectangle setBound() {
//        gameObject.rObject = new Rectangle(gameObject.getX(),gameObject.getY(),gameObject.getWidth(),gameObject.getHeight());
//        return gameObject.rObject;
//    }
//
//    public int checkCollision(Rectangle r1,Rectangle r2) {
//        if(r1.intersects(r2)) {
//            return 1;
//        }
//        else return 0;
//    }
//    public void move() {
//        this.gameVector.dy = SPEED;
//    }
//
//    public void shoot() {
//        Bullet bullet = new Bullet(
//                gameObject.getX() - Bullet.DEFAULT_WIDTH / 4 + gameObject.getWidth() / 2,
//                gameObject.getY(),
//                Bullet.DEFAULT_WIDTH/2,
//                Bullet.DEFAULT_HEIGHT/2
//        );
//        ImageDrawer imageDrawer = new ImageDrawer("resources/bullet.png");
//        EnemyBulletController enemyBulletController = new EnemyBulletController(
//                bullet,
//                imageDrawer
//        );
//        this.bulletControllerVector.add(enemyBulletController);
//    }
//
//    public static EnemyPlaneController enemyPlaneController1;
//    public static EnemyPlaneController getEnemyPlaneController1(int x, int y) {
//        if(enemyPlaneController1 == null) {
//            EnemyPlane plane = new EnemyPlane(x, y, 40, 35);
//            ImageDrawer planeDrawer = new ImageDrawer("resources/plane1.png");
//            enemyPlaneController1 = new EnemyPlaneController(plane, planeDrawer);
//        }
//        return enemyPlaneController1;
//    }
//
//    @Override
//    public void run() {
//        super.run();
//        for (BulletController bulletController : this.bulletControllerVector) {
//            bulletController.run();
//        }
//    }
//
//    @Override
//    public void paint(Graphics g) {
//        super.paint(g);
//        for (BulletController bulletController : this.bulletControllerVector) {
//            bulletController.paint(g);
//        }
//    }

}