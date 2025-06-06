import testSharedMethods from './test.sharedMethods.js';
function testPosition(exchange, skippedProperties, method, entry, symbol, now) {
    const format = {
        'info': {},
        'symbol': 'XYZ/USDT',
        'timestamp': 1504224000000,
        'datetime': '2017-09-01T00:00:00',
        'initialMargin': exchange.parseNumber('1.234'),
        'initialMarginPercentage': exchange.parseNumber('0.123'),
        'maintenanceMargin': exchange.parseNumber('1.234'),
        'maintenanceMarginPercentage': exchange.parseNumber('0.123'),
        'entryPrice': exchange.parseNumber('1.234'),
        'notional': exchange.parseNumber('1.234'),
        'leverage': exchange.parseNumber('1.234'),
        'unrealizedPnl': exchange.parseNumber('1.234'),
        'contracts': exchange.parseNumber('1'),
        'contractSize': exchange.parseNumber('1.234'),
        'marginRatio': exchange.parseNumber('1.234'),
        'liquidationPrice': exchange.parseNumber('1.234'),
        'markPrice': exchange.parseNumber('1.234'),
        'collateral': exchange.parseNumber('1.234'),
        'marginMode': 'cross',
        'side': 'long',
        'percentage': exchange.parseNumber('1.234'),
    };
    const emptyotAllowedFor = ['liquidationPrice', 'initialMargin', 'initialMarginPercentage', 'maintenanceMargin', 'maintenanceMarginPercentage', 'marginRatio'];
    testSharedMethods.assertStructure(exchange, skippedProperties, method, entry, format, emptyotAllowedFor);
    testSharedMethods.assertTimestampAndDatetime(exchange, skippedProperties, method, entry, now);
    testSharedMethods.assertSymbol(exchange, skippedProperties, method, entry, 'symbol', symbol);
    testSharedMethods.assertInArray(exchange, skippedProperties, method, entry, 'side', ['long', 'short']);
    testSharedMethods.assertInArray(exchange, skippedProperties, method, entry, 'marginMode', ['cross', 'isolated']);
    testSharedMethods.assertGreater(exchange, skippedProperties, method, entry, 'leverage', '0');
    testSharedMethods.assertLessOrEqual(exchange, skippedProperties, method, entry, 'leverage', '200');
    testSharedMethods.assertGreater(exchange, skippedProperties, method, entry, 'initialMargin', '0');
    testSharedMethods.assertGreater(exchange, skippedProperties, method, entry, 'initialMarginPercentage', '0');
    testSharedMethods.assertGreater(exchange, skippedProperties, method, entry, 'maintenanceMargin', '0');
    testSharedMethods.assertGreater(exchange, skippedProperties, method, entry, 'maintenanceMarginPercentage', '0');
    testSharedMethods.assertGreater(exchange, skippedProperties, method, entry, 'entryPrice', '0');
    testSharedMethods.assertGreater(exchange, skippedProperties, method, entry, 'notional', '0');
    testSharedMethods.assertGreater(exchange, skippedProperties, method, entry, 'contracts', '0');
    testSharedMethods.assertGreater(exchange, skippedProperties, method, entry, 'contractSize', '0');
    testSharedMethods.assertGreater(exchange, skippedProperties, method, entry, 'marginRatio', '0');
    testSharedMethods.assertGreater(exchange, skippedProperties, method, entry, 'liquidationPrice', '0');
    testSharedMethods.assertGreater(exchange, skippedProperties, method, entry, 'markPrice', '0');
    testSharedMethods.assertGreater(exchange, skippedProperties, method, entry, 'collateral', '0');
    // testSharedMethods.assertGreaterOrEqual (exchange, skippedProperties, method, entry, 'percentage', '0'); // percentage might be < 0
}
export default testPosition;
