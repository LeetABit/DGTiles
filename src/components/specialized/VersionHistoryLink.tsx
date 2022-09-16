//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { DialogLink } from '../common/Dialog';
import VersionHistory from '../documents/VersionHistory';

export default function VersionHistoryLink() {
    return (
        <DialogLink content={<VersionHistory />} to="/versionHistory" titleBarContent="Version History">Version History</DialogLink>
    );
}
