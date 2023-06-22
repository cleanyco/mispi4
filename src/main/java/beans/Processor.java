package beans;

import mbeans.Points;
import mbeans.Square;
import utils.DatabaseConnector;
import utils.DatabaseManager;
import utils.Hit;

import javax.management.*;
import java.lang.management.ManagementFactory;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Processor {
    private DatabaseConnector databaseConnector = new DatabaseConnector("localhost",
            "postgres", "postgres", "postgres", 5432); //oops :)
    private DatabaseManager databaseManager = new DatabaseManager(databaseConnector.getConnection());

    private long startTime;

    private Points points = new Points();
    private Square square = new Square();

    {
        points.setNumberOfPoints(databaseManager.getAll().size());
        points.setNumberOfHitPoints((int) databaseManager.getAll().stream().filter(hit -> hit.getHit().equals("Hit")).count());
    }

    {
        MBeanServer mBeanServer = ManagementFactory.getPlatformMBeanServer();

        try {
            ObjectName square_mbs = new ObjectName("jmx:type=Square");
            ObjectName points_mbs = new ObjectName("jmx:type=Points");

            mBeanServer.registerMBean(points, points_mbs);
            mBeanServer.registerMBean(square, square_mbs);
        } catch (MalformedObjectNameException | InstanceAlreadyExistsException | MBeanRegistrationException |
                 NotCompliantMBeanException e) {
            throw new RuntimeException(e);
        }
    }

    public Hit hit = new Hit();
    public List<Hit> hits = new ArrayList<>();

    public Processor() throws SQLException {
        setHits(databaseManager.getAll());
    }

    public void setHit(Hit hit) {
        this.hit = hit;
    }

    public Hit getHit() {
        return hit;
    }

    public void setHits(List<Hit> hits) {
        this.hits = hits;
    }

    public List<Hit> getHits() {
        List<Hit> outputHits = new ArrayList<>(hits);
        Collections.reverse(outputHits);
        return outputHits;
    }

    public void addHit() throws SQLException {
        startTime = System.currentTimeMillis();
        hit.setHit(checkHit());
        hit.setCurrentTime(LocalDateTime.now().toString());
        hit.setExecutionTime((System.currentTimeMillis() - startTime));
        hits.add(hit);
        databaseManager.addNewResult(hit);
    }

    public void addTestHit() {
        startTime = System.currentTimeMillis();
        hit.setHit(checkHit());
        hit.setCurrentTime(LocalDateTime.now().toString());
        hit.setExecutionTime((System.currentTimeMillis() - startTime));
        hits.add(hit);
    }

    public String checkHit() {
        double x = hit.getX();
        double y = hit.getY();
        double R = hit.getR();

        //проверка, что точка в зоне действия фигуры (че)
        points.isOutOfBounds(x, y);

        //установка радиуса в MBean:
        square.calculateSquare((float) R);

        //увеличение общего количества точек
        points.increasePoints();

        System.out.println("Input coords: " + hit.getX() + ", " + hit.getY() + ", " + hit.getR());
        if (checkCircle(x, y, R) || checkRectangle(x, y, R) || checkTriangle(x, y, R)) {
            //увеличение количества попадаемых в фигуру точек
            points.increaseHitPoints();
            return "Hit";
        } else {
            return "Miss";
        }
    }

    private boolean checkCircle(double x, double y, double R) {
        return (x >= 0) && (y >= 0) && (Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(R, 2));
    }

    private boolean checkRectangle(double x, double y, double R) {
        return (x <= 0) && (x >= -R) && (y >= 0) & (y <= R / 2);
    }

    private boolean checkTriangle(double x, double y, double R) {
        return (x >= 0) && (x <= R / 2) && (y <= 0) && (y > x - R / 2);
    }
}
