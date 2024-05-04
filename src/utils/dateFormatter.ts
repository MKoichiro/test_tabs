export const getFormattedDate = (dateISOStr: string) => {
    const date = new Date(dateISOStr);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
};
export const getFormattedTime = (dateISOStr: string) => {
    const date = new Date(dateISOStr);
    return `${date.getHours()}:${date.getMinutes()}`;
};

// 1. new Date()でDate型に復元してからformatするのが良いか、
// 2. そのまま文字列操作してformatするのが良いか、

// copilot
// 1. new Date()でDate型に復元してからformatする：
// 利点：JavaScriptの組み込みDateオブジェクトのメソッドを使用できるため、コードが読みやすくなります。また、Dateオブジェクトはタイムゾーンの変換や日付の計算など、複雑な操作をサポートしています。
// 欠点：ブラウザ間でのDateオブジェクトの挙動の違いや、特定の日付形式の解析の問題がある場合があります。また、ISO 8601形式以外の日付文字列を解析する場合、結果はブラウザによります。

// 2. 文字列操作でformatする：
// 利点：ブラウザ間での挙動の違いを避けることができます。また、特定の日付形式を扱う場合、文字列操作の方が直感的である場合があります。
// 欠点：コードが複雑になる可能性があります。また、タイムゾーンの変換や日付の計算など、複雑な操作を行う場合、自分で実装する必要があります。

// 以下2のパターン、copilotで生成。未検証だが、見た感じ正常に動きそう。
// export const getFormattedDate = (dateISOStr: string) => {
//     const [year, month, day] = dateISOStr.split('T')[0].split('-');
//     return `${year}/${month}/${day}`;
// };

// export const getFormattedTime = (dateISOStr: string) => {
//     const [hour, minute] = dateISOStr.split('T')[1].split(':');
//     return `${hour}:${minute}`;
// };