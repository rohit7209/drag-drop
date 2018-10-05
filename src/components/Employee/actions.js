import {
  EMP_UPDATE_LIST,
  EMP_INITIAL_LIST,
} from './constants';

export const updateList = (payload) => ({
  type: EMP_UPDATE_LIST,
  payload
});

export const setInitialList = (payload) => ({
  type: EMP_INITIAL_LIST,
  payload
});
