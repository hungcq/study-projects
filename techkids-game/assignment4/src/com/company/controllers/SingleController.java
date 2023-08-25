package com.company.controllers;

import com.company.models.GameObject;
import com.company.models.GameVector;
import com.company.views.GameDrawer;

import java.awt.*;

/**
 * Created by 1918 on 29-Apr-16.
 */
public class SingleController implements Controller{

    protected GameObject gameObject;
    protected GameDrawer gameDrawer;

    protected GameVector gameVector;

    public SingleController(GameObject gameObject, GameDrawer gameDrawer) {
        this.gameObject = gameObject;
        this.gameDrawer = gameDrawer;
        this.gameVector = new GameVector();
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
