/*
  [FormSetting.ts]
    - element: null

    - kinds: 
        * type definition
        * constant definition

    - description:
        CreateNewTodoのフォーム部品に渡すプロパティやその型を定義
*/

import { notSet, priorityLiterals, statusLiterals } from '../../../types/Categories';

// status/priority の <option/> に渡す選択肢を用意
// 現状横流ししているだけ、保守性のため記述しておく。
export {   statusLiterals as   statusOptions };
export { priorityLiterals as priorityOptions };

// defaultValue 属性として渡す値
export const defaultValues = {
  title:           '',
  detail:          '',
  // date:     undefined,
  date:     'yyyy-mm-dd',
  time:     undefined,
  priority:    notSet,
  status:      notSet,
} as const;

// placeholder 属性として渡す値
export const placeholders = {
  title:    '例) スーパーでお買い物',
  detail:   '例) 牛乳、卵、パン、トイレットペーパー',
  date:     'yyyy-mm-dd',
  time:     'hh:mm',
  priority: '選択してください',
  status:   '選択してください',
} as const;