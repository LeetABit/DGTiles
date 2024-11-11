//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { createContext, useEffect, useState } from 'react';

export type ScreenOrientation = 'Landscape' | 'Portrait';

const getScreenOrientation = () => {
    return window.innerWidth > window.innerHeight ? 'Landscape' : 'Portrait';
}

export const ScreenOrientationContext = createContext<ScreenOrientation>(getScreenOrientation())

export default function ScreenOrientationProvider({ children }: React.PropsWithChildren) {
    const [screenOrientation, setScreenOrientation] = useState<ScreenOrientation>(getScreenOrientation());

    useEffect(() => {
        const handleResize = () => {
            setScreenOrientation(getScreenOrientation());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <ScreenOrientationContext.Provider value={screenOrientation}>
            {children}
        </ScreenOrientationContext.Provider>
    );
}
