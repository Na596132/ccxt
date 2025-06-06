import assert from 'assert';
import Precise from '../../../base/Precise.js';
import testSharedMethods from './test.sharedMethods.js';
function testMarket(exchange, skippedProperties, method, market) {
    const format = {
        'id': 'btcusd',
        'symbol': 'BTC/USD',
        'base': 'BTC',
        'quote': 'USD',
        'taker': exchange.parseNumber('0.0011'),
        'maker': exchange.parseNumber('0.0009'),
        'baseId': 'btc',
        'quoteId': 'usd',
        'active': false,
        'type': 'spot',
        'linear': false,
        'inverse': false,
        'spot': false,
        'swap': false,
        'future': false,
        'option': false,
        'margin': false,
        'contract': false,
        'contractSize': exchange.parseNumber('0.001'),
        'expiry': 1656057600000,
        'expiryDatetime': '2022-06-24T08:00:00.000Z',
        'optionType': 'put',
        'strike': exchange.parseNumber('56000'),
        'settle': 'XYZ',
        'settleId': 'Xyz',
        'precision': {
            // todo : handle precision types after another PR is merged
            'price': exchange.parseNumber('0.001'),
            'amount': exchange.parseNumber('0.001'),
            'cost': exchange.parseNumber('0.001'), // integer or fraction
        },
        // value limits when placing orders on this market
        'limits': {
            'amount': {
                'min': exchange.parseNumber('0.01'),
                'max': exchange.parseNumber('1000'), // order amount should be < max
            },
            'price': {
                'min': exchange.parseNumber('0.01'),
                'max': exchange.parseNumber('1000'), // order price should be < max
            },
            // order cost = price * amount
            'cost': {
                'min': exchange.parseNumber('0.01'),
                'max': exchange.parseNumber('1000'), // order cost should be < max
            },
        },
        'marginModes': {
            'cross': true,
            'isolated': false,
        },
        'info': {},
    };
    // temporary: only test QUANTO markets where that prop exists (todo: add in type later)
    if ('quanto' in market) {
        format['quanto'] = false; // whether the market is QUANTO or not
    }
    // define locals
    const spot = market['spot'];
    const contract = market['contract'];
    const swap = market['swap'];
    const future = market['future'];
    const option = market['option'];
    const index = exchange.safeBool(market, 'index'); // todo: unify
    const isIndex = (index !== undefined) && index;
    const linear = market['linear'];
    const inverse = market['inverse'];
    const quanto = exchange.safeBool(market, 'quanto'); // todo: unify
    const isQuanto = (quanto !== undefined) && quanto;
    //
    const emptyAllowedFor = ['margin'];
    if (!contract) {
        emptyAllowedFor.push('contractSize');
        emptyAllowedFor.push('linear');
        emptyAllowedFor.push('inverse');
        emptyAllowedFor.push('quanto');
        emptyAllowedFor.push('settle');
        emptyAllowedFor.push('settleId');
    }
    if (!future && !option) {
        emptyAllowedFor.push('expiry');
        emptyAllowedFor.push('expiryDatetime');
    }
    if (!option) {
        emptyAllowedFor.push('optionType');
        emptyAllowedFor.push('strike');
    }
    testSharedMethods.assertStructure(exchange, skippedProperties, method, market, format, emptyAllowedFor);
    testSharedMethods.assertSymbol(exchange, skippedProperties, method, market, 'symbol');
    const logText = testSharedMethods.logTemplate(exchange, method, market);
    // check taker/maker
    // todo: check not all to be within 0-1.0
    testSharedMethods.assertGreater(exchange, skippedProperties, method, market, 'taker', '-100');
    testSharedMethods.assertLess(exchange, skippedProperties, method, market, 'taker', '100');
    testSharedMethods.assertGreater(exchange, skippedProperties, method, market, 'maker', '-100');
    testSharedMethods.assertLess(exchange, skippedProperties, method, market, 'maker', '100');
    // validate type
    const validTypes = ['spot', 'margin', 'swap', 'future', 'option', 'index', 'other'];
    testSharedMethods.assertInArray(exchange, skippedProperties, method, market, 'type', validTypes);
    // validate subTypes
    const validSubTypes = ['linear', 'inverse', 'quanto', undefined];
    testSharedMethods.assertInArray(exchange, skippedProperties, method, market, 'subType', validSubTypes);
    // check if 'type' is consistent
    const checkedTypes = ['spot', 'swap', 'future', 'option'];
    for (let i = 0; i < checkedTypes.length; i++) {
        const type = checkedTypes[i];
        if (market[type]) {
            assert(type === market['type'], 'market.type (' + market['type'] + ') not equal to "' + type + '"' + logText);
        }
    }
    // check if 'subType' is consistent
    if (swap || future) {
        const checkedSubTypes = ['linear', 'inverse'];
        for (let i = 0; i < checkedSubTypes.length; i++) {
            const subType = checkedSubTypes[i];
            if (market[subType]) {
                assert(subType === market['subType'], 'market.subType (' + market['subType'] + ') not equal to "' + subType + '"' + logText);
            }
        }
    }
    // margin check (todo: add margin as mandatory, instead of undefined)
    if (spot) {
        // for spot market, 'margin' can be either true/false or undefined
        testSharedMethods.assertInArray(exchange, skippedProperties, method, market, 'margin', [true, false, undefined]);
    }
    else {
        // otherwise, it must be false or undefined
        testSharedMethods.assertInArray(exchange, skippedProperties, method, market, 'margin', [false, undefined]);
    }
    // check mutually exclusive fields
    if (spot) {
        assert(!contract && linear === undefined && inverse === undefined && !option && !swap && !future, 'for spot market, none of contract/linear/inverse/option/swap/future should be set' + logText);
    }
    else {
        // if not spot, any of the below should be true
        assert(contract && (future || swap || option || isIndex), 'for non-spot markets, any of (future/swap/option/index) should be set' + logText);
    }
    const contractSize = exchange.safeString(market, 'contractSize');
    // contract fields
    if (contract) {
        if (isQuanto) {
            assert(linear === false, 'linear must be false when "quanto" is true' + logText);
            assert(inverse === false, 'inverse must be false when "quanto" is true' + logText);
        }
        else {
            // if false or undefined
            assert(inverse !== undefined, 'inverse must be defined when "contract" is true' + logText);
            assert(linear !== undefined, 'linear must be defined when "contract" is true' + logText);
            assert(linear !== inverse, 'linear and inverse must not be the same' + logText);
        }
        // contract size should be defined
        assert((('contractSize' in skippedProperties) || contractSize !== undefined), '"contractSize" must be defined when "contract" is true' + logText);
        // contract size should be above zero
        assert(('contractSize' in skippedProperties) || Precise.stringGt(contractSize, '0'), '"contractSize" must be > 0 when "contract" is true' + logText);
        // settle should be defined
        assert(('settle' in skippedProperties) || (market['settle'] !== undefined && market['settleId'] !== undefined), '"settle" & "settleId" must be defined when "contract" is true' + logText);
    }
    else {
        // linear & inverse needs to be undefined
        assert(linear === undefined && inverse === undefined && quanto === undefined, 'market linear and inverse (and quanto) must be undefined when "contract" is false' + logText);
        // contract size should be undefined
        assert(contractSize === undefined, '"contractSize" must be undefined when "contract" is false' + logText);
        // settle should be undefined
        assert((market['settle'] === undefined) && (market['settleId'] === undefined), '"settle" must be undefined when "contract" is false' + logText);
    }
    // future, swap and option should be mutually exclusive
    if (market['future']) {
        assert(!market['swap'] && !market['option'] && !isIndex, 'market swap and option must be false when "future" is true' + logText);
    }
    else if (market['swap']) {
        assert(!market['future'] && !market['option'], 'market future and option must be false when "swap" is true' + logText);
    }
    else if (market['option']) {
        assert(!market['future'] && !market['swap'], 'market future and swap must be false when "option" is true' + logText);
    }
    // check specific fields for options & futures
    if (option || future) {
        // future or option markets need 'expiry' and 'expiryDatetime'
        assert(market['expiry'] !== undefined, '"expiry" must be defined when "future" is true' + logText);
        assert(market['expiryDatetime'] !== undefined, '"expiryDatetime" must be defined when "future" is true' + logText);
        // expiry datetime should be correct
        const isoString = exchange.iso8601(market['expiry']);
        assert(market['expiryDatetime'] === isoString, 'expiryDatetime ("' + market['expiryDatetime'] + '") must be equal to expiry in iso8601 format "' + isoString + '"' + logText);
        testSharedMethods.assertGreater(exchange, skippedProperties, method, market, 'expiry', '0');
        if (option) {
            // strike should be defined
            assert(market['strike'] !== undefined, '"strike" must be defined when "option" is true' + logText);
            testSharedMethods.assertGreater(exchange, skippedProperties, method, market, 'strike', '0');
            // optionType should be defined
            assert(market['optionType'] !== undefined, '"optionType" must be defined when "option" is true' + logText);
            testSharedMethods.assertInArray(exchange, skippedProperties, method, market, 'optionType', ['put', 'call']);
        }
        else {
            // if not option, then strike and optionType should be undefined
            assert(market['strike'] === undefined, '"strike" must be undefined when "option" is false' + logText);
            assert(market['optionType'] === undefined, '"optionType" must be undefined when "option" is false' + logText);
        }
    }
    else {
        // otherwise, expiry needs to be undefined
        assert((market['expiry'] === undefined) && (market['expiryDatetime'] === undefined), '"expiry" and "expiryDatetime" must be undefined when it is not future|option market' + logText);
    }
    // check precisions
    const precisionKeys = Object.keys(market['precision']);
    const precisionKeysLen = precisionKeys.length;
    assert(precisionKeysLen >= 2, 'precision should have "amount" and "price" keys at least' + logText);
    for (let i = 0; i < precisionKeys.length; i++) {
        const priceOrAmountKey = precisionKeys[i];
        // only allow very high priced markets (wher coin costs around 100k) to have a 5$ price tickSize
        const isExclusivePair = market['baseId'] === 'BTC';
        const isNonSpot = !spot; // such high precision is only allowed in contract markets
        const isPrice = priceOrAmountKey === 'price';
        const isTickSize5 = Precise.stringEq('5', exchange.safeString(market['precision'], priceOrAmountKey));
        if (isNonSpot && isPrice && isExclusivePair && isTickSize5) {
            continue;
        }
        if (!('precision' in skippedProperties)) {
            testSharedMethods.checkPrecisionAccuracy(exchange, skippedProperties, method, market['precision'], priceOrAmountKey);
        }
    }
    const isInactiveMarket = market['active'] === false;
    // check limits
    const limitsKeys = Object.keys(market['limits']);
    const limitsKeysLength = limitsKeys.length;
    assert(limitsKeysLength >= 3, 'limits should have "amount", "price" and "cost" keys at least' + logText);
    for (let i = 0; i < limitsKeys.length; i++) {
        const key = limitsKeys[i];
        const limitEntry = market['limits'][key];
        if (isInactiveMarket) {
            // for inactive markets, there might be `0` for min & max values, so we skip
            continue;
        } // check limits
        if (!('limits' in skippedProperties)) {
            // min >= 0
            testSharedMethods.assertGreaterOrEqual(exchange, skippedProperties, method, limitEntry, 'min', '0');
            // max >= 0
            testSharedMethods.assertGreater(exchange, skippedProperties, method, limitEntry, 'max', '0');
            // max >= min
            const minString = exchange.safeString(limitEntry, 'min');
            if (minString !== undefined) {
                testSharedMethods.assertGreaterOrEqual(exchange, skippedProperties, method, limitEntry, 'max', minString);
            }
        }
    }
    // check currencies
    testSharedMethods.assertValidCurrencyIdAndCode(exchange, skippedProperties, method, market, market['baseId'], market['base']);
    testSharedMethods.assertValidCurrencyIdAndCode(exchange, skippedProperties, method, market, market['quoteId'], market['quote']);
    testSharedMethods.assertValidCurrencyIdAndCode(exchange, skippedProperties, method, market, market['settleId'], market['settle']);
    // check ts
    testSharedMethods.assertTimestamp(exchange, skippedProperties, method, market, undefined, 'created');
    // margin modes
    if (!('marginModes' in skippedProperties)) {
        const marginModes = exchange.safeDict(market, 'marginModes'); // in future, remove safeDict
        assert('cross' in marginModes, 'marginModes should have "cross" key' + logText);
        assert('isolated' in marginModes, 'marginModes should have "isolated" key' + logText);
        testSharedMethods.assertInArray(exchange, skippedProperties, method, marginModes, 'cross', [true, false, undefined]);
        testSharedMethods.assertInArray(exchange, skippedProperties, method, marginModes, 'isolated', [true, false, undefined]);
    }
}
export default testMarket;
