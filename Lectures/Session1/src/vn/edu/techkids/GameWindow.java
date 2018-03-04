package vn.edu.techkids;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.event.WindowEvent;
import java.awt.event.WindowListener;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

/**
 * Created by qhuydtvt on 4/24/2016.
 */
public class GameWindow extends Frame implements Runnable {
    Image backgroundImage;
    Image planeImage;
    int x = 100;
    int y = 500;
    Thread thread;
    int dx = 0;
    int dy = 0;
    Image backbufferImage;
    public GameWindow (){
        this.setVisible(true);
        this.setSize(400, 600);

        try {
            backgroundImage = ImageIO.read(new File("resources/background.png"));
            planeImage = ImageIO.read(new File("resources/plane4.png"));
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
                switch (e.getKeyCode()){
                    case KeyEvent.VK_UP:
                        dy = -5;
                       // repaint();
                        break;
                    case KeyEvent.VK_DOWN:
                        dy = 5;
                       // repaint();
                        break;
                    case KeyEvent.VK_LEFT:
                        dx = -5;
                       // repaint();
                        break;
                    case KeyEvent.VK_RIGHT:
                        dx = 5;
                       // repaint();
                        break;
                }
            }

            @Override
            public void keyReleased(KeyEvent e) {
                System.out.println("keyReleased");
                switch (e.getKeyCode()){
                    case KeyEvent.VK_UP:
                        dy = 0;
                        // repaint();
                        break;
                    case KeyEvent.VK_DOWN:
                        dy = 0;
                        // repaint();
                        break;
                    case KeyEvent.VK_LEFT:
                        dx = 0;
                        // repaint();
                        break;
                    case KeyEvent.VK_RIGHT:
                        dx = 0;
                        // repaint();
                        break;
                }
            }
        });
        thread = new Thread(this);
        thread.start();

    }

    @Override
    public void update(Graphics g) {
        System.out.println("Update");
//        super.update(g);
        if(backbufferImage == null){
            backbufferImage =  new BufferedImage(400, 600, 1);
        }
        Graphics backbufferGraphics = backbufferImage.getGraphics();
        backbufferGraphics.drawImage(backgroundImage, 0, 0, null);
        backbufferGraphics.drawImage(planeImage, x, y, null);
        g.drawImage(backbufferImage, 0, 0, null);
    }

    @Override
    public void run() {
        long count = 0;

        while(true){
//            count++;
//            System.out.println(count);
            try {
                x += dx;
                y += dy;
                repaint();
                Thread.sleep(17);

            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
