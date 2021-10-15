import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { GroupProvider } from "../../contexts/GroupContext";
import { AuthProvider } from "../../contexts/AuthContext";
import { Home } from "..";

const MockHome = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GroupProvider>
          <Home />
        </GroupProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};
