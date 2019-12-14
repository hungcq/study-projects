import de.ur.mi.oop.graphics.Image;

public class Card extends Image {
    public int id;
    private static final String backside = "data/backside.jpg";

    public static final int STATE_UP = 0;
    public static final int STATE_DOWN = 1;
    public static final int STATE_REVEALED = 2;

    public static final int GAP = 20;
    public static final int SIZE = 185;

    public int state;

    private Image backImage;

    public Card(String image, int id, int state, int index) {
        super((index % 4) * (GAP + SIZE), (index / 4) * (GAP + SIZE), image);
        backImage = new Image((index % 4) * (GAP + SIZE), (index / 4) * (GAP + SIZE), backside);
        backImage.setWidth(SIZE);
        backImage.setHeight(SIZE);
        setWidth(SIZE);
        setHeight(SIZE);
        this.id = id;
        this.state = state;
    }

    public boolean pair(Card card) {
        return card.id == id;
    }

    public void reveal() {
        state = STATE_REVEALED;
    }

    public boolean open() {
        switch (state) {
            case STATE_DOWN:
                state = STATE_UP;
                return true;
            case STATE_UP:
            case STATE_REVEALED:
            default:
                return false;
        }
    }

    public void close() {
        switch (state) {
            case STATE_UP:
                state = STATE_DOWN;
                break;
            case STATE_DOWN:
            case STATE_REVEALED:
            default:
                break;
        }
    }

    @Override
    public void draw() {
        switch (state) {
            case STATE_DOWN:
                backImage.draw();
                break;
            case STATE_UP:
            case STATE_REVEALED:
            default:
                super.draw();
                break;
        }
    }
}
