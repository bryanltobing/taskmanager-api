const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add } = require('./../src/math');

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

// test('Async test demo', (done) => {
//     setTimeout(() => {
//         expect(1).toBe(2);
//         done();
//     }, 2000);
// });

test('Should add to number', (done) => {
    add(2,3).then((sum) => {
        expect(sum).toBe(5);
        done();
    });
});

test('Should add to number async await', async() => {
    const result = await add(10,22);
    expect(result).toBe(32);
});