import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThirdwebProvider } from "thirdweb/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Routes from "./Routes";
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import HeaderAdmin from "./layouts/Header_admin";
import HeaderTakeover from "./layouts/Header_takeover";
import HeaderVerifyProject from "./layouts/Header_verifyproject";
import HeaderJoinTakeover from "./layouts/Header_join_takeover";

const queryClient = new QueryClient();

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (window.location.pathname.startsWith("/admin") && !token) {
      navigate("/admin");
    }
  }, [navigate]);

  const isAdminRoute =
    window.location.pathname.startsWith("/admin") &&
    window.location.pathname !== "/admin";
  const isJoinTakeoverRoute = window.location.pathname.startsWith("/details");
  const isTakeoverRoute =
    window.location.pathname.startsWith("/takeover") ||
    window.location.pathname.includes("/connect_wallet") ||
    window.location.pathname.includes("/dosent_have_token");

  const isVerifyProjectRoute = window.location.pathname.startsWith(
    "/takeover/verify_project"
  );

  return (
    <ThirdwebProvider>
      <QueryClientProvider client={queryClient}>
        <div className="relative h-screen w-full overflow-y-auto">
          {window.location.pathname.startsWith("/admin") &&
          window.location.pathname.split("/")[2] ===
            "" ? null : isAdminRoute ? (
            <HeaderAdmin />
          ) : isVerifyProjectRoute ? (
            <HeaderVerifyProject />
          ) : isTakeoverRoute ? (
            <HeaderTakeover />
          ) : isJoinTakeoverRoute ? (
            <HeaderJoinTakeover />
          ) : (
            window.location.pathname !== "/admin" && <Header />
          )}
          <Routes />
          {window.location.pathname.startsWith("/admin") &&
          (window.location.pathname.split("/").length < 3 ||
            window.location.pathname.split("/")[2] === "") ? null : (
            <Footer />
          )}
          <ToastContainer position="top-right" autoClose={5000} />
        </div>
      </QueryClientProvider>
    </ThirdwebProvider>
  );
}

export default App;
