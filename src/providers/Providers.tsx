import React, { FC, ReactNode } from "react";
import { MdeProvider } from "./MdeProvider";
import { ModalProvider } from "./ModalProvider";
import { Categories } from "../components/main/tabs/edit_categories_modal/Categories";
import { CategoriesProvider } from "./CategoriesProvider";


interface ProvidersProps {
  children: ReactNode;
}

export const Providers: FC<ProvidersProps> = (props) => {
  const { children } = props;

  return (
      <CategoriesProvider>
      <MdeProvider>
        <ModalProvider>
          {children}
        </ModalProvider>
      </MdeProvider>
      </CategoriesProvider>
  );

};