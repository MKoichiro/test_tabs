import { TodoType, DeadlineType, notSet } from '../providers/types/categories';
import { getFormattedDate, getFormattedTime } from './dateFormatter';
import DOMPurify from 'dompurify';
import * as marked from 'marked';

// 完了済みか確認
const checkIsCompleted = (todo: TodoType) => {
    return todo.status === 'completed';
};
// 期限切れか確認
const checkIsExpired = (todo: TodoType) => {
    const deadline = todo.deadline;
    if (!checkIsCompleted(todo) && deadline !== notSet) {
        const restoredDeadline = new Date(deadline.date);
        return Date.now() > restoredDeadline.getTime();
    }
    return false;
};
const statusCheckers = {
    checkIsCompleted,
    checkIsExpired,
};


/**
 * @summary deadline を保存用フォーマット(ISO形式のstring)へ変換
 * @discussion Sliceのインデックスの意味
 * ISO: YYYY-MM-DDTHH:mm:ss.sssZ
 * 0-9が日付, 10は区切り文字'T', 11-23が時刻
 * 0から10文字取りたいので、slice(0, 10)とする。
 */
const toSaveDeadline = (dateInput: string | undefined, timeInput: string | undefined): DeadlineType => {
    const deadlineDate: string = dateInput || new Date().toISOString().slice(0, 10);
    const deadlineTime: string = timeInput || '23:59:59.999Z';

    let deadline: DeadlineType;
    (dateInput || timeInput)
        ? deadline = { date: `${deadlineDate}T${deadlineTime}`, use_time: Boolean(timeInput) }
        : deadline = notSet;

    return deadline;
};
/**
 * @summary deadline を表示用フォーマットへ変換
 */
const toDispDeadline = (todo: TodoType) => {
    const deadline = todo.deadline;
    if (deadline === notSet) return notSet;

    const date = deadline.date;
    let displayFormat: string;
    
    deadline.use_time
        ? displayFormat = `${getFormattedDate(date)} ${getFormattedTime(date)}`     // 例: 2021/8/1 12:34
        : displayFormat = `${getFormattedDate(date)}`;                              // 例: 2021/8/1
    
    return displayFormat;
};
const DLFormatters = {
    toSaveDeadline,
    toDispDeadline,
};

// detail を HTML に挿入する際のサニタイズ処理
const getSanitizedDetail = async (todo: TodoType): Promise<string> => {
    const detail = todo.detail;
    const parsedDetail = await marked.parse(detail);
    return DOMPurify.sanitize(parsedDetail);
};

export { statusCheckers, DLFormatters, getSanitizedDetail };
