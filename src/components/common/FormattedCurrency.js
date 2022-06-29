import React from 'react'
import Text from './Text'
import numbro from 'numbro'

const FormattedCurrency = ({ style, value }) => {
    const setAverage = value > 10000 || value < -10000
    return (
        <Text style={style} title={numbro(value).formatCurrency({
            mantissa: 2,
            ...( setAverage && { average: true }),
        })} />
    )
}

export default FormattedCurrency