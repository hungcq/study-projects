package vn.edu.techkids.views;

import vn.edu.techkids.models.GameObject;
import vn.edu.techkids.models.GameObjectWithHP;
import vn.edu.techkids.models.LifeState;

import java.awt.*;

/**
 * Created by qhuydtvt on 5/14/2016.
 */
public class EnemyPlaneDrawer extends GameDrawer {

    private GameDrawer aliveGameDrawer;
    private GameDrawer dyingGameDrawer;

    public EnemyPlaneDrawer(GameDrawer aliveGameDrawer, GameDrawer dyingGameDrawer) {
        this.aliveGameDrawer = aliveGameDrawer;
        this.dyingGameDrawer = dyingGameDrawer;
    }

    @Override
    public void paint(GameObject gameObject, Graphics g) {
        GameObjectWithHP gameObjectWithHP = (GameObjectWithHP)gameObject;
        switch ((gameObjectWithHP.getLifeState())) {
            case ALIVE:
                aliveGameDrawer.paint(gameObject, g);
                break;
            case DYING:
                if(dyingGameDrawer == null) {
                    gameObjectWithHP.setLifeState(LifeState.DEAD);
                } else {
                    dyingGameDrawer.paint(gameObject, g);
                }
                break;
        }
    }
}
