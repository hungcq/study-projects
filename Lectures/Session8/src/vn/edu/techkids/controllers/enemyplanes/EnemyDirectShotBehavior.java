package vn.edu.techkids.controllers.enemyplanes;

import vn.edu.techkids.controllers.enemybullets.EnemyBulletController;
import vn.edu.techkids.models.EnemyBullet;
import vn.edu.techkids.models.GameVector;
import vn.edu.techkids.views.ImageDrawer;

/**
 * Created by qhuydtvt on 5/9/2016.
 */
public class EnemyDirectShotBehavior implements EnemyShotBehavior {

    @Override
    public EnemyBulletController doShot(int x, int y) {
        EnemyBullet enemyBullet =
                new EnemyBullet(x, y,
                        EnemyBullet.WIDTH, EnemyBullet.HEIGHT, 1);
        ImageDrawer imageDrawer = new ImageDrawer("resources/enemy_bullet.png");

        EnemyBulletController enemyBulletController = new EnemyBulletController(
                enemyBullet,
                imageDrawer,
                new GameVector(0, 3)
        );
        return enemyBulletController;
    }
}
