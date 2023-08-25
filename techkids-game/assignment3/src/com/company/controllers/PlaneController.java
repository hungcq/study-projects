package com.company.controllers;

import com.company.models.Bullet;
import com.company.models.Plane;
import com.company.views.GameDrawer;
import com.company.views.ImageDrawer;

import java.awt.*;
import java.util.Vector;

/**
 * Created by 1918 on 29-Apr-16.
 */
public class PlaneController extends SingleController {

    public final int SPEED = 10;

    protected Vector<BulletController> bulletControllerVector;

    public PlaneController(Plane gameObject, GameDrawer gameDrawer) {
        super(gameObject, gameDrawer);
        bulletControllerVector = new Vector<BulletController>();
    }

    public int getX() {
        return gameObject.getX();
    }

    public int getY() {
        return gameObject.getY();
    }

    public void setdX(int dx) {
        gameVector.dx = dx;
    }

    public void setdY(int dy) {
        gameVector.dx = dy;
    }

    public Rectangle setBound() {
        gameObject.rObject = new Rectangle(gameObject.getX(),gameObject.getY(),gameObject.getWidth(),gameObject.getHeight());
        return gameObject.rObject;
    }
    public void move(PlaneDirection planeDirection) {
        switch (planeDirection) {
            case NONE:
                break;
            case UP:
                this.gameVector.dy = -SPEED;
                break;
            case DOWN:
                this.gameVector.dy = SPEED;
                break;
            case LEFT:
                this.gameVector.dx = -SPEED;
                break;
            case RIGHT:
                this.gameVector.dx = SPEED;
                break;
            case STOP_X:
                this.gameVector.dx = 0;
                break;
            case STOP_Y:
                this.gameVector.dy = 0;
                break;
        }
    }

    public void shoot() {
        Bullet bullet = new Bullet(
                gameObject.getX() - Bullet.DEFAULT_WIDTH/2 + gameObject.getWidth()/2,
                gameObject.getY(),
                Bullet.DEFAULT_WIDTH,
                Bullet.DEFAULT_HEIGHT
        );
        ImageDrawer imageDrawer = new ImageDrawer("resources/bullet.png");
        BulletController bulletController = new BulletController(
                bullet,
                imageDrawer
        );
        this.bulletControllerVector.add(bulletController);
    }

    private static PlaneController planeController1;
    public static PlaneController getPlaneController1() {
        if(planeController1 == null) {
            Plane plane = new Plane(100, 500, 70, 60);
            ImageDrawer planeDrawer = new ImageDrawer("resources/plane4.png");
            planeController1 = new PlaneController(plane, planeDrawer);
        }
        return planeController1;
    }

    @Override
    public void run() {
        super.run();
        for(BulletController bulletController : this.bulletControllerVector) {
            bulletController.run();
        }
    }

    @Override
    public void paint(Graphics g) {
        super.paint(g);
        for(BulletController bulletController : this.bulletControllerVector) {
            bulletController.paint(g);
        }
    }

    private static PlaneController planeController2;
    public static PlaneController getPlaneController2() {
        if(planeController2 == null) {
            Plane plane = new Plane(300, 500, 70, 60);
            ImageDrawer planeDrawer = new ImageDrawer("resources/plane2.png");
            planeController2 = new PlaneController(plane, planeDrawer);
        }
        return planeController2;
    }
    /* TODO: Work on the second plane */

}
