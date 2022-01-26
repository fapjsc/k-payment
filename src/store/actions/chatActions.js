import chatActionTypes from '../types/chatTypes';

export const temp = () => {};

export const setChatSession = (chatList) => ({
  type: chatActionTypes.SET_CHAT_SESSION,
  payload: chatList,
});
