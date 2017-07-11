'use strict';

/** Exchange type. */
export const Exchange =
    Object.freeze({
        BUY: 1,
        SELL: -1,
    });

export const ExchangeKV =
    Object.freeze(
        [
            { key: Exchange.BUY, value: "Buy" },
            { key: Exchange.SELL, value: "Sell" },
        ]);