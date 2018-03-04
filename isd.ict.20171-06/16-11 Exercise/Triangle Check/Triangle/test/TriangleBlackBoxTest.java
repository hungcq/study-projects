import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeAll;
import static org.junit.jupiter.api.Assertions.*;

class TriangleBlackBoxTest {
    @Test
    void testTrue() throws Exception  {
        Triangle triangle = new Triangle();
        assertEquals("Triangle",triangle.calculate(5,4,3));
    }

    @Test
    void testFalse() throws Exception  {
        Triangle triangle = new Triangle();
        assertEquals("Not triangle",triangle.calculate(100,2,3));
    }

    @Test
    void testInvalid1() throws Exception  {
        Triangle triangle = new Triangle();
        assertEquals("Invalid",triangle.calculate(-6,2,1));
    }

    @Test
    void testInvalid2() throws Exception  {
        Triangle triangle = new Triangle();
        assertEquals("Invalid",triangle.calculate(5,0,2));
    }
}