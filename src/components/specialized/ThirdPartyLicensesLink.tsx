//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { DialogLink } from '../common/Dialog';
import ThirdPartyLicenses from '../documents/ThirdPartyLicenses';

export default function ThirdPartyLicensesLink() {
    return (
        <DialogLink content={<ThirdPartyLicenses />} to="/thirdPartyLicenses" titleBarContent="Third-party Licenses">Third-party Licenses</DialogLink>
    );
}
