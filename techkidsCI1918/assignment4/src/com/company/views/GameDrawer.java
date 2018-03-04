package com.company.views;

import com.company.models.GameObject;

import java.awt.*;

/**
 * Created by 1918 on 29-Apr-16.
 */
public interface GameDrawer {
    void paint(GameObject gameObject, Graphics g);

}
