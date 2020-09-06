const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit } = require('./../src/math');

test('shoulc calculate total with tip', () => {
    expect(calculateTip(10, .3)).toBe(13);
});

test('should calculate total with the default tip', () => {
    expect(calculateTip(10)).toBe(12.5);
});

test('Should convert 32 F to 0 C', () => {
    expect(fahrenheitToCelsius(32)).toBe(0);
});

test('Should convert 0 C to 32 F', () => {
    expect(celsiusToFahrenheit(0)).toBe(32);
});