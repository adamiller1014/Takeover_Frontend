import React, { useEffect, useState } from 'react';
import Board from '../../../components/Board';
import { useParams } from 'react-router-dom/dist';
import { useProjectById } from '../../../hooks/useProjectById';

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
  return `${parseFloat(amount).toLocaleString()}`;
};

const truncateHash = (hash) => {
  return `${hash.slice(0, 10)}...`;
};

const getBlockExplorerUrl = (chain, transactionHash) => {
  switch (chain) {
    case 'eth':
      return `https://etherscan.io/tx/${transactionHash}`;
    case 'bsc':
      return `https://bscscan.com/tx/${transactionHash}`;
    case 'polygon':
      return `https://polygonscan.com/tx/${transactionHash}`;
    default:
      return `https://etherscan.io/tx/${transactionHash}`;
  }
};

const TransactionTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { projectId } = useParams();
  const {
    data: project,
    isLoading,
    isError,
  } = useProjectById({ _id: projectId });

  const tokenAddress = project?.tokenAddress;
  const [chain, setChain] = useState('erc20');
  const itemsPerPage = 6;
  const apiKey = process.env.REACT_APP_MORALIS_API_KEY;
  const apiUrl = `https://api.moralis.io/${chain || 'eth'}/token/${tokenAddress}/transfers`;

  useEffect(() => {
    const fetchBurnTransactions = async () => {
      try {
        const response = await fetch(apiUrl, {
          headers: {
            'X-API-Key': apiKey,
            'Content-Type': 'application/json',
          },
        });
        const result = await response.json();
        const burnTransactions = result.result.filter(
          (tx) => tx.to_address === '0x0000000000000000000000000000000000000000'
        );
        setData(burnTransactions);
      } catch (error) {
        console.error('Error fetching burn transactions:', error);
      }
    };

    fetchBurnTransactions();
  }, [tokenAddress, chain]);

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
          className="px-3 py-1 mx-1 text-white"
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
          className="px-3 py-1 mx-1 text-white"
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

  return (
    <Board className="flex flex-col items-start gap-4 p-6">
      <div className="flex items-center gap-4">
        <img src={`${process.env.PUBLIC_URL}/assets/icons/burn.svg`} alt="burn transactions" className="h-9 w-9" />
        <span className="text-[22px] font-bold">Burn transactions</span>
      </div>
      <div className="container py-4 mx-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="overflow-hidden bg-[#00FF8C] text-left uppercase text-[#223E38]">
              <th className="px-4 py-2 rounded-tl-2xl">Time</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2 rounded-tr-2xl">TX HASH</th>
            </tr>
          </thead>
          <tbody className="rounded-b-2xl">
            {paginatedData.map((item, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? 'bg-[#0B1B1D]' : 'bg-[#1C575E]/30'} cursor-pointer`}
              >
                <td className="px-4 py-2 text-white">
                  <a
                    href={getBlockExplorerUrl(chain, item.transaction_hash)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {formatTime(item.block_timestamp)}
                  </a>
                </td>
                <td className="px-4 py-2 text-white">
                  <a
                    href={getBlockExplorerUrl(chain, item.transaction_hash)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {formatAmount(item.value)} {project.tokenSymbol}
                  </a>
                </td>
                <td className="px-4 py-2 text-white">
                  <a
                    href={getBlockExplorerUrl(chain, item.transaction_hash)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {truncateHash(item.transaction_hash)}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex items-center justify-between border-t border-t-[#56B0B9]">
          <button
            className="py-1"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <img src={`${process.env.PUBLIC_URL}/assets/icons/Arrow narrow left.svg`} alt="Arrow narrow left" className="w-4 h-5 rounded-full" />
          </button>
          <div className="flex items-center mt-0">
            {renderPaginationNumbers()}
          </div>
          <button
            className="py-1"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <img src={`${process.env.PUBLIC_URL}/assets/icons/Arrow narrow right.svg`} alt="Arrow narrow right" className="w-4 h-5 rounded-full" />
          </button>
        </div>
      </div>
    </Board>
  );
};

export default TransactionTable;
