import React, { JSX, useRef } from 'react'

type DistributiveOmit<T, U> = T extends any
  ? Pick<T, Exclude<keyof T, U>>
  : never;

  type PropsOf<T extends React.ElementType> = React.ComponentPropsWithRef<T>

  type PolymorphicRef<T extends React.ElementType> =
  React.ComponentPropsWithRef<T>['ref']

  type PolymorphicProps<
  T extends React.ElementType = React.ElementType,
  TProps = {}
> = {
  as?: T
} & TProps &
  DistributiveOmit<PropsOf<T>, keyof TProps | 'as' | 'ref'> & { ref?: PolymorphicRef<T> }

  type BaseTypographyProps = {
  variant: 'heading' | 'paragraph'
}

type TypographyProps<T extends React.ElementType = 'span'> = PolymorphicProps<
  T,
  BaseTypographyProps
>

type TypographyComponent = <T extends React.ElementType = 'span'>(
  props: PolymorphicProps<T, TypographyProps<T>>
) => JSX.Element | null


export default function Wrapper<T extends React.ElementType = 'span'>({
    extraProps,
    extraAttributes,
    extraStyle,
    fallbackContainer,
    children,
}: ContainerProps<T>): ReactElement {
    if (fallbackContainer === undefined) {
        if (React.isValidElement(children)) {
            return cloneElementWithEmotion(children, extraStyle, {
                ...extraProps,
                ...extraAttributes,
            });
        }

        return <div css={extraStyle} {...extraProps} {...extraAttributes}>{children}</div>;
    }

    return cloneElementWithEmotion(fallbackContainer, extraStyle, {
        ...extraProps,
        ...extraAttributes,
    }, children);
}


const Typography: TypographyComponent = React.forwardRef(
  <T extends React.ElementType = 'span'>(
    props: TypographyProps<T>,
    ref: PolymorphicRef<T>
  ) => {
    const { as, ...rest } = props
    const Component = as ?? 'span'
    return <Component ref={ref} {...rest} />
  }
)

