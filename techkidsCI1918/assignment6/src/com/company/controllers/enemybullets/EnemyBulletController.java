package com.company.controllers.enemybullets;

import com.company.controllers.*;
import com.company.controllers.enemyplanes.EnemyBiasShootBehaviour;
import com.company.controllers.enemyplanes.EnemyDirectShootBehaviour;
import com.company.controllers.enemyplanes.EnemyPlaneController;
import com.company.controllers.enemyplanes.EnemyShootBehaviour;
import com.company.models.*;
import com.company.views.GameDrawer;
import com.company.views.ImageDrawer;

/**
 * Created by 1918 on 03-May-16.
 */
public class EnemyBulletController extends SingleController implements Colliable {

    public EnemyBulletController(GameObject gameObject, GameDrawer gameDrawer) {
        super(gameObject, gameDrawer);
        this.gameVector.dy = 5;
        CollisionPool.getInst().add(this);
    }

    public EnemyBulletController(GameObject gameObject, GameDrawer gameDrawer, GameVector gameVector) {
        super(gameObject, gameDrawer, gameVector);
        CollisionPool.getInst().add(this);
    }

    public void run() {
        super.run();
        if(!GameConfig.getInst().isInScreen(this.gameObject.getRect())) {
            this.gameObject.setAlive(false);
        }
    }

    public static EnemyBulletController create(EnemyBulletType enemyBulletType, int x, int y) {
        EnemyBullet enemyBullet = new EnemyBullet(x, y, EnemyBullet.WIDTH,EnemyBullet.HEIGHT);
        EnemyBulletController enemyBulletController = null;
        GameVector gameVector = null;

        switch(enemyBulletType) {
            case NORMAL:
                ImageDrawer normalBulletDrawer = new ImageDrawer("resources/enemy_bullet.png");
                gameVector = new GameVector(0, 3);
                enemyBulletController = new EnemyBulletController(enemyBullet, normalBulletDrawer, gameVector);
                break;
            case BIAS:
                ImageDrawer biasBulletDrawer = new ImageDrawer("resources/enemy_bullet.png");
                gameVector = new GameVector(-3, 3);
                enemyBulletController = new EnemyBulletController(enemyBullet, biasBulletDrawer, gameVector);
                break;
        }
        return enemyBulletController;
    }
    @Override
    public void onCollide(Colliable c) {
        if (c instanceof PlaneController) {
            Plane plane = (Plane) c.getGameObject();
            EnemyBullet enemyBullet = (EnemyBullet) gameObject;
            plane.decreaseHP(enemyBullet.getDamage());
            if (plane.getHP() <= 0) {
                plane.setAlive(false);
            }
        } else if(c instanceof BulletController) {
            c.getGameObject().setAlive(false );
        }
    }
}
