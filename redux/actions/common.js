export const commonActionTypes = {
  LOADING: "loading",
  HIEDE_LOADING: "hide_loading",
};

export const loading = () => (dispatch) => {
  dispatch({
    type: commonTypes.LOADING,
  });
};
export const hideLoading = () => (dispatch) => {
  dispatch({
    type: commonTypes.HIEDE_LOADING,
  });
};
