export const getFormattedDate = (date: Date) => {
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
};
export const getFormattedTime = (date: Date) => {
    return `${date.getHours()}:${date.getMinutes()}`;
};
