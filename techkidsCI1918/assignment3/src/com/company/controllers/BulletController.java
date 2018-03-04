package com.company.controllers;

import com.company.models.GameObject;
import com.company.views.GameDrawer;

/**
 * Created by 1918 on 29-Apr-16.
 */
public class BulletController extends SingleController {

    public static final int SPEED = 15;

    public BulletController(GameObject gameObject, GameDrawer gameDrawer) {
        super(gameObject, gameDrawer);
        gameVector.dy = -SPEED;
    }

}
