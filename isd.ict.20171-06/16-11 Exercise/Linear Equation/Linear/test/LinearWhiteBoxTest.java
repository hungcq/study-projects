import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class LinearWhiteBoxTest {

    //C0 100% Coverage test.
    @Test
    void testC01() {
        Linear linear = new Linear();
        assertEquals("1 solution", linear.calculate(1, 2, 3, 2, 5, 6));
    }

    @Test
    void testC02() {
        Linear linear = new Linear();
        assertEquals("No solution", linear.calculate(1, 2, 3, 2, 4, 7));
    }

    @Test
    void testC03() {
        Linear linear = new Linear();
        assertEquals("No solution", linear.calculate(1, 2, 3, 0, 0, 6));
    }

    @Test
    void testC04() {
        Linear linear = new Linear();
        assertEquals("Infinite solutions", linear.calculate(0, 2, 3, 0, 4, 6));
    }

    @Test
    void testC05() {
        Linear linear = new Linear();
        assertEquals("Infinite solutions", linear.calculate(1, 0, 3, 2, 0, 6));
    }

    @Test
    void testC06() {
        Linear linear = new Linear();
        assertEquals("No solution", linear.calculate(1, 2, 3, 2, 4, 5));
    }

    //C0 100% Coverage test.
    @Test
    void testC100() {
        Linear linear = new Linear();
        assertEquals("Infinite solutions", linear.calculate(0, 0, 0, 0, 0, 0));
    }

    @Test
    void testC101() {
        Linear linear = new Linear();
        assertEquals("1 solution", linear.calculate(2, 1, 4, 3, 5, 7));
    }

    @Test
    void testC102() {
        Linear linear = new Linear();
        assertEquals("No solution", linear.calculate(0, 0, 4, 13, 5, 4));
    }

    @Test
    void testC103() {
        Linear linear = new Linear();
        assertEquals("No solution", linear.calculate(3, 1, 7, 0, 0, 4));
    }

    @Test
    void testC104() {
        Linear linear = new Linear();
        assertEquals("Infinite solutions", linear.calculate(6, 9, 6, 0, 0, 0));
    }

    @Test
    void testC105() {
        Linear linear = new Linear();
        assertEquals("Infinite solutions", linear.calculate(0, 0, 0, 9, 2, 1));
    }

    @Test
    void testC106() {
        Linear linear = new Linear();
        assertEquals("Infinite solutions", linear.calculate(0, 3, 4, 0, 9, 12));
    }

    @Test
    void testC107() {
        Linear linear = new Linear();
        assertEquals("No solution", linear.calculate(0, 7, 1, 0, 7, 2));
    }

    @Test
    void testC108() {
        Linear linear = new Linear();
        assertEquals("Infinite solutions", linear.calculate(2, 0, 6, 5, 0, 15));
    }

    @Test
    void testC109() {
        Linear linear = new Linear();
        assertEquals("No solution", linear.calculate(2, 0, 7, 7, 0, 2));
    }

    @Test
    void testC110() {
        Linear linear = new Linear();
        assertEquals("Infinite solutions", linear.calculate(2, 1, 6, 4, 2, 12));
    }

    @Test
    void testC111() {
        Linear linear = new Linear();
        assertEquals("No solution", linear.calculate(5, 6, 1, 10, 12, 9));
    }
}