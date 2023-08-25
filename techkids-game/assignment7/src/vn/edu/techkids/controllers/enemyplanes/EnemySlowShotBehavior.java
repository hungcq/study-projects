package vn.edu.techkids.controllers.enemyplanes;

import vn.edu.techkids.controllers.enemybullets.EnemyBulletController;
import vn.edu.techkids.controllers.enemybullets.EnemyBulletType;

/**
 * Created by 1918 on 14-May-16.
 */
public class EnemySlowShotBehavior implements EnemyShotBehavior {

    @Override
    public EnemyBulletController doShot(int x, int y) {
        EnemyBulletController enemyBulletController = EnemyBulletController.create(EnemyBulletType.SLOW,x,y);
        return enemyBulletController;
    }
}
