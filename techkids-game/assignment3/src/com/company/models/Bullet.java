package com.company.models;

import java.awt.*;

/**
 * Created by 1918 on 29-Apr-16.
 */
public class Bullet extends GameObject {

    public static final int DEFAULT_WIDTH = 13;
    public static final int DEFAULT_HEIGHT = 33;
    public Bullet(int x, int y, int width, int height) {
        super(x, y, width, height);
    }
}
