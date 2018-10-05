import {
  EMP_UPDATE_LIST,
  EMP_INITIAL_LIST,
} from './constants';


const initialState = {
  list: {},
  updatedList: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case EMP_UPDATE_LIST:
      return Object.assign({}, state, {
        updatedList: action.payload,
      });
    case EMP_INITIAL_LIST:
      console.log(action.payload);
      return Object.assign({}, state, {
        list: action.payload,
        updatedList: action.payload,
      });
    default:
      return state;
  }
};