import { MutableRefObject, ReactNode } from 'react';

export type ModalName = string & { _nameBrand: never };


// - OTHERS
export type DialogElm     = HTMLDialogElement | null;
export type MaskElm       = HTMLDivElement    | null;
export type ScrollableElm = HTMLElement       | null;

export interface ModalElms {
  basics:       { dialog: DialogElm; mask: MaskElm };
  scrollables:                       ScrollableElm[];
}
export interface ModalsElms {
  [name: ModalName]: ModalElms;
}
export type ModalElmsRef = MutableRefObject<ModalsElms>;
// - CONTEXT
export interface ContextType {
  modalElmsRef: ModalElmsRef;
}
// - PROVIDER
export interface ProviderType {
  children: ReactNode;
}