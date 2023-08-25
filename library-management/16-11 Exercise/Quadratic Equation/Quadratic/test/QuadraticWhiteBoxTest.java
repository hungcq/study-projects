import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class QuadraticWhiteBoxTest {

    private Quadratic classUnderTest;

    @Before
    public void setUp() throws Exception {
        classUnderTest = new Quadratic();
    }

    @Test
    public void testAEquals0BEquals0() throws Exception {
        assertEquals("No solution",classUnderTest.calculate(0,0,10));
    }

    @Test
    public void testAEquals0BDiffs0() throws Exception {
        assertEquals("2.0",classUnderTest.calculate(0,5,10));
    }

    @Test
    public void testDeltaLess0() throws Exception {
        assertEquals("No solution",classUnderTest.calculate(10,4,1));
    }

    @Test
    public void testDeltaEquals0() throws Exception {
        assertEquals("-0.5",classUnderTest.calculate(4,4,1));
    }

    @Test
    public void testDeltaMore0() throws Exception {
        assertEquals("-1.0 and -2.0",classUnderTest.calculate(1,3,2));
    }
}