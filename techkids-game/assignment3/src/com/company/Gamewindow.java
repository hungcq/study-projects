package com.company;

import com.company.controllers.EnemyPlaneController;
import com.company.controllers.PlaneController;
import com.company.controllers.PlaneDirection;

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
    EnemyPlaneController enemyPlaneController1;
    Rectangle r = new Rectangle(250,50,50,50);

    public Gamewindow() throws IOException {
        this.setVisible(true);
        this.setSize(400,600);

        this.planeController1 = PlaneController.getPlaneController1();
        this.planeController2 = PlaneController.getPlaneController2();
        this.enemyPlaneController1 = EnemyPlaneController.getEnemyPlaneController1(250,40);

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
                System.out.println("keyTyped");
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
            backbufferImage = new BufferedImage(400, 600, 1);
        }
        Graphics backbufferedGraphics = backbufferImage.getGraphics();
        backbufferedGraphics.drawImage(backgroundImage,0,0,null);
        planeController1.paint(backbufferedGraphics);
        planeController2.paint(backbufferedGraphics);
        if(enemyPlaneController1 != null) {
            enemyPlaneController1.paint(backbufferedGraphics);
        }
        graphics.drawImage(backbufferImage,0,0,null);
        if(enemyPlaneController1.checkCollision(enemyPlaneController1.setBound(),planeController1.setBound()) == 1) {
            System.out.println("collision");
            enemyPlaneController1 = null;
        }
        if(enemyPlaneController1.checkCollision(enemyPlaneController1.setBound(),planeController2.setBound()) == 1) {
            System.out.println("collision");
            enemyPlaneController1 = null;
        }
//        if(enemyPlaneController1.getY() > 600 ) enemyPlaneController1 = null;
    }

    @Override
    public void run() {
        int count = 0;
        while(true) {
            repaint();
            try {
                count++;
                if(enemyPlaneController1 != null) {
                    if (count % 20 == 0) enemyPlaneController1.shoot();
                    enemyPlaneController1.move();
                    enemyPlaneController1.run();
                }
                planeController1.run();
                repaint();
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
                thread.sleep(17);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
