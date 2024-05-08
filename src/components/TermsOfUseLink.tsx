//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { DialogLink } from 'src/components/Dialog';
import TermsOfUse from 'src/documents/TermsOfUse';

export default function TermsOfUseLink() {
    return (
        <DialogLink dialogContent={<TermsOfUse />} to="/termsOfUse" titleBar="Terms of Use">Terms of Use</DialogLink>
    );
}
