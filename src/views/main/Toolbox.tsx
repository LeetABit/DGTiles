//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { ReactElement } from 'react';
import EditWorkspaceToolbox from 'src/components/EditWorkspaceToolbox';

interface Props {
    container?: ReactElement,
}

export default function Toolbox({ container }: Props) {
    return <EditWorkspaceToolbox {...container} />;
}
