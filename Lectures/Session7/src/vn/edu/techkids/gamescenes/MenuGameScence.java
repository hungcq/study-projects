package vn.edu.techkids.gamescenes;

import vn.edu.techkids.Utils;
import vn.edu.techkids.models.GameConfig;

import java.awt.*;
import java.awt.event.KeyEvent;

/**
 * Created by qhuydtvt on 5/13/2016.
 */
public class MenuGameScence extends GameScence {

    Image backgoundImage;

    public MenuGameScence() {
        this.backgoundImage = Utils.loadImage("resources/background_menu.jpg");
    }

    @Override
    public void run() {

    }

    @Override
    public void paint(Graphics g) {
        g.drawImage(this.backgoundImage, 0, 0,
                GameConfig.getInst().getScreenWidth(), GameConfig.getInst().getScreenHeight(), null);
    }

    @Override
    public void onKeyPressed(KeyEvent e) {
        if(e.getKeyCode() == KeyEvent.VK_ENTER) {
            changeGameScene(GameScenceType.PLAY);
        }
    }

    @Override
    public void onKeyReleased(KeyEvent e) {

    }
}
