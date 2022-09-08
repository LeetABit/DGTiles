//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import Toolbar from '../../common/Toolbar';
import EditTilesButton from '../../specialized/EditTilesButton';
import AddTileButton from '../../specialized/AddTileButton';
import { useAppSelector } from '../../../hooks/stateHooks';
import ClearTilesButton from '../../specialized/ClearTilesButton';
import AddFunctionButton from '../../specialized/AddFunctionButton';
import functions from '../../../framework/functions';

export default function Toolbox() {
    const [isTileEditorActive, editedItemIndex] = useAppSelector((state) => [state.editor.isActive, state.tiles.editedItemIndex]);

    return (
        <Toolbar direction="column">
            <EditTilesButton />
            { isTileEditorActive && (
                <>
                    <AddTileButton />
                    <ClearTilesButton />
                </>
            )}
            { editedItemIndex !== -1 && (
                functions.map((f, i) => <AddFunctionButton functionName={f.name} functionIndex={i} key={f.name} />)
            )}
        </Toolbar>
    );
}
