package vn.edu.techkids.models;

/**
 * Created by qhuydtvt on 5/6/2016.
 */
public class EnemyPlane extends GameObjectWithHP {
    private static final int HP_DEFAULT = 2;

    public EnemyPlane(int x, int y, int width, int height, int hp) {
        super(x, y, width, height, hp);
    }

    public EnemyPlane(int x, int y, int width, int height) {
        this(x, y, width, height, HP_DEFAULT);
    }
}
