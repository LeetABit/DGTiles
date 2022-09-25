//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import gitVersion from 'src/gitVersion.g.json';

interface Props {
    displayDate?: boolean
}

const versionString : string = `${gitVersion.major}.${gitVersion.minor}.${gitVersion.patch}${
    ((gitVersion.commitCount > 0) ? `-beta.${gitVersion.commitCount}` : '')
    + ((gitVersion.isDirty) ? '-local' : '')
}+Branch.${gitVersion.branch}`
    + `+Sha.${gitVersion.sha}`
    + `+Timestamp.${gitVersion.safeTimestamp}`;

const style: CSSObject = {
    position: 'absolute',
    bottom: '0px',
}

export default function VersionLabel({ displayDate = false }: Props) {
    return (
        <div css={style}>
            <div>
                <span>Version:</span>
                <span>{versionString}</span>
            </div>
            {displayDate && (
                <div>
                    <span>Date:</span>
                    <span>{gitVersion.timestamp}</span>
                </div>
            )}
        </div>
    );
}
