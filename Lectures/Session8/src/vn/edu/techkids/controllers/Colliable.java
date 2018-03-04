package vn.edu.techkids.controllers;

import vn.edu.techkids.models.GameObject;

import java.util.Collection;

/**
 * Created by qhuydtvt on 5/6/2016.
 */
public interface Colliable {
    void onCollide(Colliable c);
    GameObject getGameObject();
}
