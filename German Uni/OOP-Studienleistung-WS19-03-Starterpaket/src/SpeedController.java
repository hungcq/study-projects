public class SpeedController {
    private double v = 0;

    public static final double STEERING_ACCELERATION = 7;
    public static final double ACCELERATION_LOSS = 0.5;
    public static final double MAX_SPEED = 15;

    public static final int STEERING_DIRECTION_LEFT = 1;
    public static final int STEERING_DIRECTION_RIGHT = 2;

    public void steer(int steeringDirection) {
        switch (steeringDirection) {
            case STEERING_DIRECTION_LEFT:
                v -= STEERING_ACCELERATION;
                break;
            case STEERING_DIRECTION_RIGHT:
                v += STEERING_ACCELERATION;
                break;
            default:
                break;
        }
    }

    public double getSpeed() {
        if (v > 0) {
            v -= ACCELERATION_LOSS;
            if (v < 0) v = 0;
        } else if (v < 0) {
            v += ACCELERATION_LOSS;
            if (v > 0) v = 0;
        }
        if (v > MAX_SPEED) {
            v = MAX_SPEED;
        } else if (v < -MAX_SPEED) {
            v = -MAX_SPEED;
        }
        return v;
    }
}
