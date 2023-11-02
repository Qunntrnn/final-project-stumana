"use client";

import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

export const useExecute = () => {
  const [busy, setBusy] = useState(false);
  const { setNotification } = useDispatch();
  const execute = useCallback(
    async (action) => {
      try {
        setBusy?.(true);
        await action();
        return {
          success: true,
        };
      } catch (error) {
        let errorMessage = error.message;
        let showNotification = true;
        if (error.response) {
          errorMessage = error.response.data.message;
        } else if (errorMessage.toLowerCase().includes("network error")) {
          errorMessage = "Network Error";
        } else if (
          errorMessage.toLowerCase().includes("user rejected signing")
        ) {
          errorMessage = "User rejected signing";
        } else if (error.code === "auth/expired-action-code") {
          errorMessage =
            "Request expired. Please make another reset password request";
        } else if (error.code === "auth/requires-recent-login") {
          errorMessage =
            "Please login again to perform this action. This is a security measure";
        } else if (error.code === "auth/too-many-requests") {
          errorMessage = "Too many requests. Please try again later";
        } else if (error.code === "auth/invalid-action-code") {
          errorMessage = "Invalid action code. It may have already been used";
        } else if (
          error.code === "auth/popup-closed-by-user" ||
          error.code === "auth/cancelled-popup-request"
        ) {
          showNotification = false;
        }

        if (showNotification) {
          setNotification({
            open: true,
            severity: "error",
            message: errorMessage,
          });
        }
        return {
          success: false,
        };
      } finally {
        setBusy?.(false);
      }
    },
    [setBusy, setNotification]
  );

  return { busy, execute };
};
