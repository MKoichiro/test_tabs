export const statusLiterals = [
	'---',
	'Not Started',
	'completed',
	'In Progress...',
	'Aborted',
	'Pending',
];
export const priorityLiterals = [
	'---',
	'Highest',
	'High',
	'Medium',
	'Low',
	'Lowest',
];

// statusLiterals, priorityLiterals から Union 型を生成
export type StatusType = typeof statusLiterals[number];
export type PriorityType = typeof priorityLiterals[number];

export type DeadlineType = { date: Date; use_time: boolean; } | '---';



/**
 * Represents a todo item.
 */
export interface TodoType {
  id: string;
	createdDate: Date;
	updatedDate: Date;
  deadline: DeadlineType;
  status: StatusType;
  priority: PriorityType;
	isArchived: boolean;
	title: string;
	detail: string;
	isOpen: boolean;
}

export interface CategoryType {
	id: string;
	isActive: boolean;
	createdDate: Date;
	updatedDate: Date;
	isArchived: boolean;
	name: string;
  // next_assigning_id: number;
	todos: TodoType[];
}