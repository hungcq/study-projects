package com.company.models;

import java.awt.*;

/**
 * Created by 1918 on 06-May-16.
 */
public class GameConfig {
    public static final int DEFAULT_SCREEN_WIDTH = 800;
    public static final int DEFAULT_SCREEN_HEIGHT = 600;
    public static final int DEFAULT_THREAD_DELAY = 17;
    private int screenWidth;
    private int screenHeight;
    private int threadDelay;

    public int durationInMillisecond(int count) {
        return count*threadDelay;
    }

    public int durationInSecond(int count) {
        return count*threadDelay/1000;
    }

    public GameConfig(int screenWidth, int screenHeight, int threadDelay) {
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.threadDelay = threadDelay;
    }

    public int getScreenWidth() {
        return screenWidth;
    }

    public int getScreenHeight() {
        return screenHeight;
    }

    public int getThreadDelay() {
        return threadDelay;
    }

    public boolean isInScreen(Rectangle rect) {
        return rect.getX() > 0 && rect.getX() + rect.getWidth() < this.getScreenWidth()
                && rect.getY() > 0 && rect.getY() +rect.getHeight() < this.getScreenHeight();
    }

    private static GameConfig inst;
    public static GameConfig getInst() {
        if(inst == null) {
            inst = new GameConfig(DEFAULT_SCREEN_WIDTH,
                    DEFAULT_SCREEN_HEIGHT,
                    DEFAULT_THREAD_DELAY);
        }
        return inst;
    }

}
