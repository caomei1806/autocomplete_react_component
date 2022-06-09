const normalizeStringValue = (value) => {
    const newValue = value.split(' ').join('').toLowerCase()
    return newValue
}
export default normalizeStringValue