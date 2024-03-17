import React, { createContext, useReducer, useRef, useState } from 'react';
import { TodosType } from './types/Todos';
import SimpleMDE from 'easymde';


const TODOS_KEY = 'all_todos';
localStorage.getItem(TODOS_KEY);
const storedActiveIndex = 0;


const storedAllTodos: TodosType[] = [
  {
    id: 1,
		active: true,
    created_date: new Date('2024/02/24'),
    updated_date: new Date('2024/02/25'),
    archived: false,
    category_name: 'category-0',
    get next_assigning_id() { return this.todos.reduce((store, todo) => Math.max(store, todo.id), 0) + 1; },
    todos: [
      {
        id: 1,
        created_date: new Date('2024/02/26'),
        updated_date: new Date('2024/02/27'),
        deadline: 'not set',
        get expired() { return (!this.completed && this.deadline !== 'not set') && Date.now() > this.deadline.date.getTime(); },
        get completed() { return this.status === 'COMPLETED' },
        status: 'In Progress...',
        priority: 'not set',
        archived: false,
        main: '今日やること',
        detail: 'aiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこaiueoとかきくけこ',
				open: true,
      },
      {
        id: 2,
        created_date: new Date('2024/02/28'),
        updated_date: new Date('2024/02/29'),
        deadline: 'not set',
        get expired() { return (!this.completed && this.deadline !== 'not set') && Date.now() > this.deadline.date.getTime(); },
        get completed() { return this.status === 'COMPLETED' },
        status: 'Not Started',
        priority: 'not set',
        archived: false,
        main: '明日やること',
        detail: 'さしすせそとたちつてと',
				open: true,
      },
      {
        id: 3,
        created_date: new Date('2024/03/01'),
        updated_date: new Date('2024/03/02'),
        deadline: 'not set',
        get expired() { return (!this.completed && this.deadline !== 'not set') && Date.now() > this.deadline.date.getTime(); },
        get completed() { return this.status === 'COMPLETED' },
        status: 'Not Started',
        priority: 'not set',
        archived: true,
        main: '明後日やること',
        detail: 'さしすせそとたちつてと',
				open: true,
      },
      {
        id: 4,
        created_date: new Date('2024/03/01'),
        updated_date: new Date('2024/03/02'),
        deadline: 'not set',
        get expired() { return (!this.completed && this.deadline !== 'not set') && Date.now() > this.deadline.date.getTime(); },
        get completed() { return this.status === 'COMPLETED' },
        status: 'Not Started',
        priority: 'not set',
        archived: false,
        main: '明々後日やること',
        detail: 'さしすせそとたちつてと',
				open: true,
      },
      {
        id: 5,
        created_date: new Date('2024/03/01'),
        updated_date: new Date('2024/03/02'),
        deadline: {
          date: new Date('2024/02/25'),
          use_time: true,
        },
        get expired() { return (!this.completed && this.deadline !== 'not set') && Date.now() > this.deadline.date.getTime(); },
        get completed() { return this.status === 'COMPLETED' },
        status: 'In Progress...',
        priority: 'not set',
        archived: false,
        main: '昨日やる予定だったこと',
        detail: 'さしすせそとたちつてと',
				open: false,
      },
      {
        id: 6,
        created_date: new Date('2024/03/01'),
        updated_date: new Date('2024/03/02'),
        deadline: {
          date: new Date('2024/02/25'),
          use_time: false,
        },
        get expired() { return (!this.completed && this.deadline !== 'not set') && Date.now() > this.deadline.date.getTime(); },
        get completed() { return this.status === 'COMPLETED' },
        status: 'COMPLETED',
        priority: 'not set',
        archived: false,
        main: '昨日やった予定だったこと',
        detail: 'さしすせそとたちつてと',
				open: true,
      },
      {
        id: 7,
        created_date: new Date('2024/02/26'),
        updated_date: new Date('2024/02/27'),
        deadline: 'not set',
        get expired() { return (!this.completed && this.deadline !== 'not set') && Date.now() > this.deadline.date.getTime(); },
        get completed() { return this.status === 'COMPLETED' },
        status: 'Pending',
        priority: 'not set',
        archived: false,
        main: '今日やること',
        detail: '# aiueoとかきくけこ',
				open: true,
      },
    ],
  },
  {
    id: 2,
		active: false,
    created_date: new Date('2024/01/24'),
    updated_date: new Date('2024/01/25'),
    archived: false,
    category_name: 'category-1',
    get next_assigning_id() { return this.todos.reduce((store, todo) => Math.max(store, todo.id), 0) + 1; },
    todos: [
      {
        id: 1,
        created_date: new Date('2024/01/26'),
        updated_date: new Date('2024/01/27'),
        deadline: 'not set',
        get expired() { return (!this.completed && this.deadline !== 'not set') && Date.now() > this.deadline.date.getTime(); },
        get completed() { return this.status === 'COMPLETED' },
        status: 'not set',
        priority: 'not set',
        archived: false,
        main: '今日やること',
        detail: 'なにぬねのとはひふへほ',
				open: true,
      },
      {
        id: 2,
        created_date: new Date('2024/01/28'),
        updated_date: new Date('2024/01/29'),
        deadline: 'not set',
        get expired() { return (!this.completed && this.deadline !== 'not set') && Date.now() > this.deadline.date.getTime(); },
        get completed() { return this.status === 'COMPLETED' },
        status: 'not set',
        priority: 'not set',
        archived: false,
        main: '明日やること',
        detail: 'まみむめもとやいゆえよ',
				open: true,
      },
      {
        id: 3,
        created_date: new Date('2024/02/01'),
        updated_date: new Date('2024/02/02'),
        deadline: 'not set',
        get expired() { return (!this.completed && this.deadline !== 'not set') && Date.now() > this.deadline.date.getTime(); },
        get completed() { return this.status === 'COMPLETED' },
        status: 'not set',
        priority: 'not set',
        archived: true,
        main: '明後日やること',
        detail: 'らりるれろとわをん',
				open: true,
      },
    ],
  },
  {
    id: 3,
		active: false,
    created_date: new Date('2024/01/24'),
    updated_date: new Date('2024/01/25'),
    archived: false,
    category_name: 'category-2category-2category-2category-2category-2category-2category-2category-2category-2category-2',
    get next_assigning_id() { return this.todos.reduce((store, todo) => Math.max(store, todo.id), 0) + 1; },
    todos: [
      {
        id: 1,
        created_date: new Date('2024/01/26'),
        updated_date: new Date('2024/01/27'),
        deadline: 'not set',
        get expired() { return (!this.completed && this.deadline !== 'not set') && Date.now() > this.deadline.date.getTime(); },
        get completed() { return this.status === 'COMPLETED' },
        status: 'not set',
        priority: 'not set',
        archived: false,
        main: '今日やること',
        detail: 'なにぬねのとはひふへほ',
				open: true,
      },
      {
        id: 2,
        created_date: new Date('2024/01/28'),
        updated_date: new Date('2024/01/29'),
        deadline: 'not set',
        get expired() { return (!this.completed && this.deadline !== 'not set') && Date.now() > this.deadline.date.getTime(); },
        get completed() { return this.status === 'COMPLETED' },
        status: 'not set',
        priority: 'not set',
        archived: false,
        main: '明日やること',
        detail: 'まみむめもとやいゆえよ',
				open: true,
      },
      {
        id: 3,
        created_date: new Date('2024/02/01'),
        updated_date: new Date('2024/02/02'),
        deadline: 'not set',
        get expired() { return (!this.completed && this.deadline !== 'not set') && Date.now() > this.deadline.date.getTime(); },
        get completed() { return this.status === 'COMPLETED' },
        status: 'not set',
        priority: 'not set',
        archived: true,
        main: '明後日やること',
        detail: 'らりるれろとわをん',
				open: true,
      },
    ],
  },
  {
    id: 4,
		active: false,
    created_date: new Date('2024/01/24'),
    updated_date: new Date('2024/01/25'),
    archived: false,
    category_name: 'category-3',
    get next_assigning_id() { return this.todos.reduce((store, todo) => Math.max(store, todo.id), 0) + 1; },
    todos: [
      {
        id: 1,
        created_date: new Date('2024/01/26'),
        updated_date: new Date('2024/01/27'),
        deadline: 'not set',
        get expired() { return (!this.completed && this.deadline !== 'not set') && Date.now() > this.deadline.date.getTime(); },
        get completed() { return this.status === 'COMPLETED' },
        status: 'not set',
        priority: 'not set',
        archived: false,
        main: '今日やること',
        detail: 'なにぬねのとはひふへほ',
				open: true,
      },
      {
        id: 2,
        created_date: new Date('2024/01/28'),
        updated_date: new Date('2024/01/29'),
        deadline: 'not set',
        get expired() { return (!this.completed && this.deadline !== 'not set') && Date.now() > this.deadline.date.getTime(); },
        get completed() { return this.status === 'COMPLETED' },
        status: 'not set',
        priority: 'not set',
        archived: false,
        main: '明日やること',
        detail: 'まみむめもとやいゆえよ',
				open: true,
      },
      {
        id: 3,
        created_date: new Date('2024/02/01'),
        updated_date: new Date('2024/02/02'),
        deadline: 'not set',
        get expired() { return (!this.completed && this.deadline !== 'not set') && Date.now() > this.deadline.date.getTime(); },
        get completed() { return this.status === 'COMPLETED' },
        status: 'not set',
        priority: 'not set',
        archived: true,
        main: '明後日やること',
        detail: 'らりるれろとわをん',
				open: true,
      },
    ],
  },
	{
    id: 5,
		active: false,
    created_date: new Date('2024/01/24'),
    updated_date: new Date('2024/01/25'),
    archived: false,
    category_name: 'category-4',
    get next_assigning_id() { return this.todos.reduce((store, todo) => Math.max(store, todo.id), 0) + 1; },
    todos: [
      {
        id: 1,
        created_date: new Date('2024/01/26'),
        updated_date: new Date('2024/01/27'),
        deadline: 'not set',
        get expired() { return (!this.completed && this.deadline !== 'not set') && Date.now() > this.deadline.date.getTime(); },
        get completed() { return this.status === 'COMPLETED' },
        status: 'not set',
        priority: 'not set',
        archived: false,
        main: '今日やること',
        detail: 'なにぬねのとはひふへほ',
				open: true,
      },
      {
        id: 2,
        created_date: new Date('2024/01/28'),
        updated_date: new Date('2024/01/29'),
        deadline: 'not set',
        get expired() { return (!this.completed && this.deadline !== 'not set') && Date.now() > this.deadline.date.getTime(); },
        get completed() { return this.status === 'COMPLETED' },
        status: 'not set',
        priority: 'not set',
        archived: false,
        main: '明日やること',
        detail: 'まみむめもとやいゆえよ',
				open: true,
      },
      {
        id: 3,
        created_date: new Date('2024/02/01'),
        updated_date: new Date('2024/02/02'),
        deadline: 'not set',
        get expired() { return (!this.completed && this.deadline !== 'not set') && Date.now() > this.deadline.date.getTime(); },
        get completed() { return this.status === 'COMPLETED' },
        status: 'not set',
        priority: 'not set',
        archived: true,
        main: '明後日やること',
        detail: 'らりるれろとわをん',
				open: true,
      },
    ],
  },
	{
    id: 6,
		active: false,
    created_date: new Date('2024/01/24'),
    updated_date: new Date('2024/01/25'),
    archived: false,
    category_name: 'category-5',
    get next_assigning_id() { return this.todos.reduce((store, todo) => Math.max(store, todo.id), 0) + 1; },
    todos: [
      {
        id: 1,
        created_date: new Date('2024/01/26'),
        updated_date: new Date('2024/01/27'),
        deadline: 'not set',
        get expired() { return (!this.completed && this.deadline !== 'not set') && Date.now() > this.deadline.date.getTime(); },
        get completed() { return this.status === 'COMPLETED' },
        status: 'not set',
        priority: 'not set',
        archived: false,
        main: '今日やること',
        detail: 'なにぬねのとはひふへほ',
				open: true,
      },
      {
        id: 2,
        created_date: new Date('2024/01/28'),
        updated_date: new Date('2024/01/29'),
        deadline: 'not set',
        get expired() { return (!this.completed && this.deadline !== 'not set') && Date.now() > this.deadline.date.getTime(); },
        get completed() { return this.status === 'COMPLETED' },
        status: 'not set',
        priority: 'not set',
        archived: false,
        main: '明日やること',
        detail: 'まみむめもとやいゆえよ',
				open: true,
      },
      {
        id: 3,
        created_date: new Date('2024/02/01'),
        updated_date: new Date('2024/02/02'),
        deadline: 'not set',
        get expired() { return (!this.completed && this.deadline !== 'not set') && Date.now() > this.deadline.date.getTime(); },
        get completed() { return this.status === 'COMPLETED' },
        status: 'not set',
        priority: 'not set',
        archived: true,
        main: '明後日やること',
        detail: 'らりるれろとわをん',
				open: true,
      },
    ],
  },
	{
    id: 7,
		active: false,
    created_date: new Date('2024/01/24'),
    updated_date: new Date('2024/01/25'),
    archived: false,
    category_name: 'category-6',
    get next_assigning_id() { return this.todos.reduce((store, todo) => Math.max(store, todo.id), 0) + 1; },
    todos: [
      {
        id: 1,
        created_date: new Date('2024/01/26'),
        updated_date: new Date('2024/01/27'),
        deadline: 'not set',
        get expired() { return (!this.completed && this.deadline !== 'not set') && Date.now() > this.deadline.date.getTime(); },
        get completed() { return this.status === 'COMPLETED' },
        status: 'not set',
        priority: 'not set',
        archived: false,
        main: '今日やること',
        detail: 'なにぬねのとはひふへほ',
				open: true,
      },
      {
        id: 2,
        created_date: new Date('2024/01/28'),
        updated_date: new Date('2024/01/29'),
        deadline: 'not set',
        get expired() { return (!this.completed && this.deadline !== 'not set') && Date.now() > this.deadline.date.getTime(); },
        get completed() { return this.status === 'COMPLETED' },
        status: 'not set',
        priority: 'not set',
        archived: false,
        main: '明日やること',
        detail: 'まみむめもとやいゆえよ',
				open: true,
      },
      {
        id: 3,
        created_date: new Date('2024/02/01'),
        updated_date: new Date('2024/02/02'),
        deadline: 'not set',
        get expired() { return (!this.completed && this.deadline !== 'not set') && Date.now() > this.deadline.date.getTime(); },
        get completed() { return this.status === 'COMPLETED' },
        status: 'not set',
        priority: 'not set',
        archived: true,
        main: '明後日やること',
        detail: 'らりるれろとわをん',
				open: true,
      },
    ],
  },
	{
    id: 8,
		active: false,
    created_date: new Date('2024/01/24'),
    updated_date: new Date('2024/01/25'),
    archived: false,
    category_name: 'category-7',
    get next_assigning_id() { return this.todos.reduce((store, todo) => Math.max(store, todo.id), 0) + 1; },
    todos: [
      {
        id: 1,
        created_date: new Date('2024/01/26'),
        updated_date: new Date('2024/01/27'),
        deadline: 'not set',
        get expired() { return (!this.completed && this.deadline !== 'not set') && Date.now() > this.deadline.date.getTime(); },
        get completed() { return this.status === 'COMPLETED' },
        status: 'not set',
        priority: 'not set',
        archived: false,
        main: '今日やること',
        detail: 'なにぬねのとはひふへほ',
				open: true,
      },
      {
        id: 2,
        created_date: new Date('2024/01/28'),
        updated_date: new Date('2024/01/29'),
        deadline: 'not set',
        get expired() { return (!this.completed && this.deadline !== 'not set') && Date.now() > this.deadline.date.getTime(); },
        get completed() { return this.status === 'COMPLETED' },
        status: 'not set',
        priority: 'not set',
        archived: false,
        main: '明日やること',
        detail: 'まみむめもとやいゆえよ',
				open: true,
      },
      {
        id: 3,
        created_date: new Date('2024/02/01'),
        updated_date: new Date('2024/02/02'),
        deadline: 'not set',
        get expired() { return (!this.completed && this.deadline !== 'not set') && Date.now() > this.deadline.date.getTime(); },
        get completed() { return this.status === 'COMPLETED' },
        status: 'not set',
        priority: 'not set',
        archived: true,
        main: '明後日やること',
        detail: 'らりるれろとわをん',
				open: true,
      },
    ],
  },
	{
    id: 9,
		active: false,
    created_date: new Date('2024/01/24'),
    updated_date: new Date('2024/01/25'),
    archived: false,
    category_name: 'category-8',
    get next_assigning_id() { return this.todos.reduce((store, todo) => Math.max(store, todo.id), 0) + 1; },
    todos: [
      {
        id: 1,
        created_date: new Date('2024/01/26'),
        updated_date: new Date('2024/01/27'),
        deadline: 'not set',
        get expired() { return (!this.completed && this.deadline !== 'not set') && Date.now() > this.deadline.date.getTime(); },
        get completed() { return this.status === 'COMPLETED' },
        status: 'not set',
        priority: 'not set',
        archived: false,
        main: '今日やること',
        detail: 'なにぬねのとはひふへほ',
				open: true,
      },
      {
        id: 2,
        created_date: new Date('2024/01/28'),
        updated_date: new Date('2024/01/29'),
        deadline: 'not set',
        get expired() { return (!this.completed && this.deadline !== 'not set') && Date.now() > this.deadline.date.getTime(); },
        get completed() { return this.status === 'COMPLETED' },
        status: 'not set',
        priority: 'not set',
        archived: false,
        main: '明日やること',
        detail: 'まみむめもとやいゆえよ',
				open: true,
      },
      {
        id: 3,
        created_date: new Date('2024/02/01'),
        updated_date: new Date('2024/02/02'),
        deadline: 'not set',
        get expired() { return (!this.completed && this.deadline !== 'not set') && Date.now() > this.deadline.date.getTime(); },
        get completed() { return this.status === 'COMPLETED' },
        status: 'not set',
        priority: 'not set',
        archived: true,
        main: '明後日やること',
        detail: 'らりるれろとわをん',
				open: true,
      },
    ],
  },
];



// Context
interface AllTodosAdminContextType {
  activeIndex: number;
  allTodos: TodosType[];
  dispatchAllTodosChange: React.Dispatch<ActionType>;
}
const AllTodosAdminContext = createContext<AllTodosAdminContextType>({
  activeIndex: storedActiveIndex,
  allTodos: storedAllTodos,
  dispatchAllTodosChange: () => {},
});


// reducer
type StateType = {
  activeIndex: number;
  allTodos: TodosType[];
}
type ActionType =
  | {
    type: 'switch_tab';
    newActiveIndex: number;
  }
  | {
    type: 'update_all_todos';
    newAllTodos: TodosType[];
  }
  | {
    type: 'test';
    arg1: string;
    arg2: number;
  };
const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case 'switch_tab':
      {
        const newAllTodos = state.allTodos.map((todos, i) => {
          todos.active = false;
          i === action.newActiveIndex && (todos.active = true);
          return todos;
        });
        const newState = {...state, activeIndex: action.newActiveIndex, allTodos: newAllTodos};
        return newState;
      }
    case 'update_all_todos':
      {
        const newState = {...state, allTodos: action.newAllTodos};
        return newState;
      }
    case 'test':
      return state;
  }
};


// Provider
const initialState: StateType = {
  activeIndex: storedActiveIndex,
  allTodos: storedAllTodos,
}
const AllTodosAdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AllTodosAdminContext.Provider value={{ ...state, dispatchAllTodosChange: dispatch }} > 
      { children }
    </AllTodosAdminContext.Provider>
  );
};


// Context
interface MdeAdminContextType {
  mdeRef: React.MutableRefObject<any> | null;
  modalRef: React.MutableRefObject<HTMLDivElement | null> | null;
  maskRef: React.MutableRefObject<HTMLDivElement | null> | null;
  inEditing: boolean;
  setInEditing: (inEditing: boolean) => void;
  targetTodoIdx: number;
  setTargetTodoIdx: (idx: number) => void;
  handleModalClose: () => void;
  updateEditorOverflow: () => void;
}
export const MdeAdminContext = createContext<MdeAdminContextType>({
  mdeRef: null,
  modalRef: null,
  maskRef: null,
  inEditing: false,
  setInEditing: () => {},
  targetTodoIdx: 0,
  setTargetTodoIdx: () => {},
  handleModalClose: () => {},
  updateEditorOverflow: () => {},
});

export const MdeAdminProvider = ({ children }: { children: React.ReactNode }) => {
  const mdeRef = useRef<any>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const maskRef = useRef<HTMLDivElement | null>(null);
  const [inEditing, setInEditing] = useState(false);
  const [targetTodoIdx, setTargetTodoIdx] = useState<number>(0);

  const preventScroll = (e: MouseEvent) => e.preventDefault();
  const reviveScroll = (e: WheelEvent) => e.stopPropagation();

  const getCodemirror = () => mdeRef?.current.codemirror.display.wrapper;
  const handleModalClose = () => {
    // close mde modal: net process
    setInEditing(false);
    maskRef.current?.removeEventListener('wheel', preventScroll);
    modalRef.current?.removeEventListener('wheel', preventScroll);
    getCodemirror().removeEventListener('wheel', reviveScroll);
  };

  const updateEditorOverflow = () => {
    const editorHeight = mdeRef?.current.codemirror.getScrollInfo().height;
    const maxHeight    = innerHeight * 35 / 100;
    const diff         = editorHeight - maxHeight;
    const newOverflow  = Boolean(Math.abs(diff) > 3);

    const codemirrorDiv = mdeRef?.current.codemirror.display.wrapper;
    if (newOverflow) {
      codemirrorDiv.addEventListener('wheel', reviveScroll, { passive: false });
    }
    if (inEditing === false) { return }
    maskRef.current?.addEventListener('wheel', preventScroll, { passive: false });
    modalRef.current?.addEventListener('wheel', preventScroll, { passive: false });
  };


  const value = {
    mdeRef,
    modalRef,
    maskRef,
    inEditing,
    setInEditing,
    targetTodoIdx,
    setTargetTodoIdx,
    handleModalClose,
    updateEditorOverflow,
  };

  return <MdeAdminContext.Provider value={value}>{children}</MdeAdminContext.Provider>
}


export default AllTodosAdminProvider;
export { AllTodosAdminContext };


interface ContentWidthType {
  pc: number;
  tb: number;
  sp: number;
}
export const $contentWidth: ContentWidthType = {
  pc: 70,
  tb: 70,
  sp: 90,
};

export const getPx = ($contentWidth: ContentWidthType) => {
  switch (true) {
    case (1024 < innerWidth):
      return innerWidth * ($contentWidth.pc / 100);
    case (600 < innerWidth && innerWidth <= 1024):
      return innerWidth * ($contentWidth.tb / 100);
    case (innerWidth <= 600):
      return innerWidth * ($contentWidth.pc / 100);

    default: return new Error('getPx()で予期せぬエラー');
  }
};