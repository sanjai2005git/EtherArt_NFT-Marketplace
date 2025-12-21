// components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useWallet } from "../utils/WalletProvider";

const ProtectedRoute = ({ children }) => {
  const { account } = useWallet();

  if (!account) {
    alert("Connect your wallet to continue.");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
