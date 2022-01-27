import _ from 'lodash';
import chatActionTypes from '../types/chatTypes';

export const temp = () => {};

export const chatReducers = (state = [], action) => {
  switch (action.type) {
    case chatActionTypes.SET_CHAT_SESSION:
      if (_.isArray(action.payload)) {
        return {
          chatSessions: action.payload.reverse(),
          loading: false,
        };
      }
      return {
        chatSessions: [...state.chatSessions, action.payload],
        loading: false,
      };

    case chatActionTypes.SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};
