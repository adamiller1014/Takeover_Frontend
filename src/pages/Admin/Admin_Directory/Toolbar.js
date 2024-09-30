import React, { useEffect, useRef, useState } from "react"
import Checkbox from "../../../components/Checkbox";

const Toolbar = ({ onStatusChange, onSortChange, onSearchChange, SortingTypes }) => {
  const [sortingTypeIndex, setSortingTypeIndex] = useState(null);
  const [openSort, setOpenSort] = useState(false);
  const [isActive, setActive] = useState(true);
  const [isInactive, setInactive] = useState(false);
  const [isPending, setPending] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpenSort(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    onStatusChange({ isActive, isInactive, isPending });
  }, [isActive, isInactive, isPending]);

  const handleSortChange = (index) => {
    setOpenSort(false);
    setSortingTypeIndex(index);
    onSortChange(index);
  }

  useEffect(() => {
    onSearchChange(searchQuery);
  }, [searchQuery]);

  return (<div className="flex mx-auto w-full flex-wrap justify-between items-stretch px-[48px] max-w-[1358px]">
    <div className="flex gap-3 sm:flex-row flex-col my-3">
      {/* Search Input */}
      <div className="flex outline-none border border-[#00FF91] bg-[#2d897552] gap-3 rounded-lg text-white px-3 items-center">
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </span>
        <input className="outline-none bg-white bg-opacity-0 text-sm" placeholder="Search by project name" value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} />
      </div>
    </div>
    {/* Active or Inactive showing */}
    <div className="flex flex-col bg-[#040404]/30 px-2 rounded-lg  my-3">
      <span className="text-[#56B0B9] text-[16px] leading-[21px]">Show</span>
      <div className="flex gap-14 flex-wrap p-2">
        <Checkbox label="Active"  onChange={() => setActive(!isActive)} />
        <Checkbox label="Inactive" initialChecked onChange={() => setInactive(!isInactive)} />
        <Checkbox label="Pending" initialChecked onChange={() => setPending(!isPending)} />
      </div>
    </div>
    {/* Sorting */}
    <div
      onClick={() => {
        if(!openSort) setOpenSort(true)
      }}
      ref={dropdownRef}
      className={`flex w-48  my-3 relative outline-none border border-[#00FF91] cursor-pointer hover:bg-[#16443aba] transition-all  bg-[#00000052] gap-3 rounded-lg text-white py-4 px-3 items-center`}>
      <span>
        <img src={`${process.env.PUBLIC_URL}/assets/icons/global rank.svg`}
          alt="Sort" className=" rounded-full w-4 h-5" />
      </span>
      <span>{sortingTypeIndex === null ? "Sort by" : SortingTypes[sortingTypeIndex].name}</span>
      {openSort && (<div className="absolute top-16 w-52 rounded-xl left-0 overflow-hidden z-10">
        {SortingTypes.map((type, index) => (
          <div
            key={index}
            onClick={() => handleSortChange(index)}
            className={`flex cursor-pointer hover:bg-[#4baa95] transition-all w-full py-2 px-4 text-white ${sortingTypeIndex === index ? "bg-[#277c6a]" : "bg-[#223E38]"}`}>
            <img src={`${process.env.PUBLIC_URL}/assets/icons/${sortingTypeIndex === index ? 'check' : 'uncheck'}.svg`} alt={sortingTypeIndex===index ? "check" : "uncheck"} />
            <div className="relative left-4">
              {type.name}
            </div>
          </div>
        ))}
      </div>)}
    </div>
  </div>)
}

export default Toolbar