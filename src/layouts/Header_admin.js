import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { logout } from "../utils/auth";

const HeaderAdmin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  return (
    <div className="absolute right-1/2 top-0 z-50 flex w-screen max-w-[1358px] translate-x-1/2 items-center justify-between px-[48px] py-[48px]">
      <img
        src={`${process.env.PUBLIC_URL}/assets/icons/logo.svg`}
        alt="Group Icon"
        className="w-52 cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      />
      <div className="">
        <Button width="auto" label={"Log Out"} onClick={handleLogout} />
      </div>
    </div>
  );
};

export default HeaderAdmin;
