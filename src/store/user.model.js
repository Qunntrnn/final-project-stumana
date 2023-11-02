const initialState = {
  id: undefined,
  email: undefined,
  displayName: undefined,
  loaded: false,
};

export const user = {
  state: initialState,
  reducers: {
    setUser(_state, newUser) {
      return {
        ...newUser,
        loaded: true,
      };
    },
  },
  effects: (dispatch) => ({}),
};
