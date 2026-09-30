package qa;

import com.intuit.karate.Results;
import com.intuit.karate.Runner;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

class BookingTest {
    @Test
    void bookings() {
        Results results = Runner.path("classpath:features")
            .tags(System.getProperty("karate.tags", "~@ignore"))
            .outputJunitXml(true).outputCucumberJson(true)
            .parallel(1); // Servicio público compartido: concurrencia contenida.
        assertEquals(0, results.getFailCount(), results.getErrorMessages());
    }
}
