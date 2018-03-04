package com.company.models;

/**
 * Created by 1918 on 29-Apr-16.
 */
public class Plane extends GameObjectWithHP {
    private static final int HP_DEFAULT = 5;

    public Plane(int x, int y, int width, int height, int HP) {
        super(x, y, width, height, HP);
    }

    public Plane(int x, int y, int width, int height) {
        this(x, y, width, height, HP_DEFAULT);
    }
}
