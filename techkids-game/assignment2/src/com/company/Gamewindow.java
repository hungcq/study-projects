package com.company;

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
    plane plane1;
    plane plane2;
    Thread thread;
    Bullet bullet;
    EnemyPlane plane3;
    EnemyPlane plane4;
    EnemyPlane plane5;
    EnemyPlane plane6;
    EnemyPlane plane7;
    public Gamewindow() throws IOException {
        this.setVisible(true);
        this.setSize(400,600);

        try {
            backgroundImage = ImageIO.read(new File("resources/background.png"));
        } catch (IOException e) {
            e.printStackTrace();
        }

        try {
            plane1 = new plane(100,500,ImageIO.read(new File("resources/plane2.png")));
            plane2 = new plane(200,500,ImageIO.read(new File("resources/plane4.png")));
            plane3 = new EnemyPlane(30,40,0,5,ImageIO.read(new File("resources/plane1.png")));
            plane4 = new EnemyPlane(105,40,0,5,ImageIO.read(new File("resources/plane1.png")));
            plane5 = new EnemyPlane(180,40,0,5,ImageIO.read(new File("resources/plane1.png")));
            plane6 = new EnemyPlane(255,40,0,5,ImageIO.read(new File("resources/plane1.png")));
            plane7 = new EnemyPlane(330,40,0,5,ImageIO.read(new File("resources/plane1.png")));
//            bullet = new Bullet(300,500,ImageIO.read(new File("resources/bullet.png")));
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
            @Override
            public void keyTyped(KeyEvent keyEvent) {
                System.out.println("keyTyped");
            }

            @Override
            public void keyPressed(KeyEvent a) {
                switch (a.getKeyCode()) {
                    case KeyEvent.VK_UP: {
                        plane1.dy = -5;
                        break;
                    }
                    case KeyEvent.VK_DOWN: {
                        plane1.dy = 5;
                        break;
                    }
                    case KeyEvent.VK_RIGHT: {
                        plane1.dx = 5;
                        break;
                    }
                    case KeyEvent.VK_LEFT: {
                        plane1.dx = -5;
                        break;
                    }
                    case KeyEvent.VK_SPACE:
                        plane1.shoot();
                        break;
                }
                switch (a.getKeyCode()) {
                    case KeyEvent.VK_W: {
                        plane2.dy = -5;
                        break;
                    }
                    case KeyEvent.VK_S: {
                        plane2.dy = 5;
                        break;
                    }
                    case KeyEvent.VK_D: {
                        plane2.dx = 5;
                        break;
                    }
                    case KeyEvent.VK_A: {
                        plane2.dx = -5;
                        break;
                    }
                }
            }

            @Override
            public void keyReleased(KeyEvent a) {
                switch (a.getKeyCode()) {
                    case KeyEvent.VK_UP: {
                        plane1.dy = 0;
                        break;
                    }
                    case KeyEvent.VK_DOWN: {
                        plane1.dy = 0;
                        break;
                    }
                    case KeyEvent.VK_RIGHT: {
                        plane1.dx = 0;
                        break;
                    }
                    case KeyEvent.VK_LEFT: {
                        plane1.dx = 0;
                        break;
                    }
                }
                switch (a.getKeyCode()) {
                    case KeyEvent.VK_W: {
                        plane2.dy = 0;
                        break;
                    }
                    case KeyEvent.VK_S: {
                        plane2.dy = 0;
                        break;
                    }
                    case KeyEvent.VK_D: {
                        plane2.dx = 0;
                        break;
                    }
                    case KeyEvent.VK_A: {
                        plane2.dx = 0;
                        break;
                    }
                }
            }
        });
//        this.addMouseListener(new MouseListener() {
//            @Override
//            public void mouseClicked(MouseEvent m) {
//
//            }
//
//            @Override
//            public void mousePressed(MouseEvent m) {
//                if(check(m.getX(),m.getY())==true) {
//                    tmpx2 = m.getX();
//                    tmpy2 = m.getY();
//                }
//                else return;
//            }
//
//            @Override
//            public void mouseReleased(MouseEvent m) {
//                if(check(tmpx2,tmpy2)==true) {
//                    dx2 = m.getX() - tmpx2;
//                    dy2 = m.getY() - tmpy2;
//                }
//                else return;
//            }
//
//            @Override
//            public void mouseEntered(MouseEvent mouseEvent) {
//
//            }
//
//            @Override
//            public void mouseExited(MouseEvent mouseEvent) {
//
//            }
//        });
        thread = new Thread(this);
        thread.start();
        this.addMouseMotionListener(new MouseMotionListener() {
            @Override
            public void mouseDragged(MouseEvent m) {
            }

            @Override
            public void mouseMoved(MouseEvent m) {
//                dx2 = m.getX();
//                dy2 = m.getY();
//                if(m.getX() -5 > x2) {
//                    dx2 = 5;
//                }
//                else if(m.getX() +5 < x2)
//                    dx2 = -5;
            }
        });
    }
    @Override
    public void update(Graphics graphics) {
        if (backbufferImage == null) {
            backbufferImage = new BufferedImage(400, 600, 1);
        }
        Graphics backbufferedGraphics = backbufferImage.getGraphics();
        backbufferedGraphics.drawImage(backgroundImage,0,0,null);
        plane1.paint(backbufferedGraphics);
        plane2.paint(backbufferedGraphics);
        plane3.paint(backbufferedGraphics);
        plane4.paint(backbufferedGraphics);
        plane5.paint(backbufferedGraphics);
        plane6.paint(backbufferedGraphics);
        plane7.paint(backbufferedGraphics);

//        bullet.paint(backbufferedGraphics);
        graphics.drawImage(backbufferImage,0,0,null);
    }

    @Override
    public void run() {
        while(true) {
            repaint();
            try {
                plane1.run();
                plane2.run();
                plane3.rundown();
                plane4.rundown();
                plane5.rundown();
                plane6.rundown();
                plane7.rundown();
//                bullet.run();
                Point mousePoint = MouseInfo.getPointerInfo().getLocation();
//                if(mousePoint.y - 5 > y2) {
//                    dy2 = 5;
//                }
//                else if(mousePoint.y +5 < y2) {
//                    dy2 = -5;
//                }
//                else dy2 = 0;
//                if(mousePoint.x - 5 > x2) {
//                    dx2 = 5;
//                }
//                else if(mousePoint.x +5 < x2) {
//                    dx2 = -5;
//                }
//                else dx2 = 0;
                if(plane1.x > 400-70 || plane1.x < 0 || plane1.y > 600-56 || plane1.y < 0) {
                    if(plane1.x > 400-70) plane1.x = 400-70;
                    if(plane1.x < 0) plane1.x = 0;
                    if(plane1.y > 600-56) plane1.y = 600-56;
                    if(plane1.y < 0) plane1.y = 0;
                }
                thread.sleep(17);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
