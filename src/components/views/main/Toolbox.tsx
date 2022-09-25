//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import Toolbar from 'src/components/common/Toolbar';
import EditTilesButton from 'src/components/specialized/EditTilesButton';
import AddTileButton from 'src/components/specialized/AddTileButton';
import { useAppSelector } from 'src/hooks/stateHooks';
import ClearTilesButton from 'src/components/specialized/ClearTilesButton';

export default function Toolbox() {
    const isTileEditorActive = useAppSelector((state) => state.editor.isActive);

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
