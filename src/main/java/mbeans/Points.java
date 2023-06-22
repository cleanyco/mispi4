package mbeans;

import javax.management.Notification;
import javax.management.NotificationBroadcasterSupport;

public class Points extends NotificationBroadcasterSupport implements PointsMBean {
    static int numberOfPoints = 0;
    static int numberOfHitPoints = 0;

    private int seqNum = 0;

    @Override
    public int getNumberOfPoints() {
        return numberOfPoints;
    }

    @Override
    public int getNumberOfHitPoints() {
        return numberOfHitPoints;
    }

    public void setNumberOfPoints(int numberOfPoints) {
        Points.numberOfPoints = numberOfPoints;
    }

    public void setNumberOfHitPoints(int numberOfHitPoints) {
        Points.numberOfHitPoints = numberOfHitPoints;
    }

    public void isOutOfBounds(double x, double y) {
        if (Math.abs(x) > 5 || Math.abs(y) > 3) {
            sendNotification(
                    new Notification(
                            "ACHTUNG",
                            this,
                            seqNum,
                            System.currentTimeMillis(),
                            "ALLES IST SEHR SCHLECHT!")
            );
            seqNum++;
        }
    }

    public void increasePoints() {
        numberOfPoints++;
    }

    public void increaseHitPoints() {
        numberOfHitPoints++;
    }


}
