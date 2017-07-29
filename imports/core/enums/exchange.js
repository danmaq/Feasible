'use strict';

/** Exchange type. */
export const Exchange =
    Object.freeze({
        BUY: 1,
        SELL: -1,
    });

/** Key and value of exchange type. */
export const ExchangeKV =
    Object.freeze(
        [
            { key: Exchange.BUY, value: "Buy" },
            { key: Exchange.SELL, value: "Sell" },
        ]);

/** Extension of Exchange type. */
export class ExchangeUtil {
    /**
     * Get stringed value.
     * @param {number} exchange Exchange type.
     * @return {string} Stringed value.
     */
    static toStr(exchange = Exchange.BUY) {
        switch (exchange) {
            case Exchange.BUY:
                return 'Buy';
            case Exchange.SELL:
                return 'Sell';
            default:
                return '';
        }
    }
}