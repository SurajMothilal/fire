import { fireTypes } from "../constants"

const calculateSavingsRatePercentage = (cash, investment) => {
    return `${(cash + investment)}%`
}

const calculateTargetNetworths = (targetYearlyExpenses, targetYear, currentYear, yearOfBirth) => {
    const endAge = 95
    const currentAge = currentYear - yearOfBirth
    const ageAtRetirement = currentAge + (targetYear - currentYear)
    const yearsForInvestmentToLast = endAge - ageAtRetirement
    const totalExpensesInRetirement = targetYearlyExpenses * yearsForInvestmentToLast

    return {
        [fireTypes.fat]: ageAtRetirement > 64 ? targetYearlyExpenses * 50 : targetYearlyExpenses * 58,
        [fireTypes.lean]: ageAtRetirement > 64 ? targetYearlyExpenses * 25 : targetYearlyExpenses * 32,
        [fireTypes.traditional]: ageAtRetirement > 64 ? targetYearlyExpenses * 33 : targetYearlyExpenses * 40
    }
}

export {
    calculateSavingsRatePercentage,
    calculateTargetNetworths
}