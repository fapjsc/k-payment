import chatActionTypes from '../types/chatTypes';

export const setLoading = () => ({
  type: chatActionTypes.SET_LOADING,
});

export const setChatSession = (chatList) => ({
  type: chatActionTypes.SET_CHAT_SESSION,
  payload: chatList,
});

export const setChatFullscreen = (value) => ({
  type: chatActionTypes.FULL_SCREEN,
  payload: value,
});
