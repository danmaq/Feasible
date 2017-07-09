'use strict';

/** Utility class. */
export class Utils {
    static toPips(cur) { return cur / 100; }
    static toCurrency(pip) { return pip * 100; }
}