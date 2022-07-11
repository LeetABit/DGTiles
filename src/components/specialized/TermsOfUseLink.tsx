//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React from 'react';
import ModalDialogLink from '../common/ModalDialogLink';
import TermsOfUse from '../documents/TermsOfUse';

const TermsOfUseLink : React.FC = () => {
    return (
        <ModalDialogLink content={<TermsOfUse />} to="/termsOfUse">Terms of Use</ModalDialogLink>
    );
};

export default TermsOfUseLink;
