package com.company.controllers.enemyplanes;

import com.company.controllers.*;
import com.company.controllers.enemybullets.EnemyBulletController;
import com.company.controllers.enemybullets.EnemyBulletControllerManager;
import com.company.models.*;
import com.company.views.GameDrawer;
import com.company.views.ImageDrawer;

import java.awt.*;

/**
 * Created by 1918 on 03-May-16.
 */
public class EnemyPlaneController extends SingleControllerWithHP implements Colliable {

    private EnemyShootBehaviour enemyShootBehaviour;
    private EnemyBulletControllerManager enemyBulletControllerManager;
    private int count = 0;
    public EnemyPlaneController(GameObject gameObject, GameDrawer gameDrawer) {
        super(gameObject, gameDrawer);
        this.gameVector.dy = 2;
        enemyBulletControllerManager = new EnemyBulletControllerManager();
        CollisionPool.getInst().add(this);
    }

    public EnemyPlaneController(GameObject gameObject, GameDrawer gameDrawer, GameVector gameVector) {
        super(gameObject, gameDrawer);
        this.gameVector = gameVector;
        enemyBulletControllerManager = new EnemyBulletControllerManager();
        CollisionPool.getInst().add(this);
    }

    public EnemyPlaneController(GameObject gameObject, GameDrawer gameDrawer, GameVector gameVector, EnemyShootBehaviour enemyShootBehaviour) {
        super(gameObject, gameDrawer);
        this.gameVector = gameVector;
        enemyBulletControllerManager = new EnemyBulletControllerManager();
        this.enemyShootBehaviour = enemyShootBehaviour;
        CollisionPool.getInst().add(this);
    }

    public void run() {
        super.run();
        this.enemyBulletControllerManager.run();

        count++;
        if(GameConfig.getInst().durationInSecond(count) >= 2) {
            count = 0;
            shoot();
        }

        if(!GameConfig.getInst().isInScreen(this.gameObject.getRect())) {
            this.gameObject.setAlive(false);
        }
    }

    private void shoot() {
//        EnemyBullet enemyBullet = new EnemyBullet(
//                gameObject.getX() + gameObject.getWidth() / 2 - EnemyBullet.WIDTH/2,
//                gameObject.getY() + gameObject.getHeight(),
//                EnemyBullet.WIDTH,
//                EnemyBullet.HEIGHT
//        );
//        ImageDrawer imageDrawer = new ImageDrawer("resources/enemy_bullet.png");
//        EnemyBulletController enemyBulletController = new EnemyBulletController(
//                enemyBullet,
//                imageDrawer
//        );
        if(enemyShootBehaviour != null) {
            EnemyBulletController enemyBulletController = enemyShootBehaviour.doShoot(
                    gameObject.getX() + gameObject.getWidth() / 2 - EnemyBullet.WIDTH/2,
                    gameObject.getY() + gameObject.getHeight());
            this.enemyBulletControllerManager.add(enemyBulletController);
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
            plane.decreaseHP(2);
        }
    }

    public static EnemyPlaneController create(EnemyPlaneType enemyPlaneType, int x, int y) {
        EnemyPlane enemyPlane = new EnemyPlane(x, y, 32,32);
        EnemyPlaneController enemyPlaneController = null;
        GameVector gameVector = null;
        EnemyShootBehaviour enemyShootBehaviour = null;

        switch(enemyPlaneType) {
            case BLACK:
                ImageDrawer blackPlaneDrawer = new ImageDrawer("resources/plane1.png");
                gameVector = new GameVector(0, 2);
                enemyPlaneController = new EnemyPlaneController(enemyPlane, blackPlaneDrawer, gameVector, new EnemyDirectShootBehaviour());
                break;
            case WHITE:
                ImageDrawer whitePlaneDrawer = new ImageDrawer("resources/enemy_plane_white_1.png");
                gameVector = new GameVector(2, 2);
                enemyPlaneController = new EnemyPlaneController(enemyPlane, whitePlaneDrawer, gameVector, new EnemyBiasShootBehaviour());
                break;
        }
        return enemyPlaneController;
    }

}