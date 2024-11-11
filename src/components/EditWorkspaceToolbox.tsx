//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import Toolbar from 'src/components/Toolbar';
import { useRootSelector } from 'src/hooks/useRootSelector';
import EditTilesButton from './EditTilesButton';
import AddTileButton from './AddTileButton';
import ClearTilesButton from './ClearTilesButton';

export default function EditWorkspaceToolbox() {
    const isTileEditorActive = useRootSelector((state) => state.editor.isActive);

    return (
        <Toolbar direction="column">
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
