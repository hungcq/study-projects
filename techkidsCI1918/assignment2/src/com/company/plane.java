package com.company;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.io.File;
import java.io.IOException;

/**
 * Created by 1918 on 25-Apr-16.
 */
public class plane {
    public int x;
    public int y;
    public int dx;
    public int dy;
    Bullet bullet;
    private Image image;
    public final int HEIGHT = 60;
    public final int WIDTH = 70;
//    public void setImage(Image image) {
//        if(image!=null && this.image==null) {
//            this.image = image;
//        }
//    }
    public plane(int x, int y,Image image) {
        this.image = image;
        this.x = x;
        this.y = y;
    }
    public void paint(Graphics g) {
        g.drawImage(image,x,y,WIDTH,HEIGHT,null);
        if(bullet != null) {
            bullet.paint(g);
        }
    }
    public void run() {
        x += dx;
        y += dy;
        if(bullet != null) {
            bullet.run();
        }
    }
    public void shoot() {
        try {
            this.bullet = new Bullet(this.x + WIDTH/2 - 6,this.y + HEIGHT/2 - 16,ImageIO.read(new File("resources/bullet.png")));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    public void move(Movement m) {
        if(m.dx > 0) dx = 5;
        else if(m.dx < 0) dx = -5;
        else dx = 0;
        if(m.dy < 0) dy = 5;
        else if(m.dy > 0) dy = -5;
        else dy = 0;
    }
}
