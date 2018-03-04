package vn.edu.techkids.gamescenes;

import vn.edu.techkids.controllers.*;
import vn.edu.techkids.controllers.enemybullets.EnemyBulletControllerManager;
import vn.edu.techkids.controllers.enemyplanes.EnemyPlaneControllerManager;
import vn.edu.techkids.models.GameConfig;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.event.KeyEvent;
import java.io.File;
import java.io.IOException;
import java.util.Vector;

/**
 * Created by qhuydtvt on 5/13/2016.
 */
public class PlayGameScence extends GameScence {

    private Image backgroundImage;
    private PlaneController planeController1;
    private Vector<Controller> controllerVect;
    private GameConfig gameConfig;

    public PlayGameScence() {
        gameConfig = GameConfig.getInst();
        controllerVect = new Vector<Controller>();

        controllerVect.add(EnemyPlaneControllerManager.getInst());
        controllerVect.add(EnemyBulletControllerManager.getInst());
        controllerVect.add(PlaneController.getPlaneController1());
        controllerVect.add(new BombControllerManager());

        this.planeController1 = PlaneController.getPlaneController1();


        try {
            backgroundImage = ImageIO.read(new File("resources/background.png"));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void run() {
        CollisionPool.getInst().run();
        for(Controller controller : controllerVect) {
            controller.run();
        }
    }

    @Override
    public void paint(Graphics backbufferGraphics) {
        backbufferGraphics.drawImage(backgroundImage, 0, 0,
                gameConfig.getScreenWidth(), gameConfig.getScreenHeight(), null);

//        planeController1.paint(backbufferGraphics);
//        EnemyPlaneControllerManager.getInst().paint(backbufferGraphics);
//        EnemyBulletControllerManager.getInst().paint(backbufferGraphics);

        for (Controller controller : controllerVect) {
            controller.paint(backbufferGraphics);
        }
    }

    @Override
    public void onKeyPressed(KeyEvent e) {

        PlaneDirection planeDirection = PlaneDirection.NONE;

        switch (e.getKeyCode()) {
            case KeyEvent.VK_UP:
                planeDirection = PlaneDirection.UP;
                break;
            case KeyEvent.VK_DOWN:
                planeDirection = PlaneDirection.DOWN;
                break;
            case KeyEvent.VK_LEFT:
                planeDirection = PlaneDirection.LEFT;
                break;
            case KeyEvent.VK_RIGHT:
                planeDirection = PlaneDirection.RIGHT;
                break;
            case KeyEvent.VK_SPACE:
                planeController1.shot();
                break;
        }

        planeController1.move(planeDirection);

    }

    @Override
    public void onKeyReleased(KeyEvent e) {
        PlaneDirection planeDirection = PlaneDirection.NONE;
        switch (e.getKeyCode()) {
            case KeyEvent.VK_UP:
            case KeyEvent.VK_DOWN:
                planeDirection = PlaneDirection.STOP_Y;
                break;
            case KeyEvent.VK_LEFT:
            case KeyEvent.VK_RIGHT:
                planeDirection = PlaneDirection.STOP_X;
                break;
        }
        planeController1.move(planeDirection);
    }
}
