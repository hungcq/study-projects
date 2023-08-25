import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class LinearBlackBoxTest {

    @Test
    void testOnesolution2() {
        Linear linear = new Linear();
        assertEquals("1 solution", linear.calculate(3,5,7,9,9,21));
    }

    @Test
    void testInfinitysolution() {
        Linear linear = new Linear();
        assertEquals("Infinite solutions", linear.calculate(1,3,5,3,9,15));
    }

    @Test
    void testNosolution() {
        Linear linear = new Linear();
        assertEquals("No solution", linear.calculate(1,2,4,2,4,5));
    }

    @Test
    void testOnesolution1() {
        Linear linear = new Linear();
        assertEquals("1 solution", linear.calculate(2,1,5,4,1,6));
    }
}