package com.company.models;

import java.awt.*;

/**
 * Created by 1918 on 29-Apr-16.
 */
public class GameObject {
    private int x;
    private int y;
    private int width;
    private int height;
    public boolean isAlive = true;

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public int getWidth() {
        return width;
    }

    public void setWidth(int width) {
        this.width = width;
    }

    public Rectangle getRect() {
        return new Rectangle(x,y,width,height);
    }

    public boolean isAlive() {
        return isAlive;
    }

    public void setAlive(boolean alive) {
        isAlive = alive;
    }

    public Rectangle getNextRect (GameVector gameVector) {
        return new Rectangle(x+gameVector.dx, y+gameVector.dy, width, height);
    }

    public GameObject(int x, int y, int width, int height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public void move(GameVector gameVector) {
        this.x += gameVector.dx;
        this.y += gameVector.dy;
    }

}
