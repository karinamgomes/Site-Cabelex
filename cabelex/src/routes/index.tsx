import {
  Routes,
  Route
} from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import Dashboard from "../pages/dashboard";
import SingIn from "../pages/singin";

import { baseRoutes } from "./baseRoutes";

export default function MainRoutes() {
  const { user } = useAuth();
  return (
    <>

      {!user && <SingIn />}
      {user &&
        <Dashboard>
          <Routes>
            {baseRoutes.map(route =>
              <Route key={route.path} path={route.path} element={<route.component />} />
            )}
          </Routes>
        </Dashboard>
      }
    </>
  )
}