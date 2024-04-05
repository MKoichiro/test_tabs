import DOMPurify from 'dompurify';
const marked = require('marked');
import { isDebugMode } from '../../utils/adminDebugMode';
import { notSet, DeadlineType, StatusType, PriorityType, priorityFormats } from '../types/type';
import { generateUUID } from '../../utils/generateUUID';
import { user } from '../entity';



// Todo instance 生成時に設定可能な properties の 型定義
interface InitializableTodoProps {
  deadline: DeadlineType;
  status: StatusType;
  priority: PriorityType;
  title: string;
  detail: string;
}
// optional な properties の型定義も作成
type InitializableTodoPropsFromUser = Partial<InitializableTodoProps>;

// User/Category instance 生成時に、template 提示用の Todo instance も生成する。
// その際に設定する properties の値をここで定義
const titleExplanation = '下のフォームからタスクを新規作成・追加できます。追加済みのタスクを編集するにはここをダブルクリック。';
const detailExplanation = `ここにタスクの詳細を記入できます。\n編集が完了したら余白をクリックして確定します。`;
const todoTemplates: InitializableTodoProps = {
  deadline:            notSet,
  status:              notSet,
  priority:            notSet,
  title:     titleExplanation,
  detail:   detailExplanation,
};

// For Debug: 自動で設定されるプロパティをカスタムするための型定義
interface AdditionalTodoPropsForDebug {
  categoryId?:   string;
  createdDate?:    Date;
  updatedDate?:    Date;
  isArchived?:  boolean;
  isOpen?:      boolean;
}


export interface CreateTodoArgs {
  props?: InitializableTodoPropsFromUser;
  debugProps?: AdditionalTodoPropsForDebug;
}
export interface TodoConstructProps extends CreateTodoArgs {
  categoryId: string;
}

export class Todo {

  #id:                  string;                            // ↓ properties set in constructor
  #createdDate:           Date;
  #updatedDate:           Date;
  #categoryId:          string;
  #deadline:      DeadlineType = todoTemplates.deadline; // ↓ properties have  'initializable value'  when creating a instance
  #status:          StatusType =   todoTemplates.status;
  #priority:      PriorityType = todoTemplates.priority;
  #title:               string =    todoTemplates.title;
  #detail:              string =   todoTemplates.detail;
  #isArchived:         boolean =                  false; // ↓ properties have  'fixed value'          when creating a instance
  #isOpen:             boolean =                   true;

  constructor(args: TodoConstructProps) {
    const { categoryId, props, debugProps } = args;
    this.#id          = generateUUID();
    this.#createdDate =     new Date();
    this.#updatedDate =     new Date();
    this.#categoryId  =     categoryId;

    if (props) {
      const { deadline, status, priority, title, detail } = props;
      deadline && (this.#deadline = deadline);
      status   && (this.#status   =   status);
      priority && (this.#priority = priority);
      title    && (this.#title    =    title);
      detail   && (this.#detail   =   detail);
    }

    if (isDebugMode && debugProps) {
      const { createdDate, updatedDate, isArchived, isOpen } = debugProps;
      createdDate && (this.#createdDate = createdDate);
      updatedDate && (this.#updatedDate = updatedDate);
      isArchived  && (this.#isArchived  =  isArchived);
      isOpen      && (this.#isOpen      =      isOpen);
    }
  }

  // Getters: field properties
  get id()          { return this.#id          }
  get createdDate() { return this.#createdDate }
  get updatedDate() { return this.#updatedDate }
  get deadline()    { return this.#deadline    }
  get status()      { return this.#status      }
  get priority()    { return this.#priority    }
  get title()       { return this.#title       }
  get detail()      { return this.#detail      }
  get isArchived()  { return this.#isArchived  }
  get isOpen()      { return this.#isOpen      }

  // Setters: field properties
  set updatedDate(updatedDate: Date)   { this.#updatedDate = updatedDate }
  set deadline(deadline: DeadlineType) { this.#deadline    = deadline    }
  set status(status: StatusType)       { this.#status      = status      }
  set priority(priority: PriorityType) { this.#priority    = priority    }
  set title(title: string)             { this.#title       = title       }
  set detail(detail: string)           { this.#detail      = detail      }
  set isArchived(isArchived: boolean)  { this.#isArchived  = isArchived  }
  set isOpen(isOpen: boolean)          { this.#isOpen      = isOpen      }

  // Methods
  // Getters: others
  getIsCompleted() {
    return (this.#status === 'completed');
  }
  getIsExpired() {
    return (this.getIsCompleted() || this.deadline === notSet) ? false : Date.now() > this.deadline.date.getTime();
  }
  getDeadlineFormatted() {
    if (this.deadline === notSet) return notSet;

    const date = this.deadline.date;
    if (this.deadline.use_time) {
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`; // 例: 2021/8/1 12:34
    } else {
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;                                         // 例: 2021/8/1
    }
  }
  getPriorityFormatted() {
    return priorityFormats.words[this.priority];
  }
  getPriorityNum() {
    return priorityFormats.num[this.priority];
  }

  #getBelongingUser() {
    return user;
  }
  getBelogingUserId() {
    return this.#getBelongingUser().id;
  }
  #getBelongingCategory() {
    return this.#getBelongingUser().categories.find(category => category.id === this.#categoryId);
  }
  getBelongingCategoryId() {
    return this.#categoryId;
  }
  getCategoryName() {
    return this.#getBelongingCategory()?.name ?? notSet;
  }
  getSanitizedDetail() {
    return DOMPurify.sanitize(marked.parse(this.detail));
  }

  // Setters: others
  #updateUpdatedDate() {
    this.updatedDate = new Date();
  }
  #updateCategoryUpdatedDate() {
    this.#getBelongingCategory()?.updateUpdatedDate();
  }
  
  toggleIsOpen() {
    this.isOpen = !this.isOpen;
    this.#updateUpdatedDate();
    this.#updateCategoryUpdatedDate();
  }
  toggleIsArchived() {
    this.isArchived = !this.isArchived;
    this.#updateUpdatedDate();
    this.#updateCategoryUpdatedDate();
  }
  updateTitle(title: string) {
    this.title = title;
    this.#updateUpdatedDate();
    this.#updateCategoryUpdatedDate();
  }
  updateDetail(detail: string) {
    this.detail = detail;
    this.#updateUpdatedDate();
    this.#updateCategoryUpdatedDate();
  }
  updateDeadline(deadline: DeadlineType) {
    this.deadline = deadline;
    this.#updateUpdatedDate();
    this.#updateCategoryUpdatedDate();
  }
  updateStatus(status: StatusType) {
    this.status = status;
    this.#updateUpdatedDate();
    this.#updateCategoryUpdatedDate();
  }
  updatePriority(priority: PriorityType) {
    this.priority = priority;
    this.#updateUpdatedDate();
    this.#updateCategoryUpdatedDate();
  }
  archive() {
    this.isArchived = true;
  }
  unarchive() {
    this.isArchived = false;
  }

  // Delete
  delete() {
    this.#getBelongingCategory()?.deleteTodoById(this.id);
  }
}