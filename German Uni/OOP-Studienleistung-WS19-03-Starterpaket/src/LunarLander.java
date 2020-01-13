import de.ur.mi.oop.app.GraphicsApp;
import de.ur.mi.oop.colors.Color;
import de.ur.mi.oop.colors.Colors;
import de.ur.mi.oop.events.KeyPressedEvent;

public class LunarLander extends GraphicsApp {

    /* Private Konstanten */
    public static final int CANVAS_HEIGHT = 800;
    public static final int CANVAS_WIDTH = 800;
    private static final int FRAME_RATE = 60;
    private static final Color BACKGROUND_COLOR = Colors.BLACK;

    private Lander lander;
    private Surface surface;

    private int gameState;

    public static final int STATE_PLAYING = 0;
    public static final int STATE_WON = 1;
    public static final int STATE_CRASHED = 2;
    public static final int STATE_OUT_OF_FUEL = 3;

    /*
     * Die initialize-Methode wird einmalig zum Start des Programms
     * aufgerufen.
     */

    @Override
    public void initialize() {
        setupCanvas();
        lander = new Lander(CANVAS_WIDTH / 2, 0, this);
        surface = new Surface(this);
        gameState = STATE_PLAYING;
    }

    /*
     * Die draw-Methode wird so lange wiederholt aufgerufen, bis das Programm
     * beendet wird.
     */

    @Override
    public void draw() {
        drawBackground(BACKGROUND_COLOR);
        lander.draw();
        surface.draw();
    }

    private void setupCanvas() {
        setCanvasSize(CANVAS_WIDTH, CANVAS_HEIGHT);
        setFrameRate(FRAME_RATE);
    }

    @Override
    public void onKeyPressed(KeyPressedEvent event) {
        super.onKeyPressed(event);
        lander.onKeyPressed(event);
    }

    public void setGameState(int gameState) {
        if (this.gameState == STATE_PLAYING) {
            this.gameState = gameState;
            switch (gameState) {
                case STATE_WON:
                    System.out.println("WON.");
                    break;
                case STATE_OUT_OF_FUEL:
                    System.out.println("OUT OF FUEL.");
                    break;
                case STATE_CRASHED:
                    System.out.println("CRASHED.");
                    break;
            }
            lander.stop();
        }
    }

    public Lander getLander() {
        return lander;
    }
}