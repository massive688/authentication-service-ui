import { AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: any) => T) => T },
) => void;
