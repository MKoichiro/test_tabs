// modal name のリテラルを定義
// 新規modalを追加する際はここに追加する
// 名前の重複は許されない

import { ModalName } from "../../../providers/types/modal";

export const modalNames: { [key: string]: ModalName } = {
  editCategories: 'edit-categories' as ModalName,
  cardCarousel:   'card-carousel'   as ModalName,
};