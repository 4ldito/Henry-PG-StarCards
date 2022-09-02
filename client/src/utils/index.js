export const formatDate = (date) => {
    const newDate = date.split('T');
    const time = newDate[1].split('.')[0];
    return newDate[0];
}

export const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}