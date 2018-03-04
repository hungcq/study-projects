package vn.edu.techkids.views;

import vn.edu.techkids.models.GameObject;

import java.awt.*;

/**
 * Created by qhuydtvt on 4/29/2016.
 */
public abstract class GameDrawer {

    public abstract void paint(GameObject gameObject, Graphics g);

//    public static GameDrawer create(GameDrawerType gameDrawerType) {
//        GameDrawer gameDrawer;
//
//        return  gameDrawer;
//    }
}
