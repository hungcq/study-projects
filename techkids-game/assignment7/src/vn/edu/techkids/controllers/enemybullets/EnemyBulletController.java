package vn.edu.techkids.controllers.enemybullets;


import vn.edu.techkids.controllers.*;
import vn.edu.techkids.models.*;
import vn.edu.techkids.views.GameDrawer;
import vn.edu.techkids.views.ImageDrawer;

/**
 * Created by qhuydtvt on 5/6/2016.
 */
public class EnemyBulletController extends SingleController implements Colliable {

    private EnemyBulletType type;
    public EnemyBulletController(EnemyBullet gameObject, GameDrawer gameDrawer) {
        super(gameObject, gameDrawer);
        this.gameVector.dy = 5;
        CollisionPool.getInst().add(this);
    }

    public EnemyBulletController(EnemyBullet gameObject,
                                 GameDrawer gameDrawer,
                                 GameVector gameVector) {
        super(gameObject, gameDrawer, gameVector);
        System.out.println(gameObject.getClass().toString());
        CollisionPool.getInst().add(this);
    }

    @Override
    public void run() {
        super.run();
        if (!GameConfig.getInst().isInScreen(this.gameObject)) {
            this.gameObject.setAlive(false);
        }
    }

    public static EnemyBulletController create(EnemyBulletType enemyBulletType, int x, int y) {
        EnemyBullet enemyBullet;
        EnemyBulletController enemyBulletController = null;
        GameVector gameVector = null;

        switch(enemyBulletType) {
            case NORMAL:
                ImageDrawer normalBulletDrawer = new ImageDrawer("resources/enemy_bullet.png");
                gameVector = new GameVector(0, 3);
                enemyBullet = new EnemyBullet(x, y, EnemyBullet.WIDTH,EnemyBullet.HEIGHT);
                enemyBulletController = new EnemyBulletController(enemyBullet, normalBulletDrawer, gameVector);
                enemyBulletController.type = EnemyBulletType.NORMAL;
                break;
            case BIAS:
                enemyBullet = new EnemyBullet(x, y, EnemyBullet.WIDTH,EnemyBullet.HEIGHT,2);
                ImageDrawer biasBulletDrawer = new ImageDrawer("resources/enemy_bullet.png");
                gameVector = new GameVector(-3, 3);
                enemyBulletController = new EnemyBulletController(enemyBullet, biasBulletDrawer, gameVector);
                enemyBulletController.type = EnemyBulletType.BIAS;
                break;
            case SLOW:
                enemyBullet = new EnemyBullet(x, y, EnemyBullet.WIDTH,EnemyBullet.HEIGHT,2);
                ImageDrawer slowBulletDrawer = new ImageDrawer("resources/enemy_bullet.png");
                gameVector = new GameVector(0, 3);
                enemyBulletController = new EnemyBulletController(enemyBullet, slowBulletDrawer, gameVector);
                enemyBulletController.type = EnemyBulletType.SLOW;
                break;
        }
        return enemyBulletController;
    }

    @Override
    public void onCollide(Colliable c) {
        if (c instanceof PlaneController) {
            Plane plane = (Plane) c.getGameObject();
            EnemyBullet enemyBullet = (EnemyBullet)gameObject;
            plane.decreaseHP(enemyBullet.getDamage());
            if (plane.getHp() <= 0) {
                plane.setAlive(false);
            }
            if(this.type == EnemyBulletType.SLOW) {
                ((PlaneController)c).getSlowed();
            }
        }
        else if(c instanceof BulletController){
            c.getGameObject().setAlive(false);
        }
    }
}
