import de.ur.mi.oop.colors.Colors;
import de.ur.mi.oop.events.KeyPressedEvent;
import de.ur.mi.oop.graphics.Image;
import de.ur.mi.oop.graphics.Rectangle;

public class Lander extends Image {
    private SpeedController speedController;
    private static final double V_Y = 1;
    private static final int START_FUEL = 20;
    private float x;
    private float y;
    private int fuel;
    private Rectangle fuelBar;

    private LunarLander lunarLander;

    private boolean stopped = false;

    public Lander(int x, int y, LunarLander lunarLander) {
        super(x, y, "data/assets/lander_small.png");
        this.x = x;
        this.y = y;
        setWidth(30);
        setHeight(30);
        speedController = new SpeedController();
        fuel = START_FUEL;
        this.lunarLander = lunarLander;
        fuelBar = new Rectangle(0, 0, LunarLander.CANVAS_WIDTH, 10, Colors.GREEN);
    }

    public void onKeyPressed(KeyPressedEvent event) {
        if (stopped) {
            return;
        }
        switch (event.getKeyCode()) {
            case KeyPressedEvent.VK_LEFT:
                speedController.steer(SpeedController.STEERING_DIRECTION_LEFT);
                fuel--;
                break;
            case KeyPressedEvent.VK_RIGHT:
                speedController.steer(SpeedController.STEERING_DIRECTION_RIGHT);
                fuel--;
                break;
            default:
                break;
        }
        if (fuel == 0) {
            lunarLander.setGameState(LunarLander.STATE_OUT_OF_FUEL);
        }
    }

    @Override
    public void draw() {
        fuelBar.setWidth(LunarLander.CANVAS_WIDTH * 1.0f * fuel / START_FUEL);
        fuelBar.draw();
        if (!stopped) {
            x += speedController.getSpeed();
            y += V_Y;
            if (x > LunarLander.CANVAS_WIDTH - getWidth()) {
                x = LunarLander.CANVAS_WIDTH - getWidth();
            }
            if (x < 0) {
                x = 0;
            }
            if (y > LunarLander.CANVAS_HEIGHT - getHeight()) {
                y = LunarLander.CANVAS_HEIGHT - getHeight();
            }
            setXPos(x);
            setYPos(y);
        }
        super.draw();
    }

    public void stop() {
        stopped = true;
    }
}
