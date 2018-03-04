package vn.edu.techkids.controllers;

import vn.edu.techkids.models.GameObject;
import vn.edu.techkids.models.GameVector;
import vn.edu.techkids.views.GameDrawer;

import java.awt.*;

/**
 * Created by qhuydtvt on 4/29/2016.
 */
public class SingleController implements Controller {

    protected GameObject gameObject;
    protected GameDrawer gameDrawer;

    protected GameVector gameVector;

    public SingleController(GameObject gameObject, GameDrawer gameDrawer) {
        this.gameObject = gameObject;
        this.gameDrawer = gameDrawer;
        this.gameVector = new GameVector();
    }

    public SingleController(GameObject gameObject, GameDrawer gameDrawer, GameVector gameVector) {
        this.gameObject = gameObject;
        this.gameDrawer = gameDrawer;
        this.gameVector = gameVector;
    }

    public GameObject getGameObject() {
        return gameObject;
    }

    @Override
    public void run() {
        gameObject.move(gameVector);
    }

    @Override
    public void paint(Graphics g) {
        gameDrawer.paint(this.gameObject, g);
    }
}
