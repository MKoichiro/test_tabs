import { Todo, TodoConstructProps } from './Todo';
import { generateUUID } from '../../utils/generateUUID';
import { useDebugMode } from '../../utils/adminDebug';
import { CreateTodoArgs } from './Todo';
import { user } from '../entity';

// Category instance 生成時の properties の default 値
interface InitializableCategoryProps {
  name: string;
}
type InitializableCategoryPropsFromUser = Partial<InitializableCategoryProps>;
const categoryTemplates: InitializableCategoryProps = {
  name: 'NEW Category',
};

// For Debug: 自動で設定されるプロパティをカスタムするための型定義
interface AdditionalCategoryPropsForDebug {
  createdDate?:   Date;
  updatedDate?:   Date;
  todos?:       Todo[];
  isArchived?: boolean;
}


export interface CreateCategoryArgs {
  props?: InitializableCategoryPropsFromUser;
  debugProps?: AdditionalCategoryPropsForDebug;
}
export interface CategoryConstructProps extends CreateCategoryArgs {
  userId: string;
}



export class Category {

  #id:            string;                             // ↓ properties set in constructor
  #createdDate:     Date;
  #updatedDate:     Date;
  #userId:        string;
  #todos:         Todo[];
  #name:          string  =   categoryTemplates.name; // ↓ properties have  'initializable value'  when creating a instance
  #isArchived:   boolean  =                    false; // ↓ properties have  'fixed value'          when creating a instance
  #isActive:     boolean  =                    false;

  constructor(args: CategoryConstructProps) {
    const { userId, props, debugProps } = args;

    const todoConstructFactor: TodoConstructProps = {
      categoryId: this.id,
    };


    this.#id          =                  generateUUID();
    this.#createdDate =                      new Date();
    this.#updatedDate =                      new Date();
    this.#userId      =                          userId;
    this.#todos       = [new Todo(todoConstructFactor)];

    if (props) {
      const { name } = props;
      name && (this.#name = name);
    }

    // For Debug: 生成時に一部のプロパティの設定を可能に。
    if (useDebugMode && debugProps) {
      const { createdDate, updatedDate, todos, isArchived } = debugProps;
      createdDate && (this.#createdDate = createdDate);
      updatedDate && (this.#updatedDate = updatedDate);
      todos       && (this.#todos       =       todos);
      isArchived  && (this.#isArchived  =  isArchived);
    }
  }

  // Getters: field properties
  get id()          { return this.#id          }
  get createdDate() { return this.#createdDate }
  get updatedDate() { return this.#updatedDate }
  get userId()      { return this.#userId      }
  get name()        { return this.#name        }
  get todos()       { return this.#todos       }
  get isArchived()  { return this.#isArchived  }
  get isActive()    { return this.#isActive    }

  // Setters: field properties
  set name(name: string)              { this.#name        = name        }
  set updatedDate(updatedDate: Date)  { this.#updatedDate = updatedDate }
  set isArchived(isArchived: boolean) { this.#isArchived  = isArchived  }

  // Methods
  addTodo(todo: Todo) {
    this.todos.push(todo);
  }
  createTodo(args: CreateTodoArgs) {
    const { props, debugProps } = args;
    const constructFactor: TodoConstructProps = {
      categoryId: this.id,
      props: props,
      debugProps: debugProps,
    };
    const newTodo = new Todo(constructFactor);
    this.addTodo(newTodo);
    return newTodo;
  }
  getTodoById(id: string) {
    return this.todos.find(todo => todo.id === id);
  }
  archive() {
    this.isArchived = true;
  }
  unarchive() {
    this.isArchived = false;
  }
  updateUpdatedDate() {
    this.updatedDate = new Date();
  }
  updateName(name: string) {
    this.name = name;
    this.updateUpdatedDate();
  }
  deleteTodoById(id: string) {
    const targetIndex = this.todos.findIndex(todo => todo.id === id);
    if (targetIndex === -1) return;
    this.todos.splice(targetIndex, 1);
  }
  getUser() {
    return user;
  }
  getTodoCount() {
    return this.todos.length;
  }

  getActiveTodos() {
    return this.todos.filter(todo => todo.isArchived === false);
  }
  getArchivedTodos() {
    return this.todos.filter(todo => todo.isArchived === true);
  }


  #deactivate() {
    this.#isActive = false;
  }
  activate() {
    this.getUser().categories.forEach(category => category.#deactivate());
    this.#isActive = true;
  }

  delete() {
    this.getUser().deleteCategoryById(this.id);
  }
}