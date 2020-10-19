export const isUndefined = (obj: any): obj is undefined =>
  typeof obj === 'undefined';

export const isNil = (obj: any): obj is null | undefined =>
  isUndefined(obj) || obj === null;

export const isObject = (fn: any): fn is object =>
  !isNil(fn) && typeof fn === 'object';

export const isPlainObject = (fn: any): fn is object => {
  if (!isObject(fn)) return false;

  const proto = Object.getPrototypeOf(fn);

  if (proto === null) return true;

  const ctor =
    Object.prototype.hasOwnProperty.call(proto, 'constructor') &&
    proto.constructor;

  return (
    typeof ctor === 'function' &&
    ctor instanceof ctor &&
    Function.prototype.toString.call(ctor) ===
      Function.prototype.toString.call(Object)
  );
};

export const isFunction = (fn: any): boolean => typeof fn === 'function';

export const isString = (fn: any): fn is string => typeof fn === 'string';

export const isConstructor = (fn: any): boolean => fn === 'constructor';

export const isEmptyArray = (array: any): boolean =>
  !(array && array.length > 0);

export const isSymbol = (fn: any): fn is symbol => typeof fn === 'symbol';

export function checkIfStringEmpty(value: string): boolean {
  return value.trim().length === 0;
}

export function checkIfObjectEmpty<T>(value: T): boolean {
  return Object.keys(value).length === 0;
}

export function isEmpty<T>(value: T): boolean {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'string' && checkIfStringEmpty(value)) ||
    (typeof value === 'object' && checkIfObjectEmpty(value))
  );
}
