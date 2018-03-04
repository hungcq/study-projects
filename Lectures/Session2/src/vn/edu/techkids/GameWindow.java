package vn.edu.techkids;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.event.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

/**
 * Created by qhuydtvt on 4/24/2016.
 */
public class GameWindow extends Frame implements Runnable {
    Image backgroundImage;
    Plane plane1 ;
    Plane plane2 ;




    Thread thread;

    Image backbufferImage;
    public GameWindow (){
        this.setVisible(true);
        this.setSize(400, 600);

        try {
            backgroundImage = ImageIO.read(new File("resources/background.png"));
            Image plane1Image = ImageIO.read(new File("resources/plane4.png"));
            Image plane2Image = (ImageIO.read(new File("resources/plane2.png")));

            plane1 = new Plane(100,500,  plane1Image);
            plane2 = new Plane(200,500,  plane2Image);
//            bullet = new Bullet(300, 500, ImageIO.read(new File("resources/bullet.png")));
        } catch (IOException e) {
            e.printStackTrace();
        }

        this.addWindowListener(new WindowListener() {
            @Override
            public void windowOpened(WindowEvent e) {
                System.out.println("windowOpened");
            }

            @Override
            public void windowClosing(WindowEvent e) {
                System.out.println("windowClosing");
                System.exit(0);

            }

            @Override
            public void windowClosed(WindowEvent e) {
                System.out.println("windowClosed");
            }

            @Override
            public void windowIconified(WindowEvent e) {
                System.out.println("windowIconified");
            }

            @Override
            public void windowDeiconified(WindowEvent e) {

            }

            @Override
            public void windowActivated(WindowEvent e) {

            }

            @Override
            public void windowDeactivated(WindowEvent e) {

            }
        });
        this.addKeyListener(new KeyListener() {
            @Override
            public void keyTyped(KeyEvent e) {
                System.out.println("keyTyped");
            }

            @Override
            public void keyPressed(KeyEvent e) {
                System.out.println("keyPressed");
                System.out.println(e.getKeyCode());

                switch (e.getKeyCode()) {
                    case KeyEvent.VK_UP:
                        plane1.dy = -5;

                        // repaint();
                        break;
                    case KeyEvent.VK_DOWN:
                        plane1.dy = 5;
                        // repaint();
                        break;
                    case KeyEvent.VK_LEFT:
                        plane1.dx = -5;
                        // repaint();
                        break;
                    case KeyEvent.VK_RIGHT:
                        plane1.dx = 5;
                        // repaint();
                        break;
                    case KeyEvent.VK_SPACE:
                        plane1.shot();
                        break;
                }

//                switch (e.getKeyCode()) {
//                    case KeyEvent.VK_W:
//                        plane2.dy = -5;
//
//                        // repaint();
//                        break;
//                    case KeyEvent.VK_S:
//                        plane2.dy = 5;
//                        // repaint();
//                        break;
//                    case KeyEvent.VK_A:
//                        plane2.dx = -5;
//                        // repaint();
//                        break;
//                    case KeyEvent.VK_D:
//                        plane2.dx = 5;
//                        // repaint();
//                        break;
//                }
            }

            @Override
            public void keyReleased(KeyEvent e) {
                System.out.println("keyReleased");

                switch (e.getKeyCode()) {
                    case KeyEvent.VK_UP:
                        plane1.dy = 0;
                        // repaint();
                        break;
                    case KeyEvent.VK_DOWN:
                        plane1.dy = 0;
                        // repaint();
                        break;
                    case KeyEvent.VK_LEFT:
                        plane1.dx = 0;
                        // repaint();
                        break;
                    case KeyEvent.VK_RIGHT:
                        plane1.dx = 0;
                        // repaint();
                        break;
                }

//                switch (e.getKeyCode()) {
//                    case KeyEvent.VK_W:
//                        plane2.dy = 0;
//                        // repaint();
//                        break;
//                    case KeyEvent.VK_S:
//                        plane2.dy = 0;
//                        // repaint();
//                        break;
//                    case KeyEvent.VK_A:
//                        plane2.dx = 0;
//                        // repaint();
//                        break;
//                    case KeyEvent.VK_D:
//                        plane2.dx = 0;
//                        // repaint();
//                        break;
//                }
            }
        });
        this.addMouseMotionListener(new MouseMotionListener(){

            @Override
            public void mouseDragged(MouseEvent e) {

            }

            @Override
            public void mouseMoved(MouseEvent e) {
//                dx2 = e.getX();
//                dy2 = e.getY();
//x2 => e.getX(); y2 => e.getY()

//                if(e.getX() - 5 > x2) {
//                    dx2 = 5;
//                } else if(e.getX() +5 < x2) {
//                    dx2 = -5;
//                } else {
//                    dx2 = 0;
//                }
                System.out.println("mouseMoved");
            }
        });
        thread = new Thread(this);
        thread.start();

    }

    @Override
    public void update(Graphics g) {
//        System.out.println("Update");
//        super.update(g);
        if(backbufferImage == null){
            backbufferImage =  new BufferedImage(400, 600, 1);
        }
        Graphics backbufferGraphics = backbufferImage.getGraphics();
        backbufferGraphics.drawImage(backgroundImage, 0, 0, null);
        plane1.paint(backbufferGraphics);
        plane2.paint(backbufferGraphics);

//        bullet.paint(backbufferGraphics);
//        backbufferGraphics.drawImage(plane2, x2, y2, null);
        g.drawImage(backbufferImage, 0, 0, null);
    }

    @Override
    public void run() {
        long count = 0;

        while(true){
//            count++;
//            System.out.println(count);
            try {

                Point mousePoint = MouseInfo.getPointerInfo().getLocation();

                mousePoint.x -= getLocationOnScreen().x;
                mousePoint.y -= getLocationOnScreen().y;

                if(mousePoint.x - 5 > plane2.x) {
                    plane2.dx = 5;
                } else if(mousePoint.x + 5 < plane2.x) {
                    plane2.dx = -5;
                } else {
                    plane2.dx = 0;
                }

                if(mousePoint.y - 5 > plane2.y) {
                    plane2.dy = 5;
                } else if(mousePoint.y + 5 < plane2.y) {
                    plane2.dy = -5;
                } else {
                    plane2.dy = 0;
                }
//
//                if(mousePoint.x - 5 > x2) {
//                    dx2 = 5;
//                } else if(mousePoint.x + 5 < x2) {
//                    dx2 = -5;
//                } else {
//                    dx2 = 0;
//                }

                plane1.run();
                plane2.run();

//                x2 += dx2;
//                y2 += dy2;

                repaint();


                Thread.sleep(17);

            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
