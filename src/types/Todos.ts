const statusLiterals = [
	'Not Started',
	'COMPLETED',
	'In Progress...',
	'Aborted',
	'Pending',
	'not set'
] as const;
const priorityLiterals = [
	'not set',
	'Highest',
	'High',
	'Medium',
	'Low',
	'Lowest'
] as const;

// statusLiterals, priorityLiterals から Union 型を生成
export type StatusType = typeof statusLiterals[number];
export type PriorityType = typeof priorityLiterals[number];


export interface TodoType {
  id: number;
	created_date: Date;
	updated_date: Date;
  deadline: { date: Date; use_time: boolean; } | 'not set';
  expired: boolean;
	completed: boolean;
  status: StatusType;
  priority: PriorityType;
	archived: boolean;
	main: string;
	detail: string;
	open: boolean;
}
export interface TodosType {
	id: number;
	active: boolean;
	created_date: Date;
	updated_date: Date;
	archived: boolean;
	category_name: string;
  next_assigning_id: number;
	todos: TodoType[];
}