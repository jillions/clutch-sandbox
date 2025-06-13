'use client';

import React, {
  createContext,
  forwardRef,
  useContext,
  useMemo,
  useState,
  use,
} from 'react';
import { storeFactory, cloneChildren } from 'clutch';
import { useStore, createStore, StoreApi } from 'zustand';

type TClutchComponentContext = {
  componentStore: StoreApi<unknown>;
  rootInstances: string[];
};

export const ClutchComponentContext = createContext<TClutchComponentContext>({
  componentStore: null,
  rootInstances: [],
});
ClutchComponentContext.displayName = 'ClutchComponentContext';


export const useClutchComponentContext = () => {
  return useContext(ClutchComponentContext);
};

function createClutchComponentStore() {
  return createStore((set) => storeFactory(set));
}

export const useClutchComponentStore = (selector: (state: any) => any) => {
  const { componentStore } = useClutchComponentContext();

  if (!componentStore) {
    return null;
  }

  return useStore(componentStore, selector);
};

export const ClutchComponentContextProvider = forwardRef(
  (
    {
      instanceId,
      children,
      isSlotScope,
      ...props
    }: {
      instanceId: string;
      children: React.ReactNode;
      isSlotScope?: boolean; // when true, removes the last instance from the rootInstances array, indicating that the content is outside the component composition
      [key: string]: any; // additional props to pass down
    },
    ref,
  ) => {
    const context = useClutchComponentContext();

    const [componentStore] = useState(createClutchComponentStore);

    const updatedContextValue = useMemo(() => {
      const rootInstances = [...(context.rootInstances || [])];

      if (isSlotScope) {
        rootInstances.pop();
      } else {
        rootInstances.push(instanceId);
      }

      return {
        rootInstances,
        componentStore,
      };
    }, [instanceId, componentStore, context?.rootInstances, isSlotScope]);

    const child =
      children?.$$typeof === Symbol.for('react.lazy')
        ? use(children._payload)
        : children;

    return (
      <ClutchComponentContext.Provider value={updatedContextValue}>
        {cloneChildren(child, props)}
      </ClutchComponentContext.Provider>
    );
  },
);
ClutchComponentContextProvider.displayName = 'ClutchComponentContextProvider';

