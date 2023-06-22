package beans;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Clock {
    private LocalDateTime dateTime;
    private final DateTimeFormatter dateFormat;

    public Clock() {
        this.dateTime = LocalDateTime.now();
        this.dateFormat = DateTimeFormatter.ofPattern("HH:mm:ss");
    }

    public String getDateTime() {
        return this.dateTime.format(dateFormat);
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public void updateTime(){
        this.dateTime = LocalDateTime.now();
    }
}