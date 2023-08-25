package com.company.models;

/**
 * Created by 1918 on 03-May-16.
 */
public class EnemyPlane extends GameObjectWithHP {

    private static final int HP_DEFAULT = 1;

    public EnemyPlane(int x, int y, int width, int height,int hp) {
        super(x, y, width, height, hp);
    }

    public EnemyPlane(int x,int y,int width,int height) {
        this(x,y,width,height,HP_DEFAULT);
    }
}
