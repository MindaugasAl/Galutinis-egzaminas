const convertDate = (dateString) => {
    return new Date(dateString).toLocaleString('lt-LT')
}

export default convertDate