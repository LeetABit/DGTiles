//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import ClosableBox from '../../common/ClosableBox';
import FlowContainer from '../../common/FlowContainer';
import { removeItem } from '../../../states/tiles';
import { useAppDispatch, useAppSelector } from '../../../hooks/stateHooks';

export default () => {
    const items = useAppSelector((state) => state.tiles.items);
    const dispatch = useAppDispatch();

    return (
        <FlowContainer>
            {/* TODO: each item shall be validated as its origin is unknown. */}
            {items.map((item) => <ClosableBox onClose={() => dispatch(removeItem(item.id))} key={item.id}>{item.id}</ClosableBox>)}
        </FlowContainer>
    );
}
