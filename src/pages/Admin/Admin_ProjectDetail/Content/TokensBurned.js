import Board from "../../../../components/Board"
import ProgressBar from "../../../../components/ProgressBar"

const TokensBurned = () => {
  return ( <Board className="flex flex-col items-start p-6 gap-4">
    <div className="flex gap-3 items-center">
      <img src={`${process.env.PUBLIC_URL}/assets/icons/solar_fire-bold.svg`}
        alt="fire" className="w-9 h-9" />
      <span className="font-bold text-[22px]">Tokens burned</span>
    </div>
    <div className="flex font-bold items-end gap-2">
      <span className="text-5xl text-[#FF8A00]">250,500</span>
      <span className="text-xl text-[#56B0B9]">/ 2,005,050</span>
    </div>
    <ProgressBar percentage={250500 / 2005050 * 100} color="#FF8A00" />
  </Board>)
}

export default TokensBurned