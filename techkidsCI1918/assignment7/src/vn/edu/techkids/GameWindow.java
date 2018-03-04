package vn.edu.techkids;
/* TODO packaage exanplation */

import vn.edu.techkids.controllers.*;
import vn.edu.techkids.controllers.enemybullets.EnemyBulletControllerManager;
import vn.edu.techkids.controllers.enemyplanes.EnemyPlaneControllerManager;
import vn.edu.techkids.gamescenes.*;
import vn.edu.techkids.models.GameConfig;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.event.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.Vector;

/**
 * Created by qhuydtvt on 4/24/2016.
 */
public class GameWindow extends Frame implements Runnable, GameSceneListener {
    Thread thread;
    Image backbufferImage;
    GameConfig gameConfig;

    GameScence gameScence;

    public GameWindow () {

        this.gameConfig = GameConfig.getInst();
        gameScence = new MenuGameScence();
        gameScence.setGameSceneListener(this);

        this.setVisible(true);
        this.setSize(gameConfig.getScreenWidth(),
                gameConfig.getScreenHeight());

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
                gameScence.onKeyPressed(e);
            }

            @Override
            public void keyReleased(KeyEvent e) {
                gameScence.onKeyReleased(e);
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
               // System.out.println("mouseMoved");
            }
        });
        thread = new Thread(this);
        thread.start();

    }

    @Override
    public void update(Graphics g) {

        if(backbufferImage == null){
            backbufferImage =  new BufferedImage(gameConfig.getScreenWidth(),
                    gameConfig.getScreenHeight(), 1);
        }
        Graphics backbufferGraphics = backbufferImage.getGraphics();

        gameScence.paint(backbufferGraphics);

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

                /* TODO player2 moving */
//                if(mousePoint.x - 5 > plane2.x) {
//                    plane2.dx = 5;
//                } else if(mousePoint.x + 5 < plane2.x) {
//                    plane2.dx = -5;
//                } else {
//                    plane2.dx = 0;
//                }
//
//                if(mousePoint.y - 5 > plane2.y) {
//                    plane2.dy = 5;
//                } else if(mousePoint.y + 5 < plane2.y) {
//                    plane2.dy = -5;
//                } else {
//                    plane2.dy = 0;
//                }
 //               plane2.run();



                gameScence.run();

//                planeController1.run();
//                EnemyBulletControllerManager.getInst().run();
//                EnemyPlaneControllerManager.getInst().run();


                repaint();


                Thread.sleep(gameConfig.getThreadDelay());

            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public void changeGameScence(GameScenceType gameScenceType) {
        switch (gameScenceType) {
            case PLAY:
                gameScence = new PlayGameScence();
                break;
        }
    }
}
