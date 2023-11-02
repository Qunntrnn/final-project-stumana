const { createModel } = require("@rematch/core");
const { AlertColor } = require("@mui/material");

const initialState = {
  severity: "info",
  message: "",
  open: false,
};

const setNotification = function (_draft, notification) {
  return { ..._draft, ...notification };
};

const notification = createModel()({
  state: initialState,
  reducers: {
    setNotification,
  },
  effects: () => ({}),
});
