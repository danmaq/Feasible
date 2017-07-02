'use strict';

/** Limit type of order. */
export const Limit =
    Object.freeze({
        STOP: 1,
        NONE: 0,
        LIMIT: -1,
    });

/** Extension of limit type. */
export class LimitUtil {
    /**
     * Get stringed value.
     * @param {number} limit Limit type.
     * @return {string} Stringed value.
     */
    static toStr(limit = Limit.NONE) {
        switch (limit) {
            case Limit.STOP:
                return 'Stop';
            case Exchange.LIMIT:
                return 'Limit';
            default:
                return '';
        }
    }
}