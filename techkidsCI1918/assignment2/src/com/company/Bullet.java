package com.company;

import java.awt.*;

/**
 * Created by 1918 on 25-Apr-16.
 */
public class Bullet {
    private int x;
    private int y;
    private Image image;
    public final int HEIGHT = 12;
    public final int WIDTH = 33;

    public Bullet(int x, int y, Image image) {
        this.x = x;
        this.y = y;
        this.image = image;
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    public Image getImage() {
        return image;
    }

    public void setX(int x) {
        this.x = x;
    }

    public void setY(int y) {
        this.y = y;
    }

    public void setImage(Image image) {
        this.image = image;
    }
    public void run() {
        y -= 5;
    }
    public void paint(Graphics g) {
        g.drawImage(this.image,x,y,null);
    }

}
