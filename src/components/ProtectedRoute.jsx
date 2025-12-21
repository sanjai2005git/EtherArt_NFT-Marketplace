// components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useWallet } from "../utils/WalletProvider";

const ProtectedRoute = ({ children }) => {
  const { account } = useWallet();

  if (!account) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
