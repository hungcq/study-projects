package com.company;

import java.awt.*;

/**
 * Created by 1918 on 28-Apr-16.
 */
public class EnemyPlane {
    private int x;
    private int y;
    private int dx;
    private int dy;
    private Image image;

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    public int getDx() {
        return dx;
    }

    public int getDy() {
        return dy;
    }

    public void setX(int x) {
        this.x = x;
    }

    public void setY(int y) {
        this.y = y;
    }

    public void setDx(int dx) {
        this.dx = dx;
    }

    public void setDy(int dy) {
        this.dy = dy;
    }

    public Image getImage() {
        return image;
    }

    public void setImage(Image image) {
        this.image = image;
    }

    public EnemyPlane(int x, int y, int dx, int dy, Image image) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.image = image;
    }

    public void rundown() {
        x+=dx;
        y+=dy;
    }
    public void paint(Graphics g) {
        g.drawImage(image,x,y,40,40,null);
    }
}
