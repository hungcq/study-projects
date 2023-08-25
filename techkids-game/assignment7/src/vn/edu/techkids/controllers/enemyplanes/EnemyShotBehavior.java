package vn.edu.techkids.controllers.enemyplanes;

import vn.edu.techkids.controllers.enemybullets.EnemyBulletController;

/**
 * Created by qhuydtvt on 5/9/2016.
 */
public interface EnemyShotBehavior {
    EnemyBulletController doShot(int x, int y);
}