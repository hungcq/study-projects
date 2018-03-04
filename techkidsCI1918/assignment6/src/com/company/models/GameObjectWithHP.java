package com.company.models;

/**
 * Created by 1918 on 07-May-16.
 */
public class GameObjectWithHP extends GameObject {

    private int HP;

    public GameObjectWithHP(int x, int y, int width, int height, int HP) {
        super(x, y, width, height);
        this.HP = HP;
    }

    public void setHP(int HP) {
        this.HP = HP;
    }

    public int getHP() {
        return this.HP;
    }

    public void increaseHP(int delta) {
        this.HP += delta;
    }

    public void increaseHP() {
        increaseHP(1);
    }

    public void decreaseHP(int delta) {
        this.HP -= delta;
    }

    public void decreaseHP() {
        decreaseHP(1);
    }


}
