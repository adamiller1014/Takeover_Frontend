import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Header = () => {
  const navigation = useNavigate();
  return (
    <div className="absolute right-1/2 top-0 z-50 flex w-full max-w-[1358px] translate-x-1/2 items-center justify-between bg-opacity-30 px-[48px] py-[24px]">
      <img
        src={`${process.env.PUBLIC_URL}/assets/icons/logo.svg`}
        alt="Group Icon"
        className="w-52 cursor-pointer"
        onClick={() => {
          navigation("/");
        }}
      />
      <div className="">
        <Button
          isCapitalized={false}
          width="auto"
          label={"Start a Takeover"}
          onClick={() => {
            navigation("/takeover");
          }}
        />
      </div>
    </div>
  );
};

export default Header;
