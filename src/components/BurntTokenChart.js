import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import Board from './Board';
import { useParams } from 'react-router-dom';
import { useProjectById } from '../hooks/useProjectById';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const BurntTokenChart = () => {
  const [dates, setDates] = useState([]);
  const [burnData, setBurnData] = useState([]);
  const [priceData, setPriceData] = useState([]);
  const { projectId } = useParams();
  const {
    data: project,
    isLoading,
    isError,
  } = useProjectById({ _id: projectId });

  const tokenAddress = project?.tokenAddress;

  const getLast14Days = () => {
    const dates = [];
    for (let i = 13; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' }));
    }
    return dates;
  };

  useEffect(() => {
    setDates(getLast14Days());

    const fetchBurnData = async () => {
      try {
        const response = await axios.get(
          `https://deep-index.moralis.io/api/v2/erc20/0x000000000000000000000000000000000000dEaD/transfers`,
          {
            headers: {
              'x-api-key': process.env.REACT_APP_MORALIS_API_KEY,
            },
            params: {
              limit: 100,
            },
          }
        );
        const burnAmounts = response.data.result.map(tx => parseFloat(tx.value) / 1e18); // Convert from wei
        setBurnData(aggregateBurnsByDay(burnAmounts));
      } catch (error) {
        console.error('Error fetching burn data:', error);
      }
    };

    const fetchPriceData = async () => {
      try {
        const response = await axios.get(
          `https://deep-index.moralis.io/api/v2/erc20/${tokenAddress}/price`,
          {
            headers: {
              'x-api-key': process.env.REACT_APP_MORALIS_API_KEY,
            },
          }
        );
        const prices = response.data.usdPrice;
        const priceList = new Array(14).fill(prices);
        setPriceData(priceList);
      } catch (error) {
        console.error('Error fetching price data:', error);
      }
    };

    fetchBurnData();
    fetchPriceData();
  }, [tokenAddress]);

  const aggregateBurnsByDay = (burnAmounts) => {
    return burnAmounts;
  };

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Burn',
        data: burnData,
        borderColor: '#D6983E',
        backgroundColor: '#D6983E',
        fill: false,
        stepped: true,
        yAxisID: 'y2',
        pointRadius: 3,
      },
      {
        label: 'Price',
        data: priceData.length ? priceData.slice(0, burnData.length) : [],
        borderColor: '#9C56B7',
        backgroundColor: 'rgba(200,98,248,0.1)',
        fill: true,
        tension: 0.4,
        yAxisID: 'y1',
        pointRadius: 3,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        ticks: {
          color: '#56B0B9',
        },
        grid: {
          display: false,
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'left',
        ticks: {
          color: '#9C56B7',
        },
        grid: {
          display: true,
          color: '#56B0B9',
        },
        border: {
          display: false,
        },
      },
      y2: {
        type: 'linear',
        display: true,
        position: 'right',
        ticks: {
          color: '#D6983E',
          stepSize: 25000,
          callback: function (value) {
            return value >= 1000 ? value / 1000 + 'k' : value;
          },
        },
        grid: {
          drawOnChartArea: false,
        },
        border: {
          display: false,
        },
      },
    },
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          borderWidth: 0,
        },
      },
    },
  };

  return (
    <Board className="p-6">
      <div className="flex items-center gap-4">
        <img
          src={`${process.env.PUBLIC_URL}/assets/icons/burn-chart.svg`}
          alt="burn-chart"
          className="w-9 h-9"
        />
        <span className="font-bold text-[22px]">Price vs. Burn Chart</span>
      </div>
      <Line data={data} options={options} />
    </Board>
  );
};

export default BurntTokenChart;
