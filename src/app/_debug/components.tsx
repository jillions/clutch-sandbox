/* THIS FILE WAS AUTOGENERATED BY CLUTCH. DO NOT EDIT. */
'use client';

import React, { Component, useMemo, useEffect, useState, useCallback, use } from 'react';
import {
  useRouter,
  usePathname,
  useSearchParams,
  useParams,
} from 'next/navigation';

function mergeProps(slotProps, childProps) {
  const overrideProps = { ...childProps };

  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);

    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          childPropValue(...args);
          slotPropValue(...args);
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === 'style') {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === 'className') {
      overrideProps[propName] = [slotPropValue, childPropValue]
        .filter(Boolean)
        .join(' ');
    }
  }

  return { ...slotProps, ...overrideProps };
}

// workaround until we remove async server components
function unLazyChildren(children: any | undefined) {
  return children?.$$typeof === Symbol.for('react.lazy')
    ? use(children._payload)
    : children;
}

export function cloneChildren(children, { ...props }) {
  delete props['debug-id'];
  delete props['debug-reports'];
  delete props['debug-parent'];
  delete props['debug-loop'];
  delete props['debug-stop'];
  delete props['debug-is-section'];
  delete props['debug-name'];
  delete props['data-d'];

  const cloneChild = (child, index = undefined) => {
    if (React.isValidElement(child)) {
      const clonedElement = React.cloneElement(child, {
        key: index,
        ...mergeProps(child.props, props),
      });

      delete props.ref;

      return clonedElement;
    } else {
      return child;
    }
  };

  return Array.isArray(children)
    ? children.map(cloneChild)
    : cloneChild(children);
}

export class DebugInstanceError extends Component<any> {
  static displayName = 'DebugInstanceError';

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  constructor(props) {
    super(props);
    this.state = {
      hasError: !!this.props.error,
      error: this.props.error,
    }
  }

  componentDidUpdate(prevProps) {
    const { children } = this.props;

    if (prevProps.children !== children && this.state.hasError) {
      window.location.reload();
    }
  }

  render() {
    const { children, cltForwardRef, ...rest } = this.props;

    if (this.state.hasError) {
      return (
        <div
          style={{
            background: '#FAB2BF',
            position: 'relative',
            minWidth: '34px',
            minHeight: '40px',
            ...(this.props.containerStyles || {}),
          }}
          {...rest}
        >
          <div
            style={{
              position: 'absolute',
              top: 10,
              left: 10,
              bottom: 10,
              right: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                maxHeight: '90px',
                maxWidth: '90px',
              }}
            />
          </div>
        </div>
      );
    }

    return cloneChildren(children, {
      ...rest,
      ref: cltForwardRef
    });
  }
}

export const DebugRouting = (props: any) => null;

export const DebugComponent = React.forwardRef<unknown, any>(
  ({ children, ...props }, ref) => {
    if (ref) {
      props.ref = ref;
    }

    const child = unLazyChildren(children);

    return cloneChildren(child, props);
  },
);

export const DebugInstance = React.forwardRef<unknown, any>(
  ({ children, ...props }, ref) => {
    if (ref) {
      props.ref = ref;
    }

    const child = unLazyChildren(children);

    return cloneChildren(child, props);
  },
);

export const DebugReports = React.forwardRef<unknown, any>(
  ({ children, ...props }, ref) => {
    if (ref) {
      props.ref = ref;
    }

    return cloneChildren(children, props);
  },
);

export const DebugInstanceErrorWrapper = React.forwardRef<unknown, any>(
  ({ children, ...props }, ref) => {
    if (ref) {
      props.cltForwardRef = ref;
    }

    return <DebugInstanceError {...props}>{children}</DebugInstanceError>;
  },
);

export const DebugTextEdit = React.forwardRef<unknown, any>(
  ({ children, ...props }, ref) => {
    props.ref = ref;

    return cloneChildren(children, props);
  },
);

DebugRouting.displayName = 'DebugRouting';
DebugComponent.displayName = 'DebugComponent';
DebugInstance.displayName = 'DebugInstance';
DebugReports.displayName = 'DebugReports';
DebugInstanceErrorWrapper.displayName = 'DebugInstanceErrorWrapper';
DebugTextEdit.displayName = 'DebugTextEdit';

export function ClutchNextInspector() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useParams();
  const [hash, setHash] = useState(
    typeof window !== 'undefined' ? window.location.hash : '',
  );

  // Update hash state on hash change
  const handleHashChange = useCallback(() => {
    setHash(typeof window !== 'undefined' ? window.location.hash : '');
  }, [setHash]);

  // Report new hash to inspector AFTER rendering with new params
  useMemo(handleHashChange, [params, handleHashChange]);

  // Listen for stray hash change events
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('hashchange', handleHashChange);

      return () => {
        window.removeEventListener('hashchange', handleHashChange);
      };
    }
  }, [handleHashChange]);

  return (
    <DebugRouting
      router={router}
      pathname={pathname}
      searchParams={searchParams}
      hash={hash}
    />
  );
}
