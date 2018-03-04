package com.company.controllers.gifts;

import com.company.controllers.*;
import com.company.controllers.enemybullets.EnemyBulletController;
import com.company.controllers.enemybullets.EnemyBulletType;
import com.company.controllers.enemyplanes.EnemyPlaneControllerManager;
import com.company.models.*;
import com.company.views.GameDrawer;
import com.company.views.ImageDrawer;

import java.util.Iterator;
import java.util.Vector;

/**
 * Created by 1918 on 12-May-16.
 */
public class GiftController extends SingleController implements Colliable{

    private final int SPEED = 3;
    private int giftType = 0;

    public GiftController(GameObject gameObject, GameDrawer gameDrawer) {
        super(gameObject, gameDrawer);
        gameVector.dy = SPEED;
        CollisionPool.getInst().add(this);
    }

    public void run() {
        super.run();
        if(!GameConfig.getInst().isInScreen(this.gameObject.getRect())) {
            this.gameObject.setAlive(false);
        }
    }

    public static GiftController create(GiftType giftType, int x, int y) {
        Gift gift = new Gift(x, y, Gift.WIDTH,Gift.HEIGHT);
        GiftController giftController = null;

        switch(giftType) {
            case BULLET:
                ImageDrawer bulletGiftDrawer = new ImageDrawer("resources/bonus_bullet.png");
                giftController = new GiftController(gift, bulletGiftDrawer);
                giftController.giftType = 0;
                break;
            case BOOM:
                ImageDrawer boomGiftDrawer = new ImageDrawer("resources/boom.png");
                giftController = new GiftController(gift, boomGiftDrawer);
                giftController.giftType = 1;
                break;
        }
        return giftController;
    }


    @Override
    public void onCollide(Colliable c) {
        if(c instanceof PlaneController) {
            PlaneController planeController = (PlaneController) c;
            if(giftType == 0) {
                BulletController.increase(2);
            } else if(giftType == 1) {
                EnemyPlaneControllerManager enemyPlaneControllerManager = EnemyPlaneControllerManager.getInst();
                Vector<SingleController> enemyPlaneControllerVector = enemyPlaneControllerManager.getSingleControllerVector();
                Iterator<SingleController> iterator = enemyPlaneControllerVector.iterator();
                while(iterator.hasNext()) {
                    iterator.next();
                    iterator.remove();
                }
            }
        }
    }
}
