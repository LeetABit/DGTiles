//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { DialogLink } from '../common/Dialog';
import TermsOfUse from '../documents/TermsOfUse';

export default () => (
    <DialogLink content={<TermsOfUse />} labeledBy="h1" to="/termsOfUse">Terms of Use</DialogLink>
);
