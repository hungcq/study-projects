package vn.edu.techkids;

import java.awt.*;

/**
 * Created by qhuydtvt on 4/25/2016.
 */
public class Bullet {

    private int x;
    private int y;

    private Image image;

    public static final int WIDTH = 12;
    public static final int HEIGHT = 33;

    public Bullet(int x, int y, Image image) {
        this.x = x;
        this.y = y;
        this.image = image;
    }

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

    public void run() {
        y -= 5;
    }

    public void paint(Graphics g) {
        g.drawImage(this.image, x, y, WIDTH, HEIGHT, null);
    }
}
