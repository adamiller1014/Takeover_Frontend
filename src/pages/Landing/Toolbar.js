import React, { useEffect, useRef, useState } from "react"

const Toolbar = ({ onSearchChange, onStatusChange, onSortChange, SortingTypes }) => {

  const [sortingTypeIndex, setSortingTypeIndex] = useState(null);
  const [openSort, setOpenSort] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState(true);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpenSort(false);
    }
  };

  useEffect(() => {
    onStatusChange(filter);
  }, [filter]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSortChange = (index) => {
    setOpenSort(false);
    setSortingTypeIndex(index);
    onSortChange(index);
  }

  useEffect(() => {
    onSearchChange(searchQuery);
  }, [searchQuery]);

  return (<div className="flex mx-auto w-full flex-wrap justify-between items-start px-[48px] max-w-[1358px]">
    <div className="flex gap-3 mt-5 sm:flex-row flex-col">
      {/* Search Input */}
      <div className="flex outline-none border border-[#00FF91] bg-[#2d897552] gap-3 rounded-lg text-white py-4 px-3 items-center">
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </span>
        <input className=" outline-none bg-white bg-opacity-0 text-sm" placeholder="Search by project name" 
          value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
      </div>
      {/* Active or Inactive showing */}
      {filter ?
        <div
          onClick={() => {
            setFilter(false);
          }}
          className={`flex outline-none border border-[#00FF91] cursor-pointer hover:bg-[#16443aba] transition-all w-fit bg-[#00000052] gap-3 rounded-lg text-white py-4 px-3 items-center`}>
          <span>
            <img src={`${process.env.PUBLIC_URL}/assets/icons/solar_eye-outline.svg`}
              alt="Eye" className=" rounded-full w-4 h-5" />
          </span>
          <span>Show Inactive Projects</span>
        </div>
        : <div
          onClick={() => {
            setFilter(true)
          }}
          className={`flex select-none outline-none border border-[#00FF91] cursor-pointer hover:bg-[#2d8975ba] transition-all w-fit bg-[#1C7E52] gap-3 rounded-lg text-white py-4 px-3 items-center`}>
          <span>
            <img src={`${process.env.PUBLIC_URL}/assets/icons/solar_eye-outline_closed.svg`}
              alt="Eye" className=" rounded-full w-4 h-5" />
          </span>
          <span>Hide Inactive Projects</span>
        </div>}
    </div>
    {/* Sorting */}
    <div
      onClick={() => {
        if(!openSort) setOpenSort(true)
      }}
      ref={dropdownRef}
      className={`flex w-48 mt-5 relative outline-none border border-[#00FF91] cursor-pointer hover:bg-[#16443aba] transition-all  bg-[#00000052] gap-3 rounded-lg text-white py-4 px-3 items-center`}>
      <span>
        <img src={`${process.env.PUBLIC_URL}/assets/icons/global rank.svg`}
          alt="Sort" className=" rounded-full w-4 h-5" />
      </span>
      <span>{sortingTypeIndex === null ? "Sort by" : SortingTypes[sortingTypeIndex].name}</span>
      {openSort && (<div className="absolute top-16 w-52 rounded-xl left-0 overflow-hidden z-10">
        {SortingTypes.map((type, index) => (
          <div key={index}
            onClick={() => handleSortChange(index)}
            className={`flex cursor-pointer hover:bg-[#4baa95] transition-all w-full py-2 px-4 text-white ${sortingTypeIndex === index ? "bg-[#277c6a]" : "bg-[#223E38] items-center"}`}>
            {sortingTypeIndex===index ? <img src={`${process.env.PUBLIC_URL}/assets/icons/check.svg`} alt="sort check" /> : <img src={`${process.env.PUBLIC_URL}/assets/icons/uncheck.svg`} alt="sort uncheck" />}
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