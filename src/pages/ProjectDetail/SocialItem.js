import React from "react"
import ProgressBar from "../../components/ProgressBar"

const SocialItem = ({
  title,
  desc,
  totalAmount,
  realAmount
}) => {
  return (<div className="w-full flex justify-between md:flex-row flex-col items-center">
    <div className="w-full md:w-1/5 flex flex-col">
      <span>{title}</span>
      <span className="text-[#56B0B9] text-xs">{desc}</span>
    </div>
    <div className="w-full md:w-[75%]">
      <ProgressBar
        percentage={(realAmount / totalAmount) * 100}
        color="#00D1FF"
        showFraction={true}
        fractionText={`${realAmount}/${totalAmount}`}
      />
    </div>
  </div>)
}

export default SocialItem