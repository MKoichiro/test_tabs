import React from 'react';
import { GlobalInputRef } from './GlobalInputRef';
import { GlobalSelectRef } from './GlobalSelectRef';
import { GlobalElementRef } from './GlobalElementRef';

export const GlobalRef = ({ children }: { children: React.ReactNode }) => {
    return (
        <GlobalInputRef>
            <GlobalSelectRef>
                <GlobalElementRef>
                {children}
                </GlobalElementRef>
            </GlobalSelectRef>
        </GlobalInputRef>
    );
};
