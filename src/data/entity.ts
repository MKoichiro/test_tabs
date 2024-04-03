// ./classes/User の User クラスをもとにデータ構造を生成



import { User } from './classes/User';
import { CreateCategoryArgs } from './classes/Category';
import { CreateTodoArgs } from './classes/Todo';

export const user = new User();

// デバッグ用のダミーインスタンス生成用のプロパティテンプレート
// spread して使う
const todoProps: CreateTodoArgs = {
  props: {
    deadline: { date: new Date('2024/1/1'), use_time: true},
    status: 'notStarted',
    priority: 'normal',
    title: '今日やること',
    detail: '今日やることは明日までに終わらせなければならない',
  },
  debugProps: {
    createdDate: new Date(),
    updatedDate: new Date(),
    isArchived: false,
    isOpen: true,
  }
}
const categoryProps: CreateCategoryArgs = {
  props: {
    name: 'Category-0',
  },
  debugProps: {
    createdDate: new Date(),
    updatedDate: new Date(),
    isArchived: false,
  }
}


const categoryProps_0  = {...categoryProps                                 }
const categoryProps_1  = {...categoryProps, props: { name: 'Category-1'  } }
const categoryProps_2  = {...categoryProps, props: { name: 'Category-2'  } }
const categoryProps_3  = {...categoryProps, props: { name: 'Category-3'  } }
const categoryProps_4  = {...categoryProps, props: { name: 'Category-4'  } }
const categoryProps_5  = {...categoryProps, props: { name: 'Category-5'  } }
const categoryProps_6  = {...categoryProps, props: { name: 'Category-6'  } }
const categoryProps_7  = {...categoryProps, props: { name: 'Category-7'  } }
const categoryProps_8  = {...categoryProps, props: { name: 'Category-8'  } }
const categoryProps_9  = {...categoryProps, props: { name: 'Category-9'  } }
const categoryProps_10 = {...categoryProps, props: { name: 'Category-10' } }


// category instance を user の createCategory method を通して生成
const category_0  = user.createCategory(categoryProps_0);
const category_1  = user.createCategory(categoryProps_1);
const category_2  = user.createCategory(categoryProps_2);
const category_3  = user.createCategory(categoryProps_3);
const category_4  = user.createCategory(categoryProps_4);
const category_5  = user.createCategory(categoryProps_5);
const category_6  = user.createCategory(categoryProps_6);
const category_7  = user.createCategory(categoryProps_7);
const category_8  = user.createCategory(categoryProps_8);
const category_9  = user.createCategory(categoryProps_9);
const category_10 = user.createCategory(categoryProps_10);




// todo instance を各 category の createTodo method を通して生成

// category_0 に todo を追加
const todoProps_0_0  = {...todoProps, props: { title: 'Category-0  の 0番目 のタスク'  } }
const todoProps_0_1  = {...todoProps_0_0, props: { title: 'Category-0 の 1番目  のタスク' } }
const todoProps_0_2  = {...todoProps_0_0, props: { title: 'Category-0 の 2番目  のタスク' } }
const todoProps_0_3  = {...todoProps_0_0, props: { title: 'Category-0 の 3番目  のタスク' } }
const todoProps_0_4  = {...todoProps_0_0, props: { title: 'Category-0 の 4番目  のタスク' } }
const todoProps_0_5  = {...todoProps_0_0, props: { title: 'Category-0 の 5番目  のタスク' } }
const todoProps_0_6  = {...todoProps_0_0, props: { title: 'Category-0 の 6番目  のタスク' } }
const todoProps_0_7  = {...todoProps_0_0, props: { title: 'Category-0 の 7番目  のタスク' } }
const todoProps_0_8  = {...todoProps_0_0, props: { title: 'Category-0 の 8番目  のタスク' } }
const todoProps_0_9  = {...todoProps_0_0, props: { title: 'Category-0 の 9番目  のタスク' } }
const todoProps_0_10 = {...todoProps_0_0, props: { title: 'Category-0 の 10番目 のタスク' } }

const todo_0_0  = category_0.createTodo(todoProps_0_0);
const todo_0_1  = category_0.createTodo(todoProps_0_1);
const todo_0_2  = category_0.createTodo(todoProps_0_2);
const todo_0_3  = category_0.createTodo(todoProps_0_3);
const todo_0_4  = category_0.createTodo(todoProps_0_4);
const todo_0_5  = category_0.createTodo(todoProps_0_5);
const todo_0_6  = category_0.createTodo(todoProps_0_6);
const todo_0_7  = category_0.createTodo(todoProps_0_7);
const todo_0_8  = category_0.createTodo(todoProps_0_8);
const todo_0_9  = category_0.createTodo(todoProps_0_9);
const todo_0_10 = category_0.createTodo(todoProps_0_10);


// category_1 に todo を追加
const todoProps_1_0 = {...todoProps, props: { title: 'Category-1  の 0番目 のタスク'  } }
const todoProps_1_1 = {...todoProps_1_0, props: { title: 'Category-1 の 1番目  のタスク' } }
const todoProps_1_2 = {...todoProps_1_0, props: { title: 'Category-1 の 2番目  のタスク' } }
const todoProps_1_3 = {...todoProps_1_0, props: { title: 'Category-1 の 3番目  のタスク' } }

const todo_1_0 = category_1.createTodo(todoProps_1_0);
const todo_1_1 = category_1.createTodo(todoProps_1_1);
const todo_1_2 = category_1.createTodo(todoProps_1_2);
const todo_1_3 = category_1.createTodo(todoProps_1_3);


// category_2 に todo を追加
const todoProps_2_0 = {...todoProps, props: { title: 'Category-2  の 0番目 のタスク'  } }
const todoProps_2_1 = {...todoProps_2_0, props: { title: 'Category-2 の 1番目  のタスク' } }
const todoProps_2_2 = {...todoProps_2_0, props: { title: 'Category-2 の 2番目  のタスク' } }
const todoProps_2_3 = {...todoProps_2_0, props: { title: 'Category-2 の 3番目  のタスク' } }

const todo_2_0 = category_2.createTodo(todoProps_2_0);
const todo_2_1 = category_2.createTodo(todoProps_2_1);
const todo_2_2 = category_2.createTodo(todoProps_2_2);
const todo_2_3 = category_2.createTodo(todoProps_2_3);


// category_3 に todo を追加
const todoProps_3_0 = {...todoProps, props: { title: 'Category-3  の 0番目 のタスク'  } }
const todoProps_3_1 = {...todoProps_3_0, props: { title: 'Category-3 の 1番目  のタスク' } }
const todoProps_3_2 = {...todoProps_3_0, props: { title: 'Category-3 の 2番目  のタスク' } }
const todoProps_3_3 = {...todoProps_3_0, props: { title: 'Category-3 の 3番目  のタスク' } }

const todo_3_0 = category_3.createTodo(todoProps_3_0);
const todo_3_1 = category_3.createTodo(todoProps_3_1);
const todo_3_2 = category_3.createTodo(todoProps_3_2);
const todo_3_3 = category_3.createTodo(todoProps_3_3);


// category_4 に todo を追加
const todoProps_4_0 = {...todoProps, props: { title: 'Category-4  の 0番目 のタスク'  } }
const todoProps_4_1 = {...todoProps_4_0, props: { title: 'Category-4 の 1番目  のタスク' } }
const todoProps_4_2 = {...todoProps_4_0, props: { title: 'Category-4 の 2番目  のタスク' } }
const todoProps_4_3 = {...todoProps_4_0, props: { title: 'Category-4 の 3番目  のタスク' } }

const todo_4_0 = category_4.createTodo(todoProps_4_0);
const todo_4_1 = category_4.createTodo(todoProps_4_1);
const todo_4_2 = category_4.createTodo(todoProps_4_2);
const todo_4_3 = category_4.createTodo(todoProps_4_3);


// category_5 に todo を追加
const todoProps_5_0 = {...todoProps, props: { title: 'Category-5  の 0番目 のタスク'  } }
const todoProps_5_1 = {...todoProps_5_0, props: { title: 'Category-5 の 1番目  のタスク' } }
const todoProps_5_2 = {...todoProps_5_0, props: { title: 'Category-5 の 2番目  のタスク' } }
const todoProps_5_3 = {...todoProps_5_0, props: { title: 'Category-5 の 3番目  のタスク' } }

const todo_5_0 = category_5.createTodo(todoProps_5_0);
const todo_5_1 = category_5.createTodo(todoProps_5_1);
const todo_5_2 = category_5.createTodo(todoProps_5_2);
const todo_5_3 = category_5.createTodo(todoProps_5_3);


// category_6 に todo を追加
const todoProps_6_0 = {...todoProps, props: { title: 'Category-6  の 0番目 のタスク'  } }
const todoProps_6_1 = {...todoProps_6_0, props: { title: 'Category-6 の 1番目  のタスク' } }
const todoProps_6_2 = {...todoProps_6_0, props: { title: 'Category-6 の 2番目  のタスク' } }
const todoProps_6_3 = {...todoProps_6_0, props: { title: 'Category-6 の 3番目  のタスク' } }

const todo_6_0 = category_6.createTodo(todoProps_6_0);
const todo_6_1 = category_6.createTodo(todoProps_6_1);
const todo_6_2 = category_6.createTodo(todoProps_6_2);
const todo_6_3 = category_6.createTodo(todoProps_6_3);


// category_7 に todo を追加
const todoProps_7_0 = {...todoProps, props: { title: 'Category-7  の 0番目 のタスク'  } }
const todoProps_7_1 = {...todoProps_7_0, props: { title: 'Category-7 の 1番目  のタスク' } }
const todoProps_7_2 = {...todoProps_7_0, props: { title: 'Category-7 の 2番目  のタスク' } }
const todoProps_7_3 = {...todoProps_7_0, props: { title: 'Category-7 の 3番目  のタスク' } }

const todo_7_0 = category_7.createTodo(todoProps_7_0);
const todo_7_1 = category_7.createTodo(todoProps_7_1);
const todo_7_2 = category_7.createTodo(todoProps_7_2);
const todo_7_3 = category_7.createTodo(todoProps_7_3);


// category_8 に todo を追加
const todoProps_8_0 = {...todoProps, props: { title: 'Category-8  の 0番目 のタスク'  } }
const todoProps_8_1 = {...todoProps_8_0, props: { title: 'Category-8 の 1番目  のタスク' } }
const todoProps_8_2 = {...todoProps_8_0, props: { title: 'Category-8 の 2番目  のタスク' } }
const todoProps_8_3 = {...todoProps_8_0, props: { title: 'Category-8 の 3番目  のタスク' } }

const todo_8_0 = category_8.createTodo(todoProps_8_0);
const todo_8_1 = category_8.createTodo(todoProps_8_1);
const todo_8_2 = category_8.createTodo(todoProps_8_2);
const todo_8_3 = category_8.createTodo(todoProps_8_3);


// category_9 に todo を追加
const todoProps_9_0 = {...todoProps, props: { title: 'Category-9  の 0番目 のタスク'  } }
const todoProps_9_1 = {...todoProps_9_0, props: { title: 'Category-9 の 1番目  のタスク' } }
const todoProps_9_2 = {...todoProps_9_0, props: { title: 'Category-9 の 2番目  のタスク' } }
const todoProps_9_3 = {...todoProps_9_0, props: { title: 'Category-9 の 3番目  のタスク' } }

const todo_9_0 = category_9.createTodo(todoProps_9_0);
const todo_9_1 = category_9.createTodo(todoProps_9_1);
const todo_9_2 = category_9.createTodo(todoProps_9_2);
const todo_9_3 = category_9.createTodo(todoProps_9_3);


// category_10 に todo を追加
const todoProps_10_0 = {...todoProps, props: { title: 'Category-10 の 0番目 のタスク' } }
const todoProps_10_1 = {...todoProps_10_0, props: { title: 'Category-10 の 1番目  のタスク' } }
const todoProps_10_2 = {...todoProps_10_0, props: { title: 'Category-10 の 2番目  のタスク' } }
const todoProps_10_3 = {...todoProps_10_0, props: { title: 'Category-10 の 3番目  のタスク' } }


const todo_10_0 = category_10.createTodo(todoProps_10_0);
const todo_10_1 = category_10.createTodo(todoProps_10_1);
const todo_10_2 = category_10.createTodo(todoProps_10_2);
const todo_10_3 = category_10.createTodo(todoProps_10_3);







