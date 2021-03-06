package vn.edu.techkids.views;

import vn.edu.techkids.models.GameConfig;
import vn.edu.techkids.models.GameObject;

import javax.imageio.ImageIO;
import java.awt.*;
import java.io.File;
import java.io.IOException;
import java.util.Vector;

/**
 * Created by qhuydtvt on 5/13/2016.
 */
public class AnimationDrawer extends GameDrawer {

    private Vector<Image> imageVector;
    private int imageIdx = 0;
    private int count = 0;

    public AnimationDrawer(String[] imageUrls) {
        imageVector = new Vector<Image>();
        for(String imageUrl : imageUrls) {
            try {
                Image image = ImageIO.read(new File(imageUrl));
                imageVector.add(image);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public AnimationDrawer(Image[] images) {
        this.imageVector = new Vector<Image>();
        for (Image image : images) {
            this.imageVector.add(image);
        }
    }

    public AnimationDrawer(Vector<Image> imageVector) {
        this.imageVector = imageVector;
    }

    @Override
    public void paint(GameObject gameObject, Graphics g) {
        Image image = imageVector.get(imageIdx);
        g.drawImage(image,
                gameObject.getX(), gameObject.getY(),
                gameObject.getWidth(), gameObject.getHeight(),
                null);
        count++;
        if (GameConfig.getInst().durationInMiliseconds(count) >= 50) {
            count = 0;
            imageIdx++;
            if(imageIdx >= imageVector.size()) {
                onEndImageVector(gameObject);
            }
        }
    }

    protected void onEndImageVector(GameObject gameObject) {
        imageIdx = 0;
    }
}
