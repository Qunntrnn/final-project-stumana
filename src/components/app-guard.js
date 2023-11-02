"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export const AppGuard = ({ children }) => {
  const router = useRouter();
  const user = useSelector((rootState) => rootState.user);
  const signIn = () => {
    router.push("/sign-in");
  };
  if (!user.id) {
    return (
      <>
        <div className="bg-gray-100 p-4 text-center">
          Authentication required. Please{" "}
          <a
            className="text-blue-500 cursor-pointer hover:underline text-decoration-none"
            href="/sign-in"
          >
            Sign in
          </a>
        </div>
      </>
    );
  }
  return <>{children}</>;
};
