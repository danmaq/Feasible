'use strict';

/** Currency pairs. */
export const Pair =
    Object.freeze({
        EURUSD: 0,
        EURCHF: 1,
        EURGBP: 2,
        EURJPY: 3,
        EURAUD: 4,
        USDCAD: 5,
        USDCHF: 6,
        USDJPY: 7,
        USDMXN: 8,
        GBPCHF: 9,
        GBPJPY: 10,
        GBPUSD: 11,
        AUDJPY: 12,
        AUDUSD: 13,
        CHFJPY: 14,
        NZDJPY: 15,
        NZDUSD: 16,
        XAUUSD: 17,
        EURCAD: 18,
        AUDCAD: 19,
        CADJPY: 20,
        EURNZD: 21,
        GRXEUR: 22,
        NZDCAD: 23,
        SGDJPY: 24,
        USDHKD: 25,
        USDNOK: 26,
        USDTRY: 27,
        XAUAUD: 28,
        AUDCHF: 29,
        AUXAUD: 30,
        EURHUF: 31,
        EURPLN: 32,
        FRXEUR: 33,
        HKXHKD: 34,
        NZDCHF: 35,
        SPXUSD: 36,
        USDHUF: 37,
        USDPLN: 38,
        USDZAR: 39,
        XAUCHF: 40,
        ZARJPY: 41,
        BCOUSD: 42,
        ETXEUR: 43,
        EURCZK: 44,
        EURSEK: 45,
        GBPAUD: 46,
        GBPNZD: 47,
        JPXJPY: 48,
        UDXUSD: 49,
        USDCZK: 50,
        USDSEK: 51,
        WITUSD: 52,
        XAUEUR: 53,
        AUDNZD: 54,
        CADCHF: 55,
        EURDKK: 56,
        EURNOK: 57,
        EURTRY: 58,
        GBPCAD: 59,
        NSXUSD: 60,
        UKXGBP: 61,
        USDDKK: 62,
        USDSGD: 63,
        XAGUSD: 64,
        XAUGBP: 65,
        __length: 66
    });

const pairStr = Object.freeze(Object.keys(Pair));

/** Extension of currency pairs. */
export class PairUtil {
    /**
     * Get stringed value.
     * @param {number} pair Currency pair.
     * @return {string} Stringed value.
     */
    static toStr(pair = Pair.USDJPY) {
        return pair in pairStr ? pairStr[pair] : '';
    }

    /**
     * Get iterator. { key: number, value: string }
     */
    static * iterkv() {
        for (let i = 0; i < Pair.__length; i++) {
            yield { key: i, value: PairUtil.toStr(i) };
        }
    }
}