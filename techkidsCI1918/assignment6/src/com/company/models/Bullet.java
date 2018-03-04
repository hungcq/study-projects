package com.company.models;

/**
 * Created by 1918 on 29-Apr-16.
 */
public class Bullet extends GameObject {

    public static final int DEFAULT_WIDTH = 13;
    public static final int DEFAULT_HEIGHT = 33;
    public static final int DAMAGE_DEFAULT = 1;

    private static int damage = DAMAGE_DEFAULT;

    public Bullet(int x, int y, int width, int height) {
        super(x, y, width, height);
    }

    public Bullet(int x, int y, int width, int height, int damage) {
        this(x, y, width, height);
        this.damage = damage;
    }

    public static int getDamage() {
        return damage;
    }

    public static void bonusDamage(int x) {
        damage *= x;
    }
    public void setDamage(int damage) {
        this.damage = damage;
    }
}
