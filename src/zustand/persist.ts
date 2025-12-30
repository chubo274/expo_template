import AsyncStorage from '@react-native-async-storage/async-storage';
import { isObject } from 'utils/functions/isObject';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { ZustandPersistModel } from './IZustandPersistModel';

// Config store interface
interface IRootState extends ZustandPersistModel {
  save<K extends keyof ZustandPersistModel, V extends ZustandPersistModel[K]>(key: K, value: V, mode?: 'update'): void;
  hydrated: boolean | undefined;
  changeHydrated(zustandReady: boolean): void;
}

const ZustandPersist = create<IRootState>()(devtools(persist(
  (set, get) => ({
    hydrated: undefined,
    save: (key, value, mode) => {
      const prevState = get()?.[key];
      if (mode && Boolean(prevState) && isObject(value)) {
        if (!(isObject(prevState))) throw new Error(`typeof ${key} maybe not is object`);
        return set({ [key]: { ...prevState as object, ...value as object } });
      }

      return set({ [key]: value });
    },
    changeHydrated: (nextState: boolean) => set({ hydrated: nextState })
  }),
  {
    name: 'Zustand-Persist',
    storage: createJSONStorage(() => AsyncStorage),

    onRehydrateStorage: () => (state) => {
      console.info('🚀 Rehydration started', state);
      state?.changeHydrated(true);
    },
  }))
);

export default ZustandPersist;

/**
 * Helper to select multiple fields from persist store with shallow comparison
 * @param keys - Array of keys to select from store
 * @returns Object with selected fields
 */
// export const useSelectorPersist = <K extends keyof ZustandPersistModel>(
//   ...keys: K[]
// ): Pick<ZustandPersistModel, K> => {
//   return ZustandPersist(
//     useShallow((state: IRootState) => {
//       const result = {} as Pick<ZustandPersistModel, K>;
//       keys.forEach(key => {
//         result[key] = state[key];
//       });
//       return result;
//     })
//   );
// };
