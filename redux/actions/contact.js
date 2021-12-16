import api from "../../api";
import { commonActionTypes } from "./common";

export const contactActionTypes = {
  GET_CONTACT: "get_contact",
  GET_DETAIL_CONTACT: "get_detail_contact",
};

export const getContact = (params) => (dispatch) =>
  new Promise(function (resolve, reject) {
    dispatch({ type: commonActionTypes.LOADING });
    api
      .get("contact", params)
      .then(({ data }) => {
        if (data) {
          dispatch({ type: commonActionTypes.HIEDE_LOADING });
          dispatch({
            type: contactActionTypes.GET_CONTACT,
            payload: data,
          });
          resolve(data);
        }
        dispatch({ type: commonActionTypes.HIEDE_LOADING });
      })
      .catch(({ message }) => {
        console.error(message);
        dispatch({ type: commonActionTypes.HIEDE_LOADING });
      });
  });

export const getDetailContact = (id) => (dispatch) =>
  new Promise(function (resolve, reject) {
    dispatch({ type: commonActionTypes.LOADING });
    api
      .get(`contact/${id}`)
      .then(({ data }) => {
        if (data) {
          dispatch({ type: commonActionTypes.HIEDE_LOADING });
          dispatch({
            type: contactActionTypes.GET_DETAIL_CONTACT,
            payload: data,
          });
          resolve(data);
        }
        dispatch({ type: commonActionTypes.HIEDE_LOADING });
      })
      .catch(({ message }) => {
        console.error(message);
        dispatch({ type: commonActionTypes.HIEDE_LOADING });
      });
  });

export const postCreateContact = (params) => (dispatch) =>
  new Promise(function (resolve, reject) {
    dispatch({ type: commonActionTypes.LOADING });
    api
      .post(`contact`, params)
      .then(({ data }) => {
        if (data) {
          dispatch({ type: commonActionTypes.HIEDE_LOADING });
          dispatch(getContact());
          resolve(data);
        }
        console.log(data);
        dispatch({ type: commonActionTypes.HIEDE_LOADING });
      })
      .catch(({ message }) => {
        console.error(message);
        dispatch({ type: commonActionTypes.HIEDE_LOADING });
      });
  });

export const putUpdateContact = (id, params) => (dispatch) =>
  new Promise(function (resolve, reject) {
    dispatch({ type: commonActionTypes.LOADING });
    console.log("params", params);
    api
      .put(`contact/${id}`, params)
      .then(({ data }) => {
        if (data) {
          dispatch({ type: commonActionTypes.HIEDE_LOADING });
          dispatch({
            type: contactActionTypes.GET_DETAIL_CONTACT,
            payload: data,
          });
          console.log(data);
          resolve(data);
        }
        dispatch({ type: commonActionTypes.HIEDE_LOADING });
      })
      .catch(({ message }) => {
        console.error(message);
        dispatch({ type: commonActionTypes.HIEDE_LOADING });
      });
  });

export const deleteContact = (id) => (dispatch) =>
  new Promise(function (resolve, reject) {
    dispatch({ type: commonActionTypes.LOADING });
    api
      .delete(`contact/${id}`)
      .then(({ data }) => {
        if (data) {
          dispatch({ type: commonActionTypes.HIEDE_LOADING });
          dispatch(getContact());
          resolve(data);
        }
        dispatch({ type: commonActionTypes.HIEDE_LOADING });
      })
      .catch(({ message }) => {
        console.error(message);
        dispatch({ type: commonActionTypes.HIEDE_LOADING });
      });
  });
