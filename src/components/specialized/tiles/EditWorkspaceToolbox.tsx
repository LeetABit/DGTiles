//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import Toolbar from '../../common/Toolbar';
import ToggleEditorButton from './editing/ToggleEditorButton';
import AddTileButton from './AddTileButton';
import { useAppSelector } from '../../../hooks/stateHooks';
import ClearTilesButton from './ClearTilesButton';

export default function EditWorkspaceToolbox() {
    const isTileEditorActive = useAppSelector((state) => state.tiles.isEditorActive);

    return (
        <Toolbar direction="column">
            <ToggleEditorButton />
            { isTileEditorActive && (
                <>
                    <AddTileButton />
                    <ClearTilesButton />
                </>
            )}
        </Toolbar>
    );
}
