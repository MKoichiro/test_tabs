// プロジェクト全体のcssでのみ使いたい場合はglobalStyles.tsに記述
// ここには、プロジェクト全体のcssとcomponentでも参照したいものを定義

export interface ContentsWidthType {
  pc: number;
  tb: number;
  sp: number;
}
export const $contentsWidth: ContentsWidthType = {
  pc: 70,
  tb: 70,
  sp: 90,
};