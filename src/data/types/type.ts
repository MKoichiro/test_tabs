// 未設定データの表示形式を定義
export type NotSetType = '---';
export const notSet: NotSetType = '---';

// statusTranslations: 'status' の言語別表示形式
const langsLiterals = ['ja', 'en'] as const;
export type LangsType = (typeof langsLiterals)[number];
const statusTranslationsJa: Record<string, string> = {
    notSet: notSet,
    notStarted: '未着手',
    completed: '完了',
    inProgress: '進行中',
    aborted: '中止',
    pending: '保留',
};
const statusTranslationsEn: Record<string, string> = {
    notSet: notSet,
    notStarted: 'Not Started',
    completed: 'Completed',
    inProgress: 'In Progress...',
    aborted: 'Aborted',
    pending: 'Pending',
};
const statusTranslations: Record<LangsType, Record<string, string>> = {
    ja: statusTranslationsJa,
    en: statusTranslationsEn,
};

// priorityFormats: 'priority' の表示形式
const priorityFormatLiterals = ['words', 'num', 'color'] as const;
type PriorityFormatType = (typeof priorityFormatLiterals)[number];
const priorityFormatWords: Record<string, string> = {
    notSet: notSet,
    first: 'Heighest',
    second: 'High',
    third: 'Medium',
    fourth: 'Low',
    fifth: 'Lowest',
};
const priorityFormatNum: Record<string, string> = {
    notSet: notSet,
    first: '1',
    second: '2',
    third: '3',
    fourth: '4',
    fifth: '5',
};
const priorityFormatColor: Record<string, string> = {
    notSet: 'grey',
    first: '#ff0000',
    second: '#ff8000',
    third: '#ffff00',
    fourth: '#00ff00',
    fifth: '#0000ff',
};

export const priorityFormats: Record<PriorityFormatType, Record<string, string>> = {
    words: priorityFormatWords,
    num: priorityFormatNum,
    color: priorityFormatColor,
};

// statusTranslations, priorityFormats の key から Union 型を生成
export type StatusType = keyof typeof statusTranslationsJa;
export type PriorityType = keyof typeof priorityFormatWords;

// DeadlineType: deadline の型
export type DeadlineType = NotSetType | { date: Date; use_time: boolean };
