import Api from '../tools/api';
import { prop, compose, tap, ifElse, test, allPass, length, gt, lt, andThen } from 'ramda';

const api = new Api();

const getHandleSuccess = prop('handleSuccess');
const getHandleError = prop('handleError');
const getWriteLog = prop('writeLog');
const getValue = prop('value');
const isNumber = test(/^\d+(.)?\d+$/);
const isValidLength = compose(
  allPass([
    gt(10),
    lt(2),
  ]),
  length,
)
const validate = compose(
  allPass([
    isNumber,
    isValidLength,
  ]),
  getValue,
);
const convertToNumber = compose(
  Math.round,
  parseFloat,
  getValue,
)
const toSqr = (value) => Math.pow(value, 2);
const getRemainder = (value) => value % 3;

const getBinaryNumber = (value) => api.get('https://api.tech/numbers/base', {
  from: 10,
  to: 2,
  number: value,
});

const getResult = prop('result');

const getAnimal = (id) => api.get('https://animals.tech/' + id, {});


const processSequence = (data) => {

  const handleValidationError = (error) => getHandleError(error)('ValidationError');
  const handleSuccess = getHandleSuccess(data);
  const writeLog = getWriteLog(data);

  const log = compose(
    writeLog,
    getValue,
  );

  return compose(
    ifElse(
      validate,
      compose(
        andThen(handleSuccess),
        andThen(tap(writeLog)),
        andThen(getResult),
        andThen(getAnimal),
        andThen(tap(writeLog)),
        andThen(getRemainder),
        andThen(tap(writeLog)),
        andThen(toSqr),
        andThen(tap(writeLog)),
        andThen(length),
        andThen(tap(writeLog)),
        andThen(getResult),
        getBinaryNumber,
        tap(writeLog),
        convertToNumber,
      ),
      tap(handleValidationError)
    ),
    tap(log),
  )(data);
}
export default processSequence;
