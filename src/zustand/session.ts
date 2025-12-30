import { isObject } from 'utils/functions/isObject';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ZustandSessionModel } from './IZustandSessionModel';

// Config store interface
interface IRootState extends ZustandSessionModel {
  save<K extends keyof ZustandSessionModel, V extends ZustandSessionModel[K]>(key: K, value: V, mode?: 'update'): void;
  hydrated: boolean | undefined;
  changeHydrated(zustandReady: boolean): void;
}

const ZustandSession = create<IRootState>()(
  devtools((set, get) => ({
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
  }))
);

export default ZustandSession;