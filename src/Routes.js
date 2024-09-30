import {
  Route,
  Routes as BaseRoutes,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

import Landing from "./pages/Landing";
import ProjectDetail from "./pages/ProjectDetail";
import ChooseWallet from "./pages/Takeover/ChooseWallet";
import SetProject from "./pages/Takeover/SetProject";
import SelectToken from "./pages/Takeover/SelectToken";
import Admin from "./pages/Admin";
import AdminDirectory from "./pages/Admin/Admin_Directory";
import AdminProjectDetail from "./pages/Admin/Admin_ProjectDetail";
import ProjectDetailContent from "./pages/ProjectDetail/Content";
import ProjectDetailConnectWallet from "./pages/ProjectDetail/Content/ConnectWallet";
import DoesNotToken from "./pages/ProjectDetail/Content/ConnectWallet/DoesNotToken";
import BurnBabyBurn from "./pages/ProjectDetail/Content/BurnBabyBurn";
import BurnConfirmation from "./pages/ProjectDetail/Content/BurnBabyBurn/BurnConfirmation";
import StartBurnPile from "./pages/Takeover/Burn/StartBurnPile";
import SetBurnThresholds from "./pages/Takeover/Burn/SetBurnThresholds";
import BurnSuccess from "./pages/Takeover/Burn/BurnSuccess";
import VerificationOfTakeoverProject from "./pages/Takeover/Verify";
import SendCode from "./pages/Takeover/Verify/SendCode";
import ConfirmSetup from "./pages/Takeover/Verify/ConfirmSetup";
import useStore from "./store/useStore";
import {
  useActiveWalletConnectionStatus,
  useConnectedWallets,
} from "thirdweb/react";
import EditBurnThresholds from "./pages/ProjectDetail/Content/EditBurnThresholds";

function PrivateRoute({ element }) {
  const authToken = localStorage.getItem("authToken");
  if (!authToken) {
    return <Navigate to="/admin" replace />;
  }
  return element;
}

function TakeoverRoute({ element }) {
  const connectionStatus = useActiveWalletConnectionStatus();
  const wallets = useConnectedWallets();
  const navigate = useNavigate();

  useEffect(() => {
    if (connectionStatus !== "connected" || wallets.length === 0) {
      toast.error("Wallet Disconnected.");
      navigate("/takeover");
    }
  }, [connectionStatus, navigate, wallets.length]);
  return connectionStatus === "connected" ? element : null;
}

export default function Routes() {
  const location = useLocation();
  const joinTakeOver = useStore((state) => state.setJoined);
  const setJoinedAddress = useStore((state) => state.setJoinedAddress);

  useEffect(() => {
    const handleRouteChange = () => {
      if (!location.pathname.startsWith("/details")) {
        joinTakeOver(false);
        setJoinedAddress(null);
      }
    };
    handleRouteChange();
  }, [location, setJoinedAddress, joinTakeOver]);

  return (
    <BaseRoutes>
      <Route path="/" element={<Landing />} />
      <Route path="/takeover">
        <Route index element={<ChooseWallet />} />
        <Route
          path="select_token"
          element={<TakeoverRoute element={<SelectToken />} />}
        />
        <Route
          path="set_project"
          element={<TakeoverRoute element={<SetProject />} />}
        />
        <Route
          path="verify_project"
          element={
            <TakeoverRoute element={<VerificationOfTakeoverProject />} />
          }
        >
          <Route index element={<SendCode />} />
          <Route path="confirm_setup" element={<ConfirmSetup />} />
        </Route>
        <Route path="burn">
          <Route path="start_burn_pile" element={<StartBurnPile />} />
          <Route path="set_burn_thresholds" element={<SetBurnThresholds />} />
          <Route path="burn_success" element={<BurnSuccess />} />
        </Route>
      </Route>
      <Route path="/details/:projectId" element={<ProjectDetail />}>
        <Route index element={<ProjectDetailContent />} />
        <Route path="connect_wallet" element={<ProjectDetailConnectWallet />} />
        <Route path="dosent_have_token" element={<DoesNotToken />} />
        <Route path="burn_baby_burn" element={<BurnBabyBurn />} />
        <Route path="edit_burn_thresholds" element={<EditBurnThresholds />} />
        <Route path="burn_confirm" element={<BurnConfirmation />} />
      </Route>
      <Route path="/choosewallet" element={<ChooseWallet />} />
      <Route path="/admin">
        <Route index element={<Admin />} />
        <Route
          path="directory"
          element={<PrivateRoute element={<AdminDirectory />} />}
        />
        <Route
          path="details/:projectId"
          element={<PrivateRoute element={<AdminProjectDetail />} />}
        />
      </Route>
    </BaseRoutes>
  );
}
