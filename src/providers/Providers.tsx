import React, { FC, ReactNode } from "react";
import { MdeProvider } from "./MdeProvider";
import { ModalProvider } from "./ModalProvider_ver3";
import { CardViewProvider } from "./CardViewProvider";
import { Categories } from "../components/main/tabs/edit_categories_modal/Categories";
import { CategoriesProvider } from "./CategoriesProvider";


interface ProvidersProps {
  children: ReactNode;
}

export const Providers: FC<ProvidersProps> = (props) => {
  const { children } = props;

  return (
      <CategoriesProvider>
        <CardViewProvider>
          <MdeProvider>
            <ModalProvider>
              {children}
            </ModalProvider>
          </MdeProvider>
        </CardViewProvider>
      </CategoriesProvider>
  );
};