import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class GameBoard {
    private static final int STATE_PLAYING = 0;
    private static final int STATE_WON = 1;

    private String[] imageList = new String[]{
            "data/robots/1.jpg",
            "data/robots/2.jpg",
            "data/robots/3.jpg",
            "data/robots/4.jpg",
            "data/robots/5.jpg",
            "data/robots/6.jpg",
            "data/robots/7.jpg",
            "data/robots/8.jpg"};

    private int gameState;
    private List<Card> cardList;

    Card currentOpenCard1;
    Card currentOpenCard2;

    public GameBoard() {
        cardList = new ArrayList<>();
        gameState = STATE_PLAYING;
    }

    public void initCards() {
        List<Integer> idList = new ArrayList<>();
        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 8; j++) {
                idList.add(j);
            }
        }
        Collections.shuffle(idList);
        for (int i = 0; i < idList.size(); i++) {
            cardList.add(new Card(imageList[idList.get(i)], idList.get(i), Card.STATE_DOWN, i));
        }
    }


    public void draw() {
        for (Card card : cardList) {
            card.draw();
        }
    }

    public void onMousePressed(int x, int y) {
        int xIndex = x / (Card.GAP + Card.SIZE);
        int yIndex = y / (Card.GAP + Card.SIZE);
        // check if click position is on a card
        if (x - xIndex * (Card.GAP + Card.SIZE) <= Card.SIZE
                &&  y - yIndex * (y / Card.GAP + Card.SIZE) <= Card.SIZE) {
            Card card = cardList.get(xIndex + 4 * yIndex);
            if (currentOpenCard1 == null) {
                boolean opened = card.open();
                if (opened) {
                    currentOpenCard1 = card;
                }
            } else {
                if (currentOpenCard2 == null) {
                    boolean opened = card.open();
                    if (opened) {
                        currentOpenCard2 = card;
                        if (currentOpenCard2.pair(currentOpenCard1)) {
                            currentOpenCard2.reveal();
                            currentOpenCard1.reveal();
                            for (Card card1 : cardList) {
                                if (card1.state != Card.STATE_REVEALED) {
                                    gameState = STATE_PLAYING;
                                    return;
                                }
                            }
                            gameState = STATE_WON;
                            System.out.println("Game is finished.");
                        }
                    }
                } else {
                    if (card != currentOpenCard1 && card != currentOpenCard2) {
                        currentOpenCard1.close();
                        currentOpenCard2.close();
                        currentOpenCard1 = card;
                        currentOpenCard1.open();
                        currentOpenCard2 = null;
                    }
                }
            }
        }
    }
}
