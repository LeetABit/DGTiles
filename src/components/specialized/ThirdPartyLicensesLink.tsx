//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { DialogLink } from 'src/components/common/Dialog';
import ThirdPartyLicenses from 'src/components/documents/ThirdPartyLicenses';

export default function ThirdPartyLicensesLink() {
    return (
        <DialogLink dialogContent={<ThirdPartyLicenses />} to="/thirdPartyLicenses" titleBar="Third-party Licenses">Third-party Licenses</DialogLink>
    );
}
