//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React, { ReactElement } from 'react';
import Popup from './Popup';

interface DocumentPopupProps {
    element: ReactElement,
    onClose?: () => void,
}

const defaultProps : Partial<DocumentPopupProps> = {
    onClose: undefined,
};

const DocumentPopup : React.FC<DocumentPopupProps> = ({ element, onClose } : DocumentPopupProps) => (
    <Popup onClose={onClose}>
        {element}
    </Popup>
);

DocumentPopup.defaultProps = defaultProps;

export default DocumentPopup;
