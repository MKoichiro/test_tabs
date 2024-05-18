type NotSetType = '---';
export const notSet: NotSetType = '---';

export const statusLiterals = [notSet, 'Not Started', 'completed', 'In Progress...', 'Aborted', 'Pending'] as const;
export const priorityLiterals = [notSet, 'Highest', 'High', 'Medium', 'Low', 'Lowest'] as const;
export type StatusLiteralsType = typeof statusLiterals;
export type PriorityLiteralsType = typeof priorityLiterals;

// statusLiterals, priorityLiterals から Union 型を生成
export type StatusUnionType = (typeof statusLiterals)[number];
export type PriorityUnionType = (typeof priorityLiterals)[number];

export type DeadlineType = { date: string; use_time: boolean } | NotSetType;

interface CommonType {
    id: string;
    createdDate: string;
    updatedDate: string;
    isArchived: boolean;
}

export interface TodoType extends CommonType {
    deadline: DeadlineType;
    status: StatusUnionType;
    priority: PriorityUnionType;
    title: string;
    detail: string;
    isOpen: boolean;
}

export interface CategoryType extends CommonType {
    name: string;
    todos: TodoType[];
}

// export interface TodoType {
//     id: string;
//     createdDate: string;
//     updatedDate: string;
//     deadline: DeadlineType;
//     status: StatusUnionType;
//     priority: PriorityUnionType;
//     isArchived: boolean;
//     title: string;
//     detail: string;
//     isOpen: boolean;
// }

// export interface CategoryType {
//     id: string;
//     createdDate: string;
//     updatedDate: string;
//     isArchived: boolean;
//     name: string;
//     todos: TodoType[];
// }
