package mbeans;

public class Square implements SquareMBean {
    float square = 0;

    public void calculateSquare(float r) {
        //прямоуг = r * (r/2)
        //четверть круга = (pi * r^2) / 4
        //треугольник = (r^2) / 2
        float sRec = r * (r/2);
        float sTre = ((r/2) * (r/2)) / 2;
        float sSir = (float) ((Math.PI * Math.pow(r, 2)) / 4);
        System.out.println(sRec);
        System.out.println(sTre);
        System.out.println(sSir);

        square = sSir + sTre + sRec;
    }

    @Override
    public float square() {
        return square;
    }

    @Override
    public float getSquare() {
        return square;
    }
}
