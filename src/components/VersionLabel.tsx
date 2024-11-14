//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import { ReactElement, useMemo } from 'react';
import gitVersion from 'src/gitVersion.g.json';
import { cloneElementWithEmotion } from 'src/types';

interface Props {
    displayDate?: boolean,
    container?: ReactElement,
}

const baseStyle: CSSObject = {
    marginTop: 'auto',
    marginBottom: 'auto',
}

const versionString : string = `${gitVersion.major}.${gitVersion.minor}.${gitVersion.patch}${
    ((gitVersion.commitCount > 0) ? `-beta.${gitVersion.commitCount}` : '')
    + ((gitVersion.isDirty) ? '-local' : '')
}+Branch.${gitVersion.branch}`
    + `+Sha.${gitVersion.sha}`
    + `+Timestamp.${gitVersion.safeTimestamp}`;

export default function VersionLabel({ displayDate = false, container = <div /> }: Props) {
    return useMemo(() => cloneElementWithEmotion(
        container,
        baseStyle,
        undefined,
        <>
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
        </>,
    ), [container, displayDate]);
}
