const calculateTip = (total, tipPercent = 0.25) => (total * tipPercent) + total;

const fahrenheitToCelsius = (temp) => {
    return (temp - 32) / 1.8
}

const celsiusToFahrenheit = (temp) => {
    return (temp * 1.8) + 32
}


module.exports = {
    calculateTip,
    fahrenheitToCelsius,
    celsiusToFahrenheit
}