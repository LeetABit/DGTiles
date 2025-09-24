//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import * as GridLocation from './private/GridLocation';
import * as GridLocationBuilder from './private/GridLocationBuilder';
import { Grid, GridItem } from '../Grid';
import React, { type ReactElement } from 'react';
import {
    type WellKnownElement,
    getPropByName,
    isTagElement,
    isWellKnownElement
} from '#/src/types/WellKnownProps';
import type { DockDirection } from './types';

export const dockDirectionPropName = 'dock-direction';
export const dockContainerPropName = 'dock-container';
export const dockAcceptStylePropName = 'dock-accept-style';

interface Props {
    container?: ReactElement,
}

interface GridItemTemplate {
    child: WellKnownElement,
    container?: ReactElement,
    location: GridLocation.GridLocation,
}

/**
 * React component that facilitates docking layout using CSS grid.
 * @param {React.PropsWithChildren<Props>} props Component properties.
 * @param {ReactElement | null} [props.container = <div />] Element that shall
 * be used as a container for the item.
 * @param {ReactElement} [props.children] Children elements.
 * @returns {ReactElement} Dock component.
 * @throws {Error} If a child is not a React Component or HTML element.
 * @throws {Error} If a child does not have a valid direction string prop.
 * @throws {Error} If more than one fill container is provided.
 * @throws {Error} If an unsupported direction is provided.
 */
export default function Dock(
    {container = <div />, children}: React.PropsWithChildren<Props>
): ReactElement {
    const gridItemTemplates: GridItemTemplate[] = [];
    let builder = GridLocationBuilder.create();
    let recursiveChildren: React.ReactNode[] | undefined =
        React.Children.toArray(children);

    while (recursiveChildren !== undefined) {
        const currentChildren = recursiveChildren;
        recursiveChildren = undefined;

        for (const child of currentChildren) {
            const childElement = verifyDockChild(child);
            const itemContainer = getPropByName(
                childElement,
                dockContainerPropName);
            const direction = getPropByName(
                childElement,
                dockDirectionPropName);
            const acceptsStyle = getPropByName(
                childElement,
                dockAcceptStylePropName);

            verifyDirection(direction);

            const childContainer = React.isValidElement(itemContainer)
                ? itemContainer
                : undefined;

            const [updatedBuilder, childLocation] =
                GridLocationBuilder.insert(builder, direction);
            builder = updatedBuilder;

            if (direction === 'fill') {
                if (recursiveChildren !== undefined) {
                    throw new Error('Dock supports only one fill container.');
                }

                recursiveChildren = verifyFillChild(
                    childElement,
                    childContainer !== undefined,
                    acceptsStyle === true
                );
                if (recursiveChildren !== undefined) {
                    continue;
                }
            }

            gridItemTemplates.push({
                child: childElement,
                container: childContainer,
                location: childLocation,
            });
        }
    }

    const [columnsTemplate, rowsTemplate] =
        GridLocationBuilder.getTemplate(builder);

    const gridItems = gridItemTemplates.map(
        ({
            child,
            container: childContainer,
            location,
        }, index) => {
            const absoluteLocation = GridLocation.toAbsolute(location, builder);
            const gridItemLocation = {
                columnEnd:  absoluteLocation.column.end,
                columnStart: absoluteLocation.column.start,
                rowEnd: absoluteLocation.row.end,
                rowStart: absoluteLocation.row.start,
            };
            return (
            <GridItem key={index}
                      container={childContainer}
                      location={gridItemLocation}>
                {child}
            </GridItem>
            );
        }
    );

    return (
        <Grid container={container}
              templates={{
                columns: columnsTemplate,
                rows: rowsTemplate
              }}
        >
            {gridItems}
        </Grid>
    );
}

/**
 * Verifies that a fill child is valid and returns its children if it is a Dock
 * component without a container.
 * @param {WellKnownElement} child The fill child to verify.
 * @param {boolean} hasContainer Whether the child has a container.
 * @param {boolean} acceptsStyle Whether the child or container accepts style.
 * @returns {Exclude<React.ReactNode, boolean | null | undefined>[] | undefined}
 * The children of the fill child if it is valid, undefined otherwise.
 * @throws {Error} If the fill child is a Dock component without a container and
 * the item container is not valid.
 */
function verifyFillChild(
    child: WellKnownElement,
    hasContainer: boolean,
    acceptsStyle: boolean
):
    Exclude<React.ReactNode, boolean | null | undefined>[] | undefined {

    if (child.type === Dock && !hasContainer) {
        return React.Children.toArray(child.props?.children);
    } else if (
        !hasContainer &&
        !isTagElement(child) &&
        !acceptsStyle) {
        throw new Error(
            'Dock requires a container element for non HTML fill elements.'
        );
    }

    return undefined;
}

/**
 * Verifies that a child is a well-known element (React component or HTML
 * element) and throws an error if it is not.
 * @param {React.ReactNode} child The child to verify.
 * @returns {WellKnownElement} The verified well-known element.
 * @throws {Error} If the child is not a well-known element.
 */
function verifyDockChild(child: React.ReactNode): WellKnownElement {
    if (!isWellKnownElement(child)) {
        throw new Error(
            'Dock only supports React Components and HTML elements.'
        );
    }

    if (typeof child.type !== 'function' &&
        typeof child.type !== 'string') {
        throw new Error(
            'Dock only supports React Components and HTML elements.'
        );
    }

    return child;
}

/**
 * Checks if the given value is a valid DockDirection.
 * @param {unknown} direction The value to check.
 * @returns {boolean} True if the value is a valid DockDirection,
 * false otherwise.
 * @throws {Error} If the value is not a valid DockDirection.
 */
function isDockDirection(direction: unknown): direction is DockDirection {
    return direction !== undefined &&
        direction !== null &&
        typeof direction === 'string' &&
        (direction === 'left' ||
        direction === 'right' ||
        direction === 'top' ||
        direction === 'bottom' ||
        direction === 'fill');
}

/**
 * Asserts that the given value is a valid DockDirection.
 * @param {unknown} direction The value to check.
 * @throws {Error} If the value is not a valid DockDirection.
 */
function verifyDirection(direction: unknown)
    : asserts direction is DockDirection {
    if (!isDockDirection(direction)) {
        throw new Error(
            'Dock requires a valid direction string prop.'
        );
    }
}
