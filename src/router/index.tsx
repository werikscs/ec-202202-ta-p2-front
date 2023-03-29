import { Routes, Route } from "react-router-dom";
import { Register } from "../pages/register";

export const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Register />}
      />
    </Routes>
  );
};
