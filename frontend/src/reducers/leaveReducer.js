import {
    TRAINERLEAVE_CREATE_FAIL,
    TRAINERLEAVE_CREATE_REQUEST,
    TRAINERLEAVE_CREATE_SUCCESS,
    TRAINERLEAVE_DELETE_FAIL,
    TRAINERLEAVE_DELETE_REQUEST,
    TRAINERLEAVE_DELETE_SUCCESS,
    TRAINERLEAVE_LIST_FAIL,
    TRAINERLEAVE_LIST_REQUEST,
    TRAINERLEAVE_LIST_SUCCESS,
    TRAINERLEAVE_UPDATE_FAIL,
    TRAINERLEAVE_UPDATE_REQUEST,
    TRAINERLEAVE_UPDATE_SUCCESS,
    ADMINCONFORMLEAVE_LIST_FAIL,
    ADMINCONFORMLEAVE_LIST_REQUEST,
    ADMINCONFORMLEAVE_LIST_SUCCESS,
    ADMINCONFORMLEAVE_UPDATE_FAIL,
    ADMINCONFORMLEAVE_UPDATE_REQUEST,
    ADMINCONFORMLEAVE_UPDATE_SUCCESS,
    
  } from "../constants/leaveConstants";


export const TrainerLeaveListReducer = (state = { leave: [] }, action) => {
    switch (action.type) {
      case TRAINERLEAVE_LIST_REQUEST:
        return { loading: true };
      case TRAINERLEAVE_LIST_SUCCESS:
        return { loading: false, trainerLeave: action.payload };
      case TRAINERLEAVE_LIST_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };

  export const LeaveCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case TRAINERLEAVE_CREATE_REQUEST:
        return { loading: true };
      case TRAINERLEAVE_CREATE_SUCCESS:
        return { loading: false, success: true };
      case TRAINERLEAVE_CREATE_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };

  export const LeaveUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case TRAINERLEAVE_UPDATE_REQUEST:
        return { loading: true };
      case TRAINERLEAVE_UPDATE_SUCCESS:
        return { loading: false, success: true };
      case TRAINERLEAVE_UPDATE_FAIL:
        return { loading: false, error: action.payload, success: false };
  
      default:
        return state;
    }
  };

  export const LeaveDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case TRAINERLEAVE_DELETE_REQUEST:
        return { loading: true };
      case TRAINERLEAVE_DELETE_SUCCESS:
        return { loading: false, success: true };
      case TRAINERLEAVE_DELETE_FAIL:
        return { loading: false, error: action.payload, success: false };
  
      default:
        return state;
    }
  };

  export const AdminConformLeaveListReducer = (state = { leave: [] }, action) => {
    switch (action.type) {
      case ADMINCONFORMLEAVE_LIST_REQUEST:
        return { loading: true };
      case ADMINCONFORMLEAVE_LIST_SUCCESS:
        return { loading: false, trainerLeave: action.payload };
      case ADMINCONFORMLEAVE_LIST_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };

  export const AdminConformLeaveUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case ADMINCONFORMLEAVE_UPDATE_REQUEST:
        return { loading: true };
      case ADMINCONFORMLEAVE_UPDATE_SUCCESS:
        return { loading: false, success: true };
      case ADMINCONFORMLEAVE_UPDATE_FAIL:
        return { loading: false, error: action.payload, success: false };
  
      default:
        return state;
    }
  };
