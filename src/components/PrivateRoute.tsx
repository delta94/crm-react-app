import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { isAuthenticatedSelector } from "store/auth/selectors";

const PrivateRoute = ({ children, ...rest }: RouteProps) => {
  const isAuth = useSelector(isAuthenticatedSelector);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
