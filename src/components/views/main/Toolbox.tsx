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

export default () => {
    const isTileEditorActive = useAppSelector((state) => state.tileEditor.isActive);

    return (
        <Toolbar direction="column">
            <EditTilesButton />
            { isTileEditorActive
                && (
                    <>
                        <AddTileButton />
                        <ClearTilesButton />
                    </>
                )}
        </Toolbar>
    );
}
