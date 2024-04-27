import { TodoType, DeadlineType, notSet } from '../providers/types/categories';
import { getFormattedDate, getFormattedTime } from './dateFormatter';
import DOMPurify from 'dompurify';
// const marked = require('marked');
// import marked from 'marked';
import * as marked from 'marked';

// 完了済みか確認
const checkIsCompleted = (todo: TodoType) => {
  return todo.status === 'completed';
};
// 期限切れか確認
const checkIsExpired = (todo: TodoType) => {
  const deadline = todo.deadline;
  if (!checkIsCompleted(todo) && deadline !== notSet) {
    return Date.now() > deadline.date.getTime();
  }
  return false;
};
const statusCheckers = {
  checkIsCompleted,
  checkIsExpired,
};



// deadline を保存用フォーマットへ変換
const toSaveDeadline = (dateInput: Date | undefined, timeInput: Date | undefined): DeadlineType => {
  const now = new Date();
  let deadline: Date;

  if (timeInput) {

    if (dateInput) { deadline = new Date(`${ dateInput } ${ timeInput }`); } // 年月日: 有り,   時刻: 有り
    else { deadline = new Date(`${ now.toDateString() } ${ timeInput }`);  } // 年月日: 無し,   時刻: 有り
    return { date: deadline, use_time: true }

  } else  if (dateInput) {

      deadline = new Date(`${ dateInput } 23:59:59`);
      return { date: deadline, use_time: false }                             // 年月日: 有り,   時刻: 無し

  }

  return notSet;                                                             // 年月日: 無し,   時刻: 無し
};
// deadline を表示用フォーマットへ変換
const toDispDeadline = (todo: TodoType) => {
  const deadline = todo.deadline;
  if (deadline === notSet) return notSet;

  const date = deadline.date;
  if (deadline.use_time) {
    return `${getFormattedDate(date)} ${getFormattedTime(date)}`; // 例: 2021/8/1 12:34
  } else {
    return `${getFormattedDate(date)}`;                                         // 例: 2021/8/1
  }
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




export {
  statusCheckers,
  DLFormatters,
  getSanitizedDetail,
};

