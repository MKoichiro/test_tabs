# 背景
ファイル先頭にそのファイルの情報をまとめたコメントを挿入したいと考えています。

# 目標
フォーマットに沿ったコメントを生成する。

# プラン
1. フォーマットと例と要件をインプットしてください。
2. コードをレビューし、必要な情報を抽出してください。
3. コメントを作成してください。
4. 生成したコメントをレビューして、要件との整合性をチェックしてください。
5. 再度、コメントを生成してください。


# フォーマット
```
/*
# "AAA.tsx"

## RENDER AS:
- ``` <example/> ```

## DEPENDENCIES:
| type              | name                                            | role       |
| ----------------- | ----------------------------------------------- | ---------- |
| PARENT COMPONENTS | BBB.tsx                                         | 機能や役割 |
| CHILD COMPONENT 1 | CCC.tsx                                         | 機能や役割 |
| CHILD COMPONENT 2 | DDD.tsx                                         | 機能や役割 |
| PACKAGE           | importしているpackage名                         | 機能や役割 |
| PROVIDER          | importしているprovider名                        | 機能や役割 |
| SETTING           | importしているsetting file名                    | 機能や役割 |
| UTILS             | ultils ディレクトリからimportしているファイル名 | 機能や役割 |
| TYPES             | 外部からimportしている型名                      | 機能や役割 |

## FEATURES:
- conponent

## DESCRIPTION:
- コンポーネントが提供する機能や役割を箇条書きで記述する。
- 長くなる場合には、適度に箇条書きに分割。

## PROPS:
| name        | type | role                     |
| ----------- | ---- | ------------------------ |
| propsの名前 | 型   | 役割などの一言程度の説明 |
| propsの名前 | 型   | 役割などの一言程度の説明 |
| propsの名前 | 型   | 役割などの一言程度の説明 |

## STATES:
| name        | type | role                     |
| ----------- | ---- | ------------------------ |
| stateの名前 | 型   | 役割などの一言程度の説明 |
| stateの名前 | 型   | 役割などの一言程度の説明 |
| stateの名前 | 型   | 役割などの一言程度の説明 |

## FUTURE TASKS:
- 今後の展望や修正点を箇条書きで記述する。
- 今後の展望や修正点を箇条書きで記述する。
- 今後の展望や修正点を箇条書きで記述する。

## COPILOT
- copilotからの提案をここに箇条書きで記述する。
*/
```


# 例
## 例1:
```
/**
# "FormParts.tsx"

## RENDER AS:
- ``` <div/> ```

## FEATURES:
- component

## DEPENDENCIES:
| type              | name                                         | role                 |
| ----------------- | -------------------------------------------- | -------------------- |
| PARENT COMPONENTS | CreateNewTodo.tsx                            |                      |
| CHILD COMPONENT 1 | null                                         |                      |
| TYPES             | StatusLiteralsType <br> PriorityLiteralsType | selectOptions に使用 |

## DESCRIPTION:
- このコンポーネントは、スタイリングされた div 要素を提供します。

## PROPS:
| name           | type                                       | role                                                    | 
| -------------- | ------------------------------------------ | ------------------------------------------------------- | 
| className      | string                                     | スタイリングのためのクラス名                            | 
| partsFor       | string                                     | フォーム要素の名前、htmlFor, id, label のテキストに使用 | 
| as             | 'input' \| 'textarea' \| 'select'          | レンダリング要素の選択                                  | 
| feature        | 'optional' \| 'required'                   | 必須項目か任意項目かの指定                              | 
| register       | UseFormRegister<FieldValues>               | react-hook-form の register                             | 
| partsRef       | MutableRefObject<any>                      | 親コンポーネントでフォームのクリアに使用する ref を登録 | 
| defaultValue?  | string                                     | デフォルト値                                            | 
| inputType?     | 'text' \| 'date' \| 'time'                 | input の type 属性に指定                                | 
| placeholder?   | string                                     | placeholder の指定                                      | 
| selectOptions? | StatusLiteralsType \| PriorityLiteralsType | select の option の指定                                 | 

## STATES:
- このコンポーネントで新たに定義された state はありません。

## FUTURE TASKS:
- スタイリングの詳細を追加する。
- 他のHTML要素に対応するように拡張する。
- input type="date" はスタイリングが難しいため、muiのDatePickerの使用を検討する。

## COPILOT:
*/
```

## 例2:
```
/**
# "CreateNewTodo.tsx"

## RENDER AS:
- ``` <form/> ```

## DEPENDENCIES:
| type              | name               | role                                                       |
| ----------------- | ------------------ | ---------------------------------------------------------- |
| PARENT COMPONENTS | Main.tsx           | 特になし                                                   |
| CHILD COMPONENT 1 | FormParts.tsx      | フォームの各部品を提供                                     |
| PACKAGE           | react-hook-form    | フォームの状態管理                                         |
| PROVIDER          | CategoriesProvider | カテゴリー情報の提供                                       |
| SETTING           | FormSetting.tsx    | フォームのデフォルト値、プレースホルダー、選択肢などの設定 |
| UTILS             | generateUUID       | 確率的に一意な値を提供。新しい todo の id に使用           |

## FEATURES:
- component

## DESCRIPTION:
- このコンポーネントは、active な category に新しい todo を作成するためのフォームを提供します。
- フォームには、タイトル(title)、詳細(detail)、期限日(deadline: date)、期限時間(deadline: time)、進捗状況(status)、優先度(priority)を入力するフィールドがあります。
- 各フィールドは、FormParts コンポーネントを使用している。
- また、フォームのデフォルト値、プレースホルダー、選択肢などは、FormSetting.tsx で定義されています。

## PROPS:
- このコンポーネントは props を受け取りません。

## STATES:
- このコンポーネントで新たに定義された state はありません。

## FUTURE TASKS:
- フォームのバリデーションを強化する。
- error message を表示する。
- フォームのUIを改善する。

## COPILOT:
- useRefを使用している部分を、react-hook-formのregisterを使用するようにリファクタリングすることを提案します。これにより、フォームの状態管理をよりシンプルにできます。
- useContextを使用している部分を、カスタムフックを使用するようにリファクタリングすることを提案します。これにより、コンポーネントの再利用性とテストの容易性が向上します。
*/
```


# 要件
## 各項目の要件
### コードから取得する項目
- 'ELEMENT': styled-componentsでスタイリングされているHTMLタグを記述してください。
- 'DEPENDENCIES'の'CHILD COMPONENT 1':
  importセクションの'child components'でimportしているファイル名で記述してください。
  typeのカラムには、複数ある場合は'CHILD COMPONENT 2'、'CHILD COMPONENT 3'...と行を追加して記述してください。
  roleのカラムには、unkownを記述してください。
### 固定値をそのまま記述する項目
- 'DEPENDENCIES'の'PARENT COMPONENTS'には、unknownと記述してください。
- 'FEATURES'は、固定で'component'と記述してください。
### コードをレビューして考えて記述する項目
- 'DESCRIPTION': コードを分析して、コンポーネントが提供する機能や役割を箇条書きで記述してください。
- 'FUTURE TASKS': コードをレビューして、今後の展望や修正点を箇条書きで記述してください。
- 'COPILOT': コードをレビューして、リファクタリング案を、詳細に、具体的に、記述してください。
- 'PROPS':
  コンポーネントが引数として受け取っているpropsについて、
  - name: 型定義部分に記述してあるコードから、プロパティ名を記述。
  - type: 型定義部分に記述してあるコードから、typescriptの型を記述。
  - role: コード全体から推測して、その使われ方を記述してください。
  また、propsを受け取っていない場合には、「このコンポーネントは props を受け取りません。」と記述してください。
- 'STATES':
    - neme: コンポーネント内でuseStateフックによって新たに定義されたstateの名前を記述してください。
    - type: コードから、読み取ってstateの型を記述してください。不明な場合はunknownと記述してください。
    - role: コード全体から推測して、その使われ方を記述してください。
  また、コンポーネント内でstateを定義していない場合には、「このコンポーネントで新たに定義された state はありません。」と記述してください。
## 全項目共通の要件
- 記述するものが無い場合にはnullと記述して下さい。