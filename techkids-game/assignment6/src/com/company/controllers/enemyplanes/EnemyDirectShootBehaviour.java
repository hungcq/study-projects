package com.company.controllers.enemyplanes;

import com.company.controllers.enemybullets.EnemyBulletController;
import com.company.controllers.enemybullets.EnemyBulletType;
import com.company.models.EnemyBullet;
import com.company.models.GameVector;
import com.company.views.ImageDrawer;

/**
 * Created by 1918 on 09-May-16.
 */
public class EnemyDirectShootBehaviour implements EnemyShootBehaviour {
    @Override
    public EnemyBulletController doShoot(int x, int y) {
        EnemyBulletController enemyBulletController = EnemyBulletController.create(EnemyBulletType.NORMAL,x,y);
        return enemyBulletController;
    }
}
