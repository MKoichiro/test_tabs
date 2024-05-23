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

import { notSet, priorityLiterals, statusLiterals } from '../../../providers/types/categories';
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

class FormData {
    #name: string;
    #required: string | false;
    #placeholder: string;

    constructor({ name, required, placeholder }: { name: string; required: string | false; placeholder: string }) {
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

export class TitleFormData extends FormData {
    constructor({ required, placeholder }: { required: string | false; placeholder: string }) {
        super({
            name: 'title',
            required,
            placeholder,
        });
    }
}
export class DetailFormData extends FormData {
    constructor({ required, placeholder }: { required: string | false; placeholder: string }) {
        super({
            name: 'detail',
            required,
            placeholder,
        });
    }
}

interface ConstructorBase {
    required: string | false;
    placeholder: string;
}
interface TitleConstructor extends ConstructorBase {}
interface DetailConstructor extends ConstructorBase {}

// argument for constructor
const titleConstructor: TitleConstructor = {
    required: 'Please enter a title',
    placeholder: 'Grocery Shopping',
};
const detailConstructor: DetailConstructor = {
    required: false,
    placeholder: 'Buy milk, eggs, and bread',
};

// generate form data instances
export const titleData = new TitleFormData(titleConstructor);
export const detailData = new DetailFormData(detailConstructor);
