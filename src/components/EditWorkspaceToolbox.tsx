//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { ReactElement } from 'react';
import Toolbar from 'src/components/Toolbar';
import { useRootSelector } from 'src/hooks/useRootSelector';
import EditTilesButton from './EditTilesButton';
import AddTileButton from './AddTileButton';
import ClearTilesButton from './ClearTilesButton';

interface Props {
    container?: ReactElement,
}

export default function EditWorkspaceToolbox({ container }: Props) {
    const isTileEditorActive = useRootSelector((state) => state.editor.isActive);

    return (
        <Toolbar direction="column" {...container}>
            <EditTilesButton />
            { isTileEditorActive && (
                <>
                    <AddTileButton />
                    <ClearTilesButton />
                </>
            )}
        </Toolbar>
    );
}
