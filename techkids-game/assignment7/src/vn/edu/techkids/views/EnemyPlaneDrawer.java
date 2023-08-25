package vn.edu.techkids.views;

import vn.edu.techkids.models.GameObject;
import vn.edu.techkids.models.GameObjectWithHP;
import vn.edu.techkids.models.LifeState;

import java.awt.*;
import java.util.Vector;

/**
 * Created by 1918 on 14-May-16.
 */
public class EnemyPlaneDrawer extends GameDrawer {

    GameDrawer aliveGameDrawer;
    GameDrawer dyingGameDrawer;

    public EnemyPlaneDrawer(GameDrawer aliveGameDrawer, GameDrawer dyingGameDrawer) {
        this.aliveGameDrawer = aliveGameDrawer;
        this.dyingGameDrawer = dyingGameDrawer;
    }

    @Override
    public void paint(GameObject gameObject, Graphics g) {
        GameObjectWithHP gameObjectWithHP = (GameObjectWithHP) gameObject;
        switch (gameObjectWithHP.getLifeState()) {
            case AlIVE:
                aliveGameDrawer.paint(gameObject,g);
                break;
            case DYING:
                if(dyingGameDrawer == null) {
                    gameObjectWithHP.setLifeState(LifeState.DEAD);
                }
                dyingGameDrawer.paint(gameObject,g);
                break;
        }

    }
}
