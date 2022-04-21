import React from 'react';
import { useSelector } from 'react-redux';
import { getCurrentTheme } from '../../stores/selectors/theme.selector';

export function withTheme(
    WrappedComponent: React.ComponentType,
  ) {
    const displayName =
      WrappedComponent.displayName || WrappedComponent.name || 'Component';

    const ComponentWithTheme = (props: any) => {
      const themeProps = useSelector(getCurrentTheme);

      return <WrappedComponent {...themeProps} {...(props as any)} />;
    };

    ComponentWithTheme.displayName = `withTheme(${displayName})`;

    return ComponentWithTheme;
  }