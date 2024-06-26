import { CategoryType } from '../providers/types/categories';
import { generateUUID } from '../utils/generateUUID';
import { getRandTnD } from './randomTnD';
import { getCategoryRandDates, getTodoRandDates } from './randomISOStr';

const TODOS_KEY = 'categories';
localStorage.getItem(TODOS_KEY);
export const storedActiveIdx = 0;

const categoriesRandDates = new Array(11).fill(null).map(() => getCategoryRandDates());

export const storedCategories: CategoryType[] = [
    {
        id: generateUUID(),
        // spread例: createdDate: '2024-12-01T12:26:00.000Z',
        // spread例: updatedDate: '2024-12-21T05:31:00.000Z',
        ...categoriesRandDates[0],
        isArchived: false,
        name: 'category-0',
        todos: [
            {
                id: generateUUID(),
                // spread例: createdDate: '2024-12-01T12:26:00.000Z',
                // spread例: updatedDate: '2024-12-21T05:31:00.000Z',
                // spread例: deadline: { date: '2024-12-10T13:00:00.000Z', use_time: true }, // updatedDateより後であることは保証しない。これにより、isExpiredの判定が自然になる。
                ...getTodoRandDates(categoriesRandDates[0].createdDate),
                status: 'In Progress...',
                priority: '---',
                isArchived: false,
                // spread例: title: '今日やること',
                // spread例: detail: 'なにぬねのとはひふへほ',
                ...getRandTnD(),
                isOpen: true,
            },
            {
                id: generateUUID(),
                ...getTodoRandDates(categoriesRandDates[0].createdDate),
                status: 'Not Started',
                priority: '---',
                isArchived: true,
                ...getRandTnD(),
                isOpen: true,
            },
            {
                id: generateUUID(),
                ...getTodoRandDates(categoriesRandDates[0].createdDate),
                status: 'Not Started',
                priority: '---',
                isArchived: true,
                ...getRandTnD(),
                isOpen: true,
            },
            {
                id: generateUUID(),
                ...getTodoRandDates(categoriesRandDates[0].createdDate),
                status: 'Not Started',
                priority: '---',
                isArchived: true,
                ...getRandTnD(),
                isOpen: true,
            },
            {
                id: generateUUID(),
                ...getTodoRandDates(categoriesRandDates[0].createdDate),
                status: 'In Progress...',
                priority: '---',
                isArchived: false,
                ...getRandTnD(),
                isOpen: false,
            },
            {
                id: generateUUID(),
                ...getTodoRandDates(categoriesRandDates[0].createdDate),
                status: 'completed',
                priority: '---',
                isArchived: false,
                ...getRandTnD(),
                isOpen: true,
            },
            {
                id: generateUUID(),
                ...getTodoRandDates(categoriesRandDates[0].createdDate),
                status: 'Pending',
                priority: '---',
                isArchived: false,
                ...getRandTnD(),
                isOpen: true,
            },
        ],
    },
    {
        id: generateUUID(),
        ...categoriesRandDates[1],
        isArchived: false,
        name: 'category-1',
        todos: [
            {
                id: generateUUID(),
                ...getTodoRandDates(categoriesRandDates[1].createdDate),
                status: '---',
                priority: '---',
                isArchived: false,
                ...getRandTnD(),
                isOpen: true,
            },
            {
                id: generateUUID(),
                ...getTodoRandDates(categoriesRandDates[1].createdDate),
                status: '---',
                priority: '---',
                isArchived: false,
                ...getRandTnD(),
                isOpen: true,
            },
            {
                id: generateUUID(),
                ...getTodoRandDates(categoriesRandDates[1].createdDate),
                status: '---',
                priority: '---',
                isArchived: true,
                ...getRandTnD(),
                isOpen: true,
            },
        ],
    },
    {
        id: generateUUID(),
        ...categoriesRandDates[2],
        isArchived: false,
        name: 'category-2 category-2 category-2 category-2 category-2 category-2 category-2 category-2 category-2 category-2 category-2 category-2 category-2 category-2 category-2 category-2 category-2 category-2 category-2 category-2 ',
        todos: [
            {
                id: generateUUID(),
                ...getTodoRandDates(categoriesRandDates[2].createdDate),
                status: '---',
                priority: '---',
                isArchived: false,
                ...getRandTnD(),
                isOpen: true,
            },
            {
                id: generateUUID(),
                ...getTodoRandDates(categoriesRandDates[2].createdDate),
                status: '---',
                priority: '---',
                isArchived: false,
                ...getRandTnD(),
                isOpen: true,
            },
            {
                id: generateUUID(),
                ...getTodoRandDates(categoriesRandDates[2].createdDate),
                status: '---',
                priority: '---',
                isArchived: true,
                ...getRandTnD(),
                isOpen: true,
            },
        ],
    },
    {
        id: generateUUID(),
        ...categoriesRandDates[3],
        isArchived: false,
        name: 'category-3',
        todos: [
            {
                id: generateUUID(),
                ...getTodoRandDates(categoriesRandDates[3].createdDate),
                status: '---',
                priority: '---',
                isArchived: false,
                ...getRandTnD(),
                isOpen: true,
            },
            {
                id: generateUUID(),
                ...getTodoRandDates(categoriesRandDates[3].createdDate),
                status: '---',
                priority: '---',
                isArchived: false,
                ...getRandTnD(),
                isOpen: true,
            },
            {
                id: generateUUID(),
                ...getTodoRandDates(categoriesRandDates[3].createdDate),
                status: '---',
                priority: '---',
                isArchived: true,
                ...getRandTnD(),
                isOpen: true,
            },
        ],
    },
    {
        id: generateUUID(),
        ...categoriesRandDates[4],
        isArchived: true,
        name: 'category-4',
        todos: [
            {
                id: generateUUID(),
                ...getTodoRandDates(categoriesRandDates[4].createdDate),
                status: '---',
                priority: '---',
                isArchived: false,
                ...getRandTnD(),
                isOpen: true,
            },
            {
                id: generateUUID(),
                ...getTodoRandDates(categoriesRandDates[4].createdDate),
                status: '---',
                priority: '---',
                isArchived: false,
                ...getRandTnD(),
                isOpen: true,
            },
            {
                id: generateUUID(),
                ...getTodoRandDates(categoriesRandDates[4].createdDate),
                status: '---',
                priority: '---',
                isArchived: true,
                ...getRandTnD(),
                isOpen: true,
            },
        ],
    },
    {
        id: generateUUID(),
        ...categoriesRandDates[5],
        isArchived: false,
        name: 'category-5',
        todos: [
            {
                id: generateUUID(),
                ...getTodoRandDates(categoriesRandDates[5].createdDate),
                status: '---',
                priority: '---',
                isArchived: false,
                ...getRandTnD(),
                isOpen: true,
            },
            {
                id: generateUUID(),
                ...getTodoRandDates(categoriesRandDates[5].createdDate),
                status: '---',
                priority: '---',
                isArchived: false,
                ...getRandTnD(),
                isOpen: true,
            },
            {
                id: generateUUID(),
                ...getTodoRandDates(categoriesRandDates[5].createdDate),
                status: '---',
                priority: '---',
                isArchived: true,
                ...getRandTnD(),
                isOpen: true,
            },
        ],
    },
    {
        id: generateUUID(),
        ...categoriesRandDates[6],
        isArchived: true,
        name: 'category-6',
        todos: [
            {
                id: generateUUID(),
                ...getTodoRandDates(categoriesRandDates[6].createdDate),
                status: '---',
                priority: '---',
                isArchived: false,
                ...getRandTnD(),
                isOpen: true,
            },
            {
                id: generateUUID(),
                ...getTodoRandDates(categoriesRandDates[6].createdDate),
                status: '---',
                priority: '---',
                isArchived: false,
                ...getRandTnD(),
                isOpen: true,
            },
            {
                id: generateUUID(),
                ...getTodoRandDates(categoriesRandDates[7].createdDate),
                status: '---',
                priority: '---',
                isArchived: true,
                ...getRandTnD(),
                isOpen: true,
            },
        ],
    },
    {
        id: generateUUID(),
        ...categoriesRandDates[7],
        isArchived: true,
        name: 'category-7',
        todos: [
            {
                id: generateUUID(),
                ...getTodoRandDates(categoriesRandDates[7].createdDate),
                status: '---',
                priority: '---',
                isArchived: false,
                ...getRandTnD(),
                isOpen: true,
            },
            {
                id: generateUUID(),
                ...getTodoRandDates(categoriesRandDates[7].createdDate),
                status: '---',
                priority: '---',
                isArchived: false,
                ...getRandTnD(),
                isOpen: true,
            },
            {
                id: generateUUID(),
                ...getTodoRandDates(categoriesRandDates[7].createdDate),
                status: '---',
                priority: '---',
                isArchived: true,
                ...getRandTnD(),
                isOpen: true,
            },
        ],
    },
    {
        id: generateUUID(),
        ...categoriesRandDates[8],
        isArchived: false,
        name: 'category-8',
        todos: [
            {
                id: generateUUID(),
                ...getTodoRandDates(categoriesRandDates[8].createdDate),
                status: '---',
                priority: '---',
                isArchived: false,
                ...getRandTnD(),
                isOpen: true,
            },
            {
                id: generateUUID(),
                ...getTodoRandDates(categoriesRandDates[8].createdDate),
                status: '---',
                priority: '---',
                isArchived: false,
                ...getRandTnD(),
                isOpen: true,
            },
            {
                id: generateUUID(),
                ...getTodoRandDates(categoriesRandDates[8].createdDate),
                status: '---',
                priority: '---',
                isArchived: true,
                ...getRandTnD(),
                isOpen: true,
            },
        ],
    },
    {
        id: generateUUID(),
        ...categoriesRandDates[9],
        isArchived: false,
        name: '99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999',
        todos: [
            {
                id: generateUUID(),
                ...getTodoRandDates(categoriesRandDates[9].createdDate),
                status: '---',
                priority: '---',
                isArchived: false,
                title: '今日やること',
                detail: 'なにぬねのとはひふへほ',
                isOpen: true,
            },
            {
                id: generateUUID(),
                ...getTodoRandDates(categoriesRandDates[9].createdDate),
                status: '---',
                priority: '---',
                isArchived: false,
                ...getRandTnD(),
                isOpen: true,
            },
            {
                id: generateUUID(),
                ...getTodoRandDates(categoriesRandDates[9].createdDate),
                status: '---',
                priority: '---',
                isArchived: true,
                title: '明後日やること',
                detail: 'らりるれろとわをん',
                isOpen: true,
            },
        ],
    },
    {
        id: generateUUID(),
        ...categoriesRandDates[10],
        isArchived: false,
        name: 'category-10',
        todos: [
            {
                id: generateUUID(),
                ...getTodoRandDates(categoriesRandDates[10].createdDate),
                status: '---',
                priority: '---',
                isArchived: false,
                ...getRandTnD(),
                isOpen: true,
            },
            {
                id: generateUUID(),
                ...getTodoRandDates(categoriesRandDates[10].createdDate),
                status: '---',
                priority: '---',
                isArchived: true,
                ...getRandTnD(),
                isOpen: true,
            },
            {
                id: generateUUID(),
                ...getTodoRandDates(categoriesRandDates[10].createdDate),
                status: '---',
                priority: '---',
                isArchived: true,
                ...getRandTnD(),
                isOpen: true,
            },
        ],
    },
];
