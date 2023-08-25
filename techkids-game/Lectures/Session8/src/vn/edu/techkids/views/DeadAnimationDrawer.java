package vn.edu.techkids.views;

import vn.edu.techkids.models.GameObject;

import java.awt.*;
import java.util.Vector;

/**
 * Created by qhuydtvt on 5/14/2016.
 */
public class DeadAnimationDrawer extends AnimationDrawer {

    public DeadAnimationDrawer(String[] imageUrls) {
        super(imageUrls);
    }

    public DeadAnimationDrawer(Image[] images) {
        super(images);
    }

    public DeadAnimationDrawer(Vector<Image> imageVector) {
        super(imageVector);
    }

    @Override
    protected void onEndImageVector(GameObject gameObject) {
        gameObject.setAlive(false);
    }
}
