package vn.edu.techkids.controllers.enemyplanes;

import vn.edu.techkids.controllers.enemybullets.EnemyBulletController;
import vn.edu.techkids.controllers.enemybullets.EnemyBulletType;
import vn.edu.techkids.models.EnemyBullet;
import vn.edu.techkids.models.GameVector;
import vn.edu.techkids.views.ImageDrawer;

/**
 * Created by 1918 on 14-May-16.
 */
public class EnemyBiasShotBehavior implements EnemyShotBehavior {

    @Override
    public EnemyBulletController doShot(int x, int y) {
        EnemyBulletController enemyBulletController = EnemyBulletController.create(EnemyBulletType.BIAS,x,y);
        return enemyBulletController;
    }
}
