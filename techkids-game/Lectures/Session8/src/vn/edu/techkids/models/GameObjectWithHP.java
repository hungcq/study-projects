package vn.edu.techkids.models;

/**
 * Created by qhuydtvt on 5/7/2016.
 */
public class GameObjectWithHP extends GameObject {

    private LifeState lifeState;
    private int hp;

    public GameObjectWithHP(int x, int y, int width, int height, int hp) {
        super(x, y, width, height);
        this.hp = hp;
        this.lifeState = LifeState.ALIVE;
    }

    public LifeState getLifeState() {
        return lifeState;
    }

    public void setLifeState(LifeState lifeState) {
        this.lifeState = lifeState;
        if(lifeState == LifeState.DEAD) {
            isAlive = false;
        }
    }

    public int getHp() {
        return hp;
    }

    public void setHp(int hp) {
        this.hp = hp;
    }

    public void increaseHP(int delta) {
        this.hp += delta;
    }

    public void increaseHP() {
        increaseHP(1);
    }

    public void decreaseHP(int delta) {
        this.hp -= delta;
        if(this.hp <= 0) {
            this.lifeState = LifeState.DYING;
        }
    }

    public void decreaseHP() {
        decreaseHP(1);
    }
}
