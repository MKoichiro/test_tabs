/**
 * Represents the structure of data used by the user.
 *
 * @remarks
 * The `UserData` type represents the overall data used by the user. It consists of categories and todos.
 * The `Category` type represents a category and contains an array of todos.
 * The `Todo` type represents a task.
 *
 * @example
 * ```tsx
 * const userData: UserData = {
 *   id: "123",
 *   lang: "en",
 *   categories: [
 *     {
 *       id: "456",
 *       createdDate: new Date(),
 *       updatedDate: new Date(),
 *       isArchived: false,
 *       isActive: true,
 *       name: "Category 1",
 *       todos: [
 *         {
 *           id: 1,
 *           createdDate: new Date(),
 *           updatedDate: new Date(),
 *           deadline: { date: new Date(), use_time: true },
 *           status: "notStarted",
 *           priority: "first",
 *           title: "Task 1",
 *           detail: "Task 1 details",
 *           isArchived: false,
 *           isOpen: true,
 *         },
 *         // More todos...
 *       ],
 *     },
 *     // More categories...
 *   ],
 * };
 * ```
 */
// 

// data 構造 のイメージ
// "UserData" は、ユーザーが使用するデータ全体を表す型
// "Category" は、カテゴリーを表す型
// "Todo" は、タスクを表す型
// この3つの型は、階層構造を持っている
// "UserData" は "Category" の配列を持ち、"Category" は "Todo" の配列を持つ

// "UserData" は、ユーザーが使用するデータ全体を表す型
// "Category" は、カテゴリーを表す型
// "Todo" は、タスクを表す型
// この3つの型は、階層構造を持っている
// "UserData" は "Category" の配列を持ち、"Category" は "Todo" の配列を持つ

// "UserData" の型定義
// "UserData" は、以下のプロパティを持つ
//  - id: string
//  - lang: string
//  - categories: Category[]
//                ↑- "Category" の配列
//                     - id: string
//                     - createdDate: Date
//                     - updatedDate: Date
//                     - isArchived: boolean
//                     - isActive: boolean
//                     - name: string
//                     - todos: Todo[]
//                              ↑- "Todo" の配列
//                                   - id: number
//                                   - createdDate: Date
//                                   - updatedDate: Date
//                                   - deadline: DeadlineType
//                                   - status: StatusType
//                                   - priority: PriorityType
//                                   - title: string
//                                   - detail: string
//                                   - isArchived: boolean
//                                   - isOpen: boolean


import { generateUUID } from '../../utils/generateUUID';
import { Category, CategoryConstructProps, CreateCategoryArgs } from './Category';
import { LangsType } from '../types/type';

// property の追加アイデア
// - pageTheme: 'system' | 'light' | 'dark' | 'pastel';
// - userName: { first: string, last: string };
// - email: string;
// - password: string;
// - createdDate: Date;
// - updatedDate: Date;
// - lastLoginStates: {date: Date; activeCateforyIdx: number};




interface defaultUserDataProps {
  lang: LangsType;
}
const userDataTemplates: defaultUserDataProps = {
  lang: 'en',

};


// user 毎に生成
export class User {

  #id:             string;                           // ↓ properties set in constructor
  #lang:           string  = userDataTemplates.lang; // ↓ properties have  'fixed value' when creating a instance
  #categories: Category[];
  static #count                    = 0;              // ↓ static properties
  static activeCategoryIdx: number = 0;

  constructor() {
    this.#id         =                    generateUUID();
    this.#categories = [new Category({userId: this.id})];

    User.activeCategoryIdx = this.categories.findIndex(category => category.isActive);
    User.#count++;
  }

  // Getters: field properties
  get id()           { return this.#id         }
  get lang()         { return this.#lang       }
  get categories()   { return this.#categories }
  static get count() { return User.#count      }

  // Setters: field properties
  set lang(lang: string) { this.#lang = lang }


  // Methods
  addCategory(category: Category) {
    this.#categories.push(category);
  }
  createCategory(args: CreateCategoryArgs) {
    const { props, debugProps } = args;
    const constructFactor: CategoryConstructProps = {
      userId: this.id,
      props: props,
      debugProps: debugProps
    };
    const newCategory = new Category(constructFactor);
    this.addCategory(newCategory);
    return newCategory;
  }

  switchLanguage(lang: string) {
    this.lang = lang;
  }

  deleteCategoryById(categoryId: string) {
    const targetIdx = this.categories.findIndex(category => category.id === categoryId);
    if (targetIdx === -1) return;
    this.categories.splice(targetIdx, 1);
  }

  // Static Methods
  static getActiveCategory() {
    return User.activeCategoryIdx;
  }
}




// 初めて知ったことのメモ
// 2024/04/02
// - TypeScript で class User {prop1: number; prop2: string} を定義すると、
//      'User' というキーワードで { prop1: number; prop2: string } 型が自動的に生成されるので、
//      別途定義せずにそのまま使うことができる。

// - type OptionalType = Partial<Type> で、Type型の全てのプロパティを optional にしたOptionalType型を定義できる。
//      例えば、type PartialType = Partial<{ prop1: number; prop2: string }> は、
//      PartialType = { prop1?: number; prop2?: string } となる。

// - '#'はjsの新機能で'private'はTypeScriptの機能。
//      基本的に両者とも外部からアクセスできないようにするために使う。
//      '#'の方がより新しく、より厳密にアクセス制限をかけることができる。
//      よって、古いブラウザをサポートする必要がない場合は、'#'を使っておけばよい

// - type Record<K, T> = { [P in K]: T } で、K型の全てのプロパティをT型に変換した新しい型を定義できる。
//      例えば、type Record<string, string> = { [P in string]: string } は、
//      Record<string, string> = { key1: 'value1'; key2: 'value2'; key3: 'value3'; ... } となる。