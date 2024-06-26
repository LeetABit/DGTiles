//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { DialogLink } from 'src/components/Dialog';
import VersionHistory from 'src/documents/VersionHistory';

export default function VersionHistoryLink() {
    return (
        <DialogLink dialogContent={<VersionHistory />} to="/versionHistory" titleBar="Version History">Version History</DialogLink>
    );
}
