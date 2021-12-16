import { commonActionTypes } from "../actions/common";

const initialState = {
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case commonActionTypes.LOADING: {
      return {
        loading: true,
      };
    }
    case commonActionTypes.HIEDE_LOADING: {
      return {
        loading: false,
      };
    }
    default:
      return state;
  }
};
