//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { Optional } from '../Types';
import gitVersion from '../gitVersion.json';

declare interface VersionLabelProps {
    displayDate: Optional<boolean>
}

const versionString : string = `${gitVersion.version
    + ((gitVersion.commitCount > 0) ? `-beta.${gitVersion.commitCount}` : '')
    + ((gitVersion.isDirty) ? '-local' : '')
}+Branch.${gitVersion.branch}`
    + `+Sha.${gitVersion.sha}`
    + `+Timestamp.${gitVersion.buildSafeTime}`;

const VersionLabel : React.FC<VersionLabelProps> = ({ displayDate } : VersionLabelProps) => (
    <>
        <div>
            <span>Version:</span>
            <span>{versionString}</span>
        </div>
        {displayDate && (
            <div>
                <span>Date:</span>
                <span>{gitVersion.buildTime}</span>
            </div>
        )}
    </>
);

export default VersionLabel;
