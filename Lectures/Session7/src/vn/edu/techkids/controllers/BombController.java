package vn.edu.techkids.controllers;

import vn.edu.techkids.controllers.enemyplanes.EnemyPlaneControllerManager;
import vn.edu.techkids.models.Bomb;
import vn.edu.techkids.views.GameDrawer;
import vn.edu.techkids.views.ImageDrawer;

/**
 * Created by qhuydtvt on 5/13/2016.
 */
public class BombController extends  SingleController implements Colliable {

    public BombController(Bomb gameObject, GameDrawer gameDrawer) {
        super(gameObject, gameDrawer);
        CollisionPool.getInst().add(this);
    }

    @Override
    public void onCollide(Colliable c) {
        if(c instanceof  PlaneController) {
            EnemyPlaneControllerManager.getInst().dieAll();
            this.gameObject.setAlive(false);
        }
    }

    public static BombController create() {
        Bomb bomb = new Bomb(400, 300, Bomb.WIDTH_DEFAULT,Bomb.HEIGHT_DEFAULT);
        ImageDrawer imageDrawer = new ImageDrawer("resources/bomb.png");
        return new BombController(bomb, imageDrawer);
    }
}
