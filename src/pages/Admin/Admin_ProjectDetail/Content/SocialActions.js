import Board from "../../../../components/Board";
import CopytoClipboard from "../../../../components/CopytoClipboard";
import ProgressBar from "../../../../components/ProgressBar";
import SocialItem from "../../../ProjectDetail/SocialItem";


const SocialActions = () => {
  return (<Board className="flex flex-col items-start p-6 gap-4">
    <div className="flex justify-between w-full md:flex-row flex-col items-start">
      <div className="flex gap-3 items-center">
        <img src={`${process.env.PUBLIC_URL}/assets/icons/solar_share-bold.svg`}
          alt="fire" className="w-9 h-9" />
        <span className="font-bold text-[22px]">Social actions</span>
      </div>
      <CopytoClipboard text="#kattdaddytakeover" />
    </div>
    <div className="flex font-bold items-end gap-2">
      <span className="text-5xl text-[#00D1FF]">5,230</span>
      <span className="text-xl text-[#56B0B9]">total actions</span>
    </div>
    <div className="flex flex-col gap-4 w-full">
      <SocialItem title='Shares' desc="10,000 burned per 100" totalAmount={100} realAmount={98} />
      <SocialItem title='Likes' desc="5,000 burned per 200" totalAmount={200} realAmount={115} />
      <SocialItem title='Comments' desc="2,500 burned per 50" totalAmount={50} realAmount={10} />
      <SocialItem title='Retweets' desc="7,500 burned per 100" totalAmount={100} realAmount={5} />
      <SocialItem title='Content' desc="15,000 burned per 10" totalAmount={10} realAmount={3} />
      <div className="w-full flex justify-between md:flex-row flex-col items-center">
        <div className="w-full md:w-1/5 flex flex-col">
          <span>% Joined</span>
          <span className="text-[#56B0B9] text-xs">25,000 at 50%</span>
        </div>
        <div className="w-full md:w-[75%]">
          <ProgressBar
            percentage={35}
            color="#00D1FF"
            showFraction={true}
            fractionText="35%"
          />
        </div>
      </div>
    </div>

  </Board>)
}

export default SocialActions;