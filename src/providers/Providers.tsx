import React, { PropsWithChildren } from 'react';
import { Mde } from './context_api/Mde';
import { ModalElmsRef } from './context_api/ModalElmsRef';
import { CardView } from './context_api/CardView';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { GlobalRef } from './context_api/global_ref/GlobalRef';

interface ProvidersProps {}

export const Providers = ({ children }: PropsWithChildren<ProvidersProps>) => {
    return (
        <Provider store={store}>
            <GlobalRef>
                <ModalElmsRef>
                    <CardView>
                        <Mde>{children}</Mde>
                    </CardView>
                </ModalElmsRef>
            </GlobalRef>
        </Provider>
    );
};
