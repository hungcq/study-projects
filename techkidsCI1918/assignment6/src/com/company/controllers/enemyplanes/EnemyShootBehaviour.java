package com.company.controllers.enemyplanes;

import com.company.controllers.enemybullets.EnemyBulletController;

/**
 * Created by 1918 on 09-May-16.
 */
public interface EnemyShootBehaviour {
    EnemyBulletController doShoot(int x, int y);
}
