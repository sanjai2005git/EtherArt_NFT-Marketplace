import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Nav from "./components/Nav";
import { Floatingmenu } from "./components/Floatingmenu";

import Home from "./Pages/Home";
import Listnft from "./Pages/Listnft";
import Viewnft from "./Pages/Viewnft";
import Profile from "./Pages/Profile";
import NFT from "./components/NFT";

import { WalletProvider } from "./utils/WalletProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/ui/Footer";

function App() {
  return (
    <BrowserRouter>
      <WalletProvider>
        <Nav />
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<Home />} />

          {/* Protected Routes */}
          <Route
            path="/list"
            element={
              <ProtectedRoute>
                <Listnft />
              </ProtectedRoute>
            }
          />

          <Route
            path="/view"
            element={
              <ProtectedRoute>
                <Viewnft />
              </ProtectedRoute>
            }
          />

          <Route
            path="/view/:id"
            element={
              <ProtectedRoute>
                <NFT />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
        {/* <Floatingmenu /> */}
        <Footer />
      </WalletProvider>
    </BrowserRouter>
  );
}

export default App;
