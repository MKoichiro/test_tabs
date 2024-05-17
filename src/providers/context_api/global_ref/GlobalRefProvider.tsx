import React from 'react';
import { GlobalInputRef } from './GlobalInputRef';
import { GlobalSelectRef } from './GlobalSelectRef';

export const GlobalRef = ({ children }: { children: React.ReactNode }) => {
    return (
        <GlobalInputRef>
            <GlobalSelectRef>{children}</GlobalSelectRef>
        </GlobalInputRef>
    );
};
