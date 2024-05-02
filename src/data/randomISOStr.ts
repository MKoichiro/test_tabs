// ダミーデータ生成用の関数

import { notSet } from "./types/type";


const getRandISOStr = (baseISOStr?: string) => {
    const baseDate = baseISOStr || new Date().toISOString();
    const baseDateObj = new Date(baseDate);
    const MAX_DELAY_DAYS = 365;
    const delay = Math.floor(Math.random() * 1000 * 60 * 60 * 24 * MAX_DELAY_DAYS); // MAX_DELAY_DAYS日以内のランダムなミリ秒
    baseDateObj.setTime(baseDateObj.getTime() + delay);
    const randomISOStr = baseDateObj.toISOString();

    // const randMonth = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    // const randDay = String(Math.floor(Math.random() * 31) + 1).padStart(2, '0');
    // const randHour = String(Math.floor(Math.random() * 24)).padStart(2, '0');
    // const randMinute = String(Math.floor(Math.random() * 60)).padStart(2, '0');

    // const seedISOStr = `2024-${randMonth}-${randDay}T${randHour}:${randMinute}:00.000Z`;
    // const randomISOStr = new Date(seedISOStr).toISOString(); // 4月31日などは一度Dateを作って戻せば、自動的に5月1日になる

    return randomISOStr;
};

/**
 * { createdDate, updatedDate } を返す。updatedDateはcreatedDateよりランダム日だけ後になるように生成。
 * @param categoryCreatedISOStr todoのcreatedDateとupdatedDateを生成する場合に指定。categoryのcreatedDateを指定すると、その日付よりも後の日付が生成される。
 */
const getRandDates = (baseISOStr?: string) => {
    const baseDate = baseISOStr || new Date().toISOString();
    const createdDate = getRandISOStr(baseDate);
    const updatedDateObj = new Date(createdDate);
    const MAX_DELAY_DAYS = 30;
    const delay = Math.floor(Math.random() * 1000 * 60 * 60 * 24 * MAX_DELAY_DAYS); // MAX_DELAY_DAYS日以内のランダムなミリ秒
    updatedDateObj.setTime(updatedDateObj.getTime() + delay);
    const updatedDate = updatedDateObj.toISOString();

    return { createdDate, updatedDate };
};

/**
 * { date: '2024-04-01T12:34:00.000Z', use_time: true } の形式の deadline を返す。
 * 10%の確率でnotSetを返す。
 */
const getRandDeadline = (baseISOStr: string) => {
    const randBoolNotSet = Math.random() < 0.1;
    if (randBoolNotSet) return notSet;

    const randBoolUseTime = Math.random() < 0.5;
    const baseDate = baseISOStr ? getRandISOStr(baseISOStr) : getRandISOStr();
    let deadlineDate: string;
    randBoolUseTime
        ? deadlineDate = baseDate
        : deadlineDate = new Date(baseDate).toISOString().slice(0, 10) + 'T23:59:59.999Z';
    const deadline = { date: deadlineDate, use_time: randBoolUseTime };

    return deadline;
};

const getCategoryRandDates = () => {
    return getRandDates();
}
const getTodoRandDates = (categoryCreatedISOStr: string) => {
    const { createdDate, updatedDate } = getRandDates(categoryCreatedISOStr);
    const deadline = getRandDeadline(createdDate);

    return { createdDate, updatedDate, deadline };
}


export { getCategoryRandDates, getTodoRandDates };