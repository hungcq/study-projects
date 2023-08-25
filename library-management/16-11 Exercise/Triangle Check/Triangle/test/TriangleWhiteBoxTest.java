import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeAll;

import static org.junit.jupiter.api.Assertions.*;

class TriangleWhiteBoxTest {

    //C0 100% Coverage test.
    @Test
    void testC0() {
        Triangle triangle = new Triangle();
        assertEquals("Unsatisfied",triangle.calculate(1,2,3));
    }

    //C1 100% Coverage test.
    @Test
    void testInvalid() {
        Triangle triangle = new Triangle();
        assertEquals("Invalid",triangle.calculate(-1,2,3));
    }

    @Test
    void testUnsatisfied() {
        Triangle triangle = new Triangle();
        assertEquals("Not triangle",triangle.calculate(2,4,6));
    }

    @Test
    void testSatisfied() {
        Triangle triangle = new Triangle();
        assertEquals("Triangle",triangle.calculate(1,3,3));
    }

}