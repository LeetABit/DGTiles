//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import ClosableBox from '../../common/ClosableBox';
import FlowContainer from '../../common/FlowContainer';
import { removeTile } from '../../../states/tiles';
import { useAppDispatch, useAppSelector } from '../../../hooks/stateHooks';

export default () => {
    const items = useAppSelector((state) => state.tiles.items);
    const dispatch = useAppDispatch();

    return (
        <FlowContainer>
            {items.map((item) => <ClosableBox onClose={() => dispatch(removeTile(item.id))} key={item.id}>{item.id}</ClosableBox>)}
        </FlowContainer>
    );
}
