const calculateSavingsRatePercentage = (cash, investment, debt) => {
    return `${(100 * (cash + investment)) / debt}%`
}

export {
    calculateSavingsRatePercentage
}