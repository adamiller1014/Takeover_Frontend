import Board from "../../components/Board";
import Button from "../../components/Button";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useProjects } from "../../hooks/useProjects";
import formatNumber from "../../utils/FormatNumber";

const getOrdinalSuffix = (num) => {
  if (num === 1) return "1st";
  if (num === 2) return "2nd";
  if (num === 3) return "3rd";
  return `${num}th`;
};

const LandingDescription = ({ selectedProject }) => {
  const { data: projects, isLoading, isError } = useProjects();
  return (
    <div className="mx-auto mt-[80px] flex w-full max-w-[1358px] flex-col items-center justify-between gap-7 px-[48px] pt-[36px] md:mt-[124px] md:flex-row md:gap-0">
      <div className="flex w-[95%] flex-col gap-4 md:w-[48%]">
        <div className="flex flex-col text-3xl font-black leading-none md:text-5xl">
          <span>Don’t just take part.</span>
          <span className="text-[#00FF8C]">Take over.</span>
        </div>
        <p className="text-lg leading-tight text-[#D1D5DB]">
          Help grow the tokens and communities you care about through social
          interactions, the more you like, comment and share the more tokens get
          burned.{" "}
        </p>
      </div>
      <div className="w-[95%] md:w-[48%]">
        <Board>
          {isError ? (
            <p className="flex w-full items-center justify-center py-6 text-red-500">
              Error loading projects.
            </p>
          ) : isLoading || !projects || !selectedProject ? (
            <LoadingSpinner />
          ) : (
            <div className="flex w-full flex-col items-center gap-5 p-8">
              <div className="flex w-full flex-col items-center justify-between gap-3 pb-2 md:flex-row">
                <div className="flex flex-col justify-between gap-4 lg:flex-row">
                  <img
                    src={`${process.env.REACT_APP_BACKEND_URL}/images/avatars/${selectedProject?.avatar}`}
                    alt="Main Token"
                    className="h-[100px] w-[100px] rounded-full"
                  />
                  <div className="flex flex-col gap-2 leading-5">
                    <span className="text-xl">
                      {selectedProject?.projectName}
                    </span>
                    <p>{selectedProject?.description}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex w-40 items-center justify-start gap-1 rounded-full bg-gradient-to-r from-[#ff88006a] to-[#ffffff01] px-2 py-1">
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/icons/250k burned.svg`}
                      alt="Main Token"
                      className="h-5 w-4 rounded-full"
                    />
                    <span>{formatNumber(selectedProject?.burned)} burned</span>
                  </div>
                  <div className="flex w-40 items-center justify-start gap-1 rounded-full bg-gradient-to-r from-[#00FF8C6a] to-[#ffffff01] px-2 py-1">
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/icons/2568 members.svg`}
                      alt="Main Token"
                      className="h-5 w-4 rounded-full"
                    />
                    <span>
                      {selectedProject?.joinedMembers.length.toLocaleString()}{" "}
                      members
                    </span>
                  </div>
                  <div className="flex w-40 items-center justify-start gap-1 rounded-full bg-gradient-to-r from-[#00D1FF6a] to-[#ffffff01] px-2 py-1">
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/icons/32k+ actions.svg`}
                      alt="Main Token"
                      className="h-5 w-4 rounded-full"
                    />
                    <span>
                      {formatNumber(selectedProject?.actions)}+ actions
                    </span>
                  </div>
                  <div className="flex w-40 items-center justify-start gap-1 rounded-full bg-gradient-to-r from-[#BD89FF6a] to-[#ffffff01] px-2 py-1">
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/icons/rankeed 1st.svg`}
                      alt="Main Token"
                      className="h-5 w-4 rounded-full"
                    />
                    <span>
                      Ranked {getOrdinalSuffix(selectedProject?.ranking)}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                width="full"
                label={
                  <span className="flex items-center justify-center gap-3">
                    {" "}
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/icons/Group.svg`}
                      alt="Group Icon"
                    />{" "}
                    Takeover Details
                  </span>
                }
                onClick={() => {
                  window.location.href = `details/${selectedProject?._id}`;
                }}
              />
            </div>
          )}
        </Board>
      </div>
    </div>
  );
};

export default LandingDescription;
