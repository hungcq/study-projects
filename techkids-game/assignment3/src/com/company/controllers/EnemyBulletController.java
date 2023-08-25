package com.company.controllers;

import com.company.models.GameObject;
import com.company.views.GameDrawer;

/**
 * Created by 1918 on 03-May-16.
 */
public class EnemyBulletController extends BulletController {
    public EnemyBulletController(GameObject gameObject, GameDrawer gameDrawer) {
        super(gameObject, gameDrawer);
        gameVector.dy = SPEED;
    }
}
