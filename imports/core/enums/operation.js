'use strict';

/** Trade operation type. */
export const Operation =
    Object.freeze({
        ORDER: 0,
        CANCEL: 1,
        MODIFY: 2,
    });

/** Extension of limit type. */
export class OperationUtil {
    /** Get stringed value. */
    static toStr = (operation = Operation.ORDER) => {
        switch (operation) {
            case Operation.ORDER:
                return 'Order';
            case Operation.CANCEL:
                return 'Cancel';
            case Operation.MODIFY:
                return 'Modify';
            default:
                return '';
        }
    }
}