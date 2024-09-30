import React, { useState } from 'react';
import Board from '../../../../components/Board';

const generateSampleData = () => {
  const data = [];
  const now = new Date();

  for (let i = 0; i < 100; i++) {
    const randomDaysAgo = Math.floor(Math.random() * 90);
    const randomDate = new Date(now);
    randomDate.setDate(now.getDate() - randomDaysAgo);
    const randomAmount = Math.floor(Math.random() * 9000) + 1000;
    const randomHash = `0x${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    data.push({
      time: randomDate.toISOString(),
      amount: randomAmount,
      hash: randomHash
    });
  }

  return data;
};

const data = generateSampleData();

const formatTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now - date) / 1000);
  const day = 86400;

  if (diff < 60) return `${diff} seconds ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < day) return `${Math.floor(diff / 3600)} hours ago`;
  if (diff < day * 7) return `${Math.floor(diff / day)} days ago`;
  if (diff < day * 30) return `${Math.floor(diff / (day * 7))} weeks ago`;
  return `${Math.floor(diff / (day * 30))} months ago`;
};


const formatAmount = (amount) => {
  return `${amount.toLocaleString()} $KATT`;
};

const truncateHash = (hash) => {
  return `${hash.slice(0, 10)}...`;
};

const TransactionTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPaginationNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    pageNumbers.push(
      <button
        key={1}
        onClick={() => handlePageChange(1)}
        className={`mx-1 px-3 py-1 ${currentPage === 1 ? 'border-t-2 border-[#00FF8C]' : ''}`}
      >
        1
      </button>
    );

    if (startPage > 2) {
      pageNumbers.push(
        <button
          key="dots1"
          className="mx-1 px-3 py-1 text-white"
          onClick={() => handlePageChange(startPage - 1)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
        </button>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`mx-1 px-3 py-1 ${currentPage === i ? 'border-t-2 border-[#00FF8C]' : ''}`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages - 1) {
      pageNumbers.push(
        <button
          key="dots2"
          className="mx-1 px-3 py-1 text-white"
          onClick={() => handlePageChange(endPage + 1)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>

        </button>
      );
    }

    pageNumbers.push(
      <button
        key={totalPages}
        onClick={() => handlePageChange(totalPages)}
        className={`mx-1 px-3 py-1 ${currentPage === totalPages ? 'border-[#00FF8C]' : ''}`}
      >
        {totalPages}
      </button>
    );

    return pageNumbers;
  };

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (<Board className="flex flex-col items-start p-6 gap-4">
    <div className="flex gap-3 items-center">
      <img src={`${process.env.PUBLIC_URL}/assets/icons/Burn.svg`}
        alt="fire" className="w-9 h-9" />
      <span className="font-bold text-[22px]">Burn transactions</span>
    </div>
    <div className="container mx-auto py-4">
      <table className="min-w-full table-auto ">
        <thead>
          <tr className="text-left text-[#223E38] uppercase bg-[#00FF8C] overflow-hidden">
            <th className="px-4 py-2  rounded-tl-2xl">Time</th>
            <th className="px-4 py-2 ">Amount</th>
            <th className="px-4 py-2  rounded-tr-2xl">TX HASH</th>
          </tr>
        </thead>
        <tbody className='rounded-b-2xl'>
          {paginatedData.map((item, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? 'bg-[#0B1B1D]' : 'bg-[#1C575E]/30'}
            >
              <td className="px-4 py-2 text-white">{formatTime(item.time)}</td>
              <td className="px-4 py-2 text-white">{formatAmount(item.amount)}</td>
              <td className="px-4 py-2 text-white">{truncateHash(item.hash)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between items-center border-t-[#56B0B9] border-t">
        <button
          className=" py-1"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <img src={`${process.env.PUBLIC_URL}/assets/icons/Arrow narrow left.svg`}
            alt="Arrow narrow left" className=" rounded-full w-4 h-5" />
        </button>
        <div className='mt-0 flex items-center'>
          {renderPaginationNumbers()}
        </div>
        <button
          className=" py-1"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <img src={`${process.env.PUBLIC_URL}/assets/icons/Arrow narrow right.svg`}
            alt="Arrow narrow Right" className=" rounded-full w-4 h-5" />
        </button>
      </div>
    </div>
  </Board>
  );
};

export default TransactionTable;
