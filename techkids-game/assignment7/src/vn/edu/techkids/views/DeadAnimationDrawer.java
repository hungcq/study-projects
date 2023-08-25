package vn.edu.techkids.views;

import vn.edu.techkids.models.GameObject;

import java.awt.*;
import java.util.Vector;

/**
 * Created by 1918 on 14-May-16.
 */
public class DeadAnimationDrawer extends AnimationDrawer {
    public DeadAnimationDrawer(String[] imageUrls) {
        super(imageUrls);
    }

    public DeadAnimationDrawer(Vector<Image> imageVector) {
        super(imageVector);
    }

    public DeadAnimationDrawer(Image[] images) {
        super(images);
    }

    protected void onEndImageVector(GameObject gameObject) {
        gameObject.setAlive(false);
    }
}
