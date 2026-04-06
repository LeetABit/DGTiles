//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import React, { type ReactElement, useMemo, useState } from "react";
import type { CSSObject } from "@emotion/react";
import { cloneElementWithEmotion } from "#/src/lib/cloneElementWithEmotion.js";

export default function Movable(): ReactElement {
    const [dragging, setDragging] = useState();
    const handleDragStart = (e) => {
        console.log(`drag start${e.target}`);
  setDragging(e.target);
};
    return <div css={{ backgroundColor: "red", width: "100px", height: "100px" }}
    draggable={true}
  onDragStart={(e) => handleDragStart(e)}
  onDragEnd={() => setDragging(undefined)}
  onDrag={(e) => {
    if (dragging) {
      dragging.style.left = `${e.pageX}px`;
      dragging.style.top = `${e.pageY}px`;
    }

    </div>
}
