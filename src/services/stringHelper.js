const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const formattedDate = (text, options = { month: 'long', year: 'numeric' }, locale = 'en-CA') => {
    return new Intl.DateTimeFormat(locale, options).format(text)
}

const preparePayload = (item) => {
    return {
        ...item,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt
    }
}

export {
    capitalizeFirstLetter,
    formattedDate,
    preparePayload
}