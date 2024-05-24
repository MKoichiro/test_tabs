/**
# "AAA.tsx"

## RENDER AS:
- ``` <example/> ```

## DEPENDENCIES:
| type     | name                                            | role       |
| ---------| ----------------------------------------------- | ---------- |
| PARENT 1 | BBB.tsx                                         | 機能や役割 |
| CHILD  1 | CCC.tsx                                         | 機能や役割 |
| CHILD  2 | DDD.tsx                                         | 機能や役割 |
| PACKAGE  | importしているpackage名                         | 機能や役割 |
| PROVIDER | importしているprovider名                        | 機能や役割 |
| SETTING  | importしているsetting file名                    | 機能や役割 |
| UTILS    | ultils ディレクトリからimportしているファイル名 | 機能や役割 |
| TYPES    | 外部からimportしている型名                      | 機能や役割 |

## FEATURES:
- conponent

## DESCRIPTION:
- コンポーネントが提供する機能や役割を箇条書きで記述する。

## PROPS:
| name        | type | role                     |
| ----------- | ---- | ------------------------ |
| propsの名前 | 型   | 役割などの一言程度の説明 |

## STATES:
| name        | type | role                     |
| ----------- | ---- | ------------------------ |
| stateの名前 | 型   | 役割などの一言程度の説明 |

## FUTURE TASKS:
- 今後の展望や修正点を箇条書きで記述する。

## COPILOT
- copilotからの提案をここに箇条書きで記述する。
*/

import {
    PriorityLiteralsType,
    PriorityUnionType,
    StatusLiteralsType,
    StatusUnionType,
    notSet,
    priorityLiterals,
    statusLiterals,
} from '../../../providers/types/categories';
import { toUpperCaseFirstLetter } from '../../../utils/toUpperCaseFirstLetter';
/* --- dev ----------------------- */
// import { isDebugMode } from '../../../utils/adminDebugMode';

// status/priority の <option/> に渡す選択肢を用意
// 現状横流ししているだけ、保守性のため記述しておく。
export { statusLiterals as statusOptions };
export { priorityLiterals as priorityOptions };

// defaultValue 属性として渡す値
export const defaultValues = {
    title: '',
    detail: '',
    // date:     undefined,
    date: 'yyyy-mm-dd',
    time: undefined,
    priority: notSet,
    status: notSet,
} as const;

// placeholder 属性として渡す値
export const placeholders = {
    title: '例) スーパーで買い物',
    detail: '例) 牛乳、卵、パン、トイレットペーパー',
    date: 'yyyy-mm-dd',
    time: 'hh:mm',
    priority: '選択してください',
    status: '選択してください',
} as const;

interface FormDataBaseConstructor {
    name: string;
    required: string | false;
    placeholder?: string;
}
type ConstructorBase = Omit<FormDataBaseConstructor, 'name'>;

type FormDataTextareaConstructor = Required<ConstructorBase>;
interface TitleConstructor extends FormDataTextareaConstructor {}
interface DetailConstructor extends FormDataTextareaConstructor {}

type FormDataInputConstructor = FormDataTextareaConstructor;
interface D_DateConstructor extends FormDataInputConstructor {}
interface D_TimeConstructor extends FormDataInputConstructor {}

type FormDataSelectConstructor = Omit<FormDataBaseConstructor, 'name' | 'placeholder'>;
interface StatusConstructor extends FormDataSelectConstructor {
    optionValues: StatusLiteralsType;
    optionDisplays?: StatusLiteralsType;
    defaultValue: StatusUnionType;
}
interface PriorityConstructor extends FormDataSelectConstructor {
    optionValues: PriorityLiteralsType;
    optionDisplays?: PriorityLiteralsType;
    defaultValue: PriorityUnionType;
}

class FormDataBase {
    #name: string;
    #required: string | false;
    #placeholder?: string;

    constructor({ name, required, placeholder }: FormDataBaseConstructor) {
        this.#name = name;
        this.#required = required;
        this.#placeholder = placeholder;
    }

    // getters
    get name() {
        return this.#name;
    }
    get required() {
        return this.#required;
    }
    get placeholder() {
        return this.#placeholder;
    }
    getFeature() {
        return this.#required ? 'required' : 'optional';
    }
    getUpperFeature() {
        return toUpperCaseFirstLetter(this.getFeature());
    }
    getUpperName() {
        return toUpperCaseFirstLetter(this.#name);
    }
}

// textarea
class FormDataTextareaAddition extends FormDataBase {
    constructor({ name, required, placeholder }: { name: string; required: string | false; placeholder: string }) {
        super({
            name,
            required,
            placeholder,
        });
    }
}
export class TitleFormData extends FormDataTextareaAddition {
    constructor({ required, placeholder }: TitleConstructor) {
        super({
            name: 'title',
            required,
            placeholder,
        });
    }
}
export class DetailFormData extends FormDataTextareaAddition {
    constructor({ required, placeholder }: DetailConstructor) {
        super({
            name: 'detail',
            required,
            placeholder,
        });
    }
}

// input
class FormDataInputAddition extends FormDataBase {
    #type: string;
    constructor({
        name,
        required,
        placeholder,
        type,
    }: {
        name: string;
        required: string | false;
        placeholder: string;
        type: string;
    }) {
        super({
            name,
            required,
            placeholder,
        });
        this.#type = type;
    }

    // getters
    get type() {
        return this.#type;
    }
}
export class D_DateFormData extends FormDataInputAddition {
    constructor({ required, placeholder }: D_DateConstructor) {
        super({
            name: 'date',
            required,
            placeholder,
            type: 'date',
        });
    }
}
export class D_TimeFormData extends FormDataInputAddition {
    constructor({ required, placeholder }: D_TimeConstructor) {
        super({
            name: 'time',
            required,
            placeholder,
            type: 'time',
        });
    }
}

// select
class FormDataSelectAddition<T, U> extends FormDataBase {
    #optionValues: T;
    #optionDisplays: T | string[];
    #defaultValue: U;
    constructor({
        name,
        required,
        optionValues,
        optionDisplays = optionValues,
        defaultValue,
    }: {
        name: string;
        required: string | false;
        optionValues: T;
        optionDisplays?: T | string[];
        defaultValue: U;
    }) {
        super({
            name,
            required,
        });
        this.#optionValues = optionValues;
        this.#optionDisplays = optionDisplays || optionValues;
        this.#defaultValue = defaultValue;
    }

    // getters
    get optionValues() {
        return this.#optionValues;
    }
    get optionDisplays() {
        return this.#optionDisplays;
    }
    get defaultValue() {
        return this.#defaultValue;
    }
}
export class StatusFormData extends FormDataSelectAddition<StatusLiteralsType, StatusUnionType> {
    constructor({ required, optionValues, optionDisplays, defaultValue }: StatusConstructor) {
        super({
            name: 'status',
            required,
            optionValues,
            optionDisplays,
            defaultValue,
        });
    }
}
export class PriorityFormData extends FormDataSelectAddition<PriorityLiteralsType, PriorityUnionType> {
    constructor({ required, optionValues, optionDisplays, defaultValue }: PriorityConstructor) {
        super({
            name: 'priority',
            required,
            optionValues,
            optionDisplays,
            defaultValue,
        });
    }
}

// argument for generating form data instances
// textarea
const titleConstructor: TitleConstructor = {
    required: 'Please enter a title',
    placeholder: 'Grocery Shopping',
};
const detailConstructor: DetailConstructor = {
    required: false,
    placeholder: 'Buy milk, eggs, and bread',
};

// input
const D_dateConstructor: D_DateConstructor = {
    required: false,
    placeholder: 'yyyy-mm-dd',
};
const D_timeConstructor: D_TimeConstructor = {
    required: false,
    placeholder: 'hh:mm',
};

// select
const statusConstructor: StatusConstructor = {
    required: false,
    optionValues: statusLiterals,
    defaultValue: notSet,
};
const priorityConstructor: PriorityConstructor = {
    required: false,
    optionValues: priorityLiterals,
    defaultValue: notSet,
};

// generate form data instances
// textarea
export const titleData = new TitleFormData(titleConstructor);
export const detailData = new DetailFormData(detailConstructor);
// input
export const d_DateData = new D_DateFormData(D_dateConstructor);
export const d_TimeData = new D_TimeFormData(D_timeConstructor);
// select
export const statusData = new StatusFormData(statusConstructor);
export const priorityData = new PriorityFormData(priorityConstructor);
