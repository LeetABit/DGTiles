//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import ClosableBox from '../../common/ClosableBox';
import FlowContainer from '../../common/FlowContainer';
import { removeItem } from '../../../states/tileEditor';
import { useAppDispatch, useAppSelector } from '../../../hooks/stateHooks';

export default () => {
    const items = useAppSelector((state) => state.tileEditor.items);
    const dispatch = useAppDispatch();

    const remove = (index: number) => {
        dispatch(removeItem(index));
    }

    return (
        <FlowContainer>
            {items.map((item, index) => <ClosableBox onClose={() => remove(index)} key={item}>WIP</ClosableBox>)}
        </FlowContainer>
    );
}
