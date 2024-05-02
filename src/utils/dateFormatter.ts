export const getFormattedDate = (dateISO: string) => {
    const date = new Date(dateISO);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
};
export const getFormattedTime = (dateISO: string) => {
    const date = new Date(dateISO);
    return `${date.getHours()}:${date.getMinutes()}`;
};
