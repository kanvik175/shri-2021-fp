import { prop, equals, allPass, compose, values, filter, length, lt, converge, anyPass, not } from 'ramda';

const red = 'red';
const blue = 'blue';
const orange = 'orange';
const green = 'green';
const white = 'white';

const square = 'square';
const star = 'star';
const circle = 'circle';
const triangle = 'triangle';

const getSquareColor = prop(square);
const getStarColor = prop(star);
const getCircleColor = prop(circle);
const getTriangleColor = prop(triangle);

const isRedColor = equals(red);
const isBlueColor = equals(blue);
const isOrangeColor = equals(orange);
const isGreenColor = equals(green);
const isWhiteColor = equals(white);

const getRedFigures = compose(
  filter(isRedColor),
  values,
);
const getBlueFigures = compose(
  filter(isBlueColor),
  values,
);
const getOrangeFigures = compose(
  filter(isOrangeColor),
  values,
);
const getGreenFigures = compose(
  filter(isGreenColor),
  values,
)


// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([
  compose(isGreenColor, getSquareColor),
  compose(isRedColor, getStarColor),
  compose(isWhiteColor, getCircleColor),
  compose(isWhiteColor, getTriangleColor),
])

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = compose(
  lt(1),
  length,
  getGreenFigures,
);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = converge(equals, [
  compose(
    length,
    getRedFigures,
  ),
  compose(
    length,
    getBlueFigures,
  )
]);

// 4. Синий круг, красная звезда, оранжевый квадрат
export const validateFieldN4 = allPass([
  compose(isBlueColor, getCircleColor),
  compose(isRedColor, getStarColor),
  compose(isOrangeColor, getSquareColor),
]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = anyPass([
  compose(lt(2), compose(
    length,
    getGreenFigures,
  )),
  compose(lt(2), compose(
    length,
    getBlueFigures,
  )),
  compose(lt(2), compose(
    length,
    getRedFigures,
  )),
  compose(lt(2), compose(
    length,
    getOrangeFigures,
  )),
]);

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
export const validateFieldN6 = allPass([
  compose(equals(2), compose(
    length,
    getGreenFigures,
  )),
  compose(isGreenColor, getTriangleColor),
  compose(equals(1), compose(
    length,
    getRedFigures,
  )),
]);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = compose(
  equals(4),
  compose(
    length,
    getOrangeFigures,
  )
);

// 8. Не красная и не белая звезда.
export const validateFieldN8 = allPass([
  compose(
    not,
    isWhiteColor,
    getStarColor,
  ),
  compose(
    not,
    isRedColor,
    getStarColor,
  ),
]);

// 9. Все фигуры зеленые.
export const validateFieldN9 = compose(
  equals(4), 
  compose(
    length,
    getGreenFigures,
  )
);

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = allPass([
  converge(equals, [getTriangleColor, getSquareColor]),
  compose(
    not,
    isWhiteColor,
    getTriangleColor,
  ),
  compose(
    not,
    isWhiteColor,
    getSquareColor,
  )
]);
