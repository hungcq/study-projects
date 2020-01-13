import de.ur.mi.oop.colors.Colors;
import de.ur.mi.oop.graphics.Rectangle;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

public class Surface {

    public static final int SMOOTHING_FILTER_SIZE = 10;
    public static final int TOTAL_REC = 16;

    private List<Rectangle> rectangleList;
    private int landingIndex;

    private LunarLander lunarLander;

    public Surface(LunarLander lunarLander) {
        this.lunarLander = lunarLander;
        init();
    }

    private void init() {
        rectangleList = new ArrayList<>();
        int recWidth = LunarLander.CANVAS_WIDTH / TOTAL_REC;
        landingIndex = ThreadLocalRandom.current().nextInt(TOTAL_REC);
        List<Integer> points = new ArrayList<>();
        for (int i = 0; i < TOTAL_REC; i++) {
            points.add(ThreadLocalRandom.current().nextInt(LunarLander.CANVAS_HEIGHT));
        }
        smoothPoints(points);
        for (int i = 0; i < TOTAL_REC; i++) {
            Rectangle rectangle = new Rectangle(i * recWidth, LunarLander.CANVAS_HEIGHT - points.get(i), recWidth, points.get(i));
            switch (i % 2) {
                case 0:
                    rectangle.setColor(Colors.WHITE);
                    break;
                case 1:
                    rectangle.setColor(Colors.GREY);
                    break;
            }
            if (i == landingIndex) {
                rectangle.setColor(Colors.RED);
            }
            rectangleList.add(rectangle);
        }
    }

    private void smoothPoints(List<Integer> points) {
        for (int i = 0; i < points.size(); i++) {
            float sum = 0;
            for (int j = -SMOOTHING_FILTER_SIZE / 2; j < SMOOTHING_FILTER_SIZE / 2; j++) {
                int newIndex = i + j;
                if (newIndex >= 0 && newIndex < points.size()) {
                    sum += points.get(i + j);
                }
            }
            sum /= SMOOTHING_FILTER_SIZE;
            points.set(i, (int) sum);
        }
    }

    public void draw() {
        Lander lander = lunarLander.getLander();
        for (int i = 0; i < TOTAL_REC; i++) {
            Rectangle rectangle = rectangleList.get(i);
            rectangle.draw();
            if (rectangle.hitTest(lander.getXPos() + lander.getWidth(), lander.getYPos() + lander.getHeight())
                    || rectangle.hitTest(lander.getXPos(), lander.getYPos() + lander.getHeight())) {
                if (i == landingIndex) {
                    lunarLander.setGameState(LunarLander.STATE_WON);
                } else {
                    lunarLander.setGameState(LunarLander.STATE_CRASHED);
                }
            }
        }
    }
}
