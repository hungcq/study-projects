package com.company;

import com.company.controllers.*;
import com.company.models.EnemyPlane;
import com.company.models.GameConfig;
import com.company.models.Plane;
import com.company.views.ImageDrawer;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.event.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

/**
 * Created by 1918 on 24-Apr-16.
 */
public class Gamewindow extends Frame implements Runnable{
    Image backgroundImage;
    Image backbufferImage;
    Thread thread;
    PlaneController planeController1;
    PlaneController planeController2;
    EnemyPlaneController2 enemyPlaneController2;
    GameConfig gameConfig;

    public Gamewindow() throws IOException {

        this.setVisible(true);

        this.gameConfig = GameConfig.getInst();
        this.setSize(gameConfig.getScreenWidth(),
                gameConfig.getScreenHeight()
        );

        this.planeController1 = PlaneController.getPlaneController1();
        this.planeController2 = PlaneController.getPlaneController2();
        EnemyPlane enemyPlane = new EnemyPlane(10,10,30,30);
        ImageDrawer imageDrawer = new ImageDrawer("resources/enemy_plane_white_1.png");
        this.enemyPlaneController2 = new EnemyPlaneController2(enemyPlane,imageDrawer);

        try {
            backgroundImage = ImageIO.read(new File("resources/background.png"));
        } catch (IOException e) {
            e.printStackTrace();
        }

        this.addWindowListener(new WindowListener() {
            @Override
            public void windowOpened(WindowEvent windowEvent) {
                System.out.println("WindowOpened");
            }

            @Override
            public void windowClosing(WindowEvent windowEvent) {
                System.exit(0);
            }

            @Override
            public void windowClosed(WindowEvent windowEvent) {

            }

            @Override
            public void windowIconified(WindowEvent windowEvent) {
                System.out.println("WindowOpened");
            }

            @Override
            public void windowDeiconified(WindowEvent windowEvent) {
                System.out.println("WindowOpened");
            }

            @Override
            public void windowActivated(WindowEvent windowEvent) {
                System.out.println("WindowOpened");
            }

            @Override
            public void windowDeactivated(WindowEvent windowEvent) {
                System.out.println("WindowOpened");
            }
        });
        this.addKeyListener(new KeyListener() {
            PlaneDirection planeDirection = PlaneDirection.NONE;
            @Override
            public void keyTyped(KeyEvent keyEvent) {

            }

            @Override
            public void keyPressed(KeyEvent a) {

                switch (a.getKeyCode()) {
                    case KeyEvent.VK_UP: {
                        planeDirection = PlaneDirection.UP;
                        break;
                    }
                    case KeyEvent.VK_DOWN: {
                        planeDirection = PlaneDirection.DOWN;
                        break;
                    }
                    case KeyEvent.VK_RIGHT: {
                        planeDirection = PlaneDirection.RIGHT;
                        break;
                    }
                    case KeyEvent.VK_LEFT: {
                        planeDirection = PlaneDirection.LEFT;
                        break;
                    }
                    case KeyEvent.VK_SPACE:
                        planeController1.shoot();
                        break;
                }

                planeController1.move(planeDirection);

            }

            @Override
            public void keyReleased(KeyEvent a) {

                switch (a.getKeyCode()) {
                    case KeyEvent.VK_UP:
                    case KeyEvent.VK_DOWN:
                        planeDirection = PlaneDirection.STOP_Y;
                        break;
                    case KeyEvent.VK_RIGHT:
                    case KeyEvent.VK_LEFT:
                        planeDirection = PlaneDirection.STOP_X;
                        break;
                }
                planeController1.move(planeDirection);
            }
        });
        this.addMouseListener(new MouseListener() {
            @Override
            public void mouseClicked(MouseEvent mouseEvent) {

            }

            @Override
            public void mousePressed(MouseEvent mouseEvent) {
                planeController2.shoot();
            }

            @Override
            public void mouseReleased(MouseEvent mouseEvent) {

            }

            @Override
            public void mouseEntered(MouseEvent mouseEvent) {

            }

            @Override
            public void mouseExited(MouseEvent mouseEvent) {

            }
        });
        thread = new Thread(this);
        thread.start();
    }
    @Override
    public void update(Graphics graphics) {
        if (backbufferImage == null) {
            backbufferImage = new BufferedImage(gameConfig.getScreenWidth(),
                    gameConfig.getScreenHeight(), 1);
        }
        Graphics backbufferedGraphics = backbufferImage.getGraphics();
        backbufferedGraphics.drawImage(backgroundImage,0,0,gameConfig.getScreenWidth(),
                gameConfig.getScreenHeight(),null);
        planeController1.paint(backbufferedGraphics);
        planeController2.paint(backbufferedGraphics);
        enemyPlaneController2.paint(backbufferedGraphics);
        EnemyPlaneControllerManager.getInst().paint(backbufferedGraphics);
        graphics.drawImage(backbufferImage,0,0,null);
    }

    @Override
    public void run() {
        while(true) {
            try {
                CollisionPool.getInst().run();
                planeController1.run();
                EnemyPlaneControllerManager.getInst().run();
                enemyPlaneController2.run();

                Point mousePoint = MouseInfo.getPointerInfo().getLocation();
                mousePoint.x -= getLocationOnScreen().x;
                mousePoint.y -= getLocationOnScreen().y;
                PlaneDirection planeDirection = PlaneDirection.NONE;
                if(mousePoint.x - 5 > planeController2.getX()) {
                    planeDirection = PlaneDirection.RIGHT;
                } else if(mousePoint.x + 5 < planeController2.getX()) {
                    planeDirection = PlaneDirection.LEFT;
                } else {
                    planeDirection = PlaneDirection.STOP_X;
                }
                planeController2.move(planeDirection);
                if(mousePoint.y - 5 > planeController2.getY()) {
                    planeDirection = PlaneDirection.DOWN;
                } else if(mousePoint.y + 5 < planeController2.getY()) {
                    planeDirection = PlaneDirection.UP;
                } else {
                    planeDirection = PlaneDirection.STOP_Y;
                }
                planeController2.move(planeDirection);
                planeController2.run();

                repaint();

                thread.sleep(gameConfig.getThreadDelay());
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
