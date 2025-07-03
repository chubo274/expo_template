import { create } from 'zustand';
import { IZustandSession } from './IZustandSession';

// Config store
interface IRootState extends IZustandSession {
  save<K extends keyof IZustandSession, V extends IZustandSession[K]>(key: K, value: V, mode?: 'update'): void;
}

const ZustandSession = create<IRootState>()(
  (set, get) => ({
    save: (key, value, mode) => {
      const prevState = get()?.[key];
      if (mode && Boolean(prevState)) {

        if (typeof prevState === 'object' && !Array.isArray(prevState)) {
          return set({
            // @ts-ignore
            [key]: { ...prevState, ...value },
          });
        }

        console.error(`typeof ${key} maybe not is object or undefined`);
        return;
      }

      return set({ [key]: value });
    },
  }),
);

export default ZustandSession;