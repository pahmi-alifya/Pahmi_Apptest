import { contactActionTypes } from "../actions/contact";

const initialState = {
  contacts: [],
  detaiLContact: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case contactActionTypes.GET_CONTACT: {
      const response = action.payload.data;
      return {
        ...state,
        contacts: response,
      };
    }
    case contactActionTypes.GET_DETAIL_CONTACT: {
      const response = action.payload.data;
      return {
        ...state,
        detaiLContact: response,
      };
    }
    default:
      return state;
  }
};
