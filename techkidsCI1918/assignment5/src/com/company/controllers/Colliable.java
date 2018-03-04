package com.company.controllers;

import com.company.models.GameObject;

/**
 * Created by 1918 on 07-May-16.
 */
public interface Colliable {
    void onCollide (Colliable c);
    GameObject getGameObject();
}
