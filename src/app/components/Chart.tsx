"use client";
import React, { useEffect, useRef, useState } from "react";
import { createChart, ColorType } from "lightweight-charts";
import { fetchKlinesData } from "@/Services/BinanceApiService";
import { useTheme } from "next-themes";
import { Audio } from "react-loader-spinner";
import Select from "react-select";
const Chart = () => {
  const intervalOptions = [
    { value: "1m", label: "1m" },
    { value: "5m", label: "5m" },
    { value: "15m", label: "15m" },
    { value: "1h", label: "1h" },
    { value: "1d", label: "1d" },
  ];
  const { theme } = useTheme();
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [selectedInterval, setSelectedInterval] = useState("1m");
  const [chart, setChart] = useState<any>(null); // Store the chart instance
  const [isLoading, setIsLoading] = useState(true); // State for loading
  useEffect(() => {
    const chartOptions = {
      layout: {
        textColor: `${theme === "dark" ? "white" : "black"}`,
        background: {
          type: ColorType.Solid,
          color: `${theme === "dark" ? "black" : "white"}`,
        },
      },
      autoSize: true,
    };
    if (!chartRef.current) return; // Wait for the reference to be available

    
    const newChart = createChart(chartRef.current, chartOptions);

    setChart(newChart);

    const fetchData = async () => {
      setIsLoading(true);
      const data = await fetchKlinesData(selectedInterval);

      const formattedData = data.map((item) => ({
        time: item.openTime, 
        open: parseFloat(item.open),
        high: parseFloat(item.high),
        low: parseFloat(item.low),
        close: parseFloat(item.close),
        volume: parseFloat(item.volume),
      }));

      if (newChart) {
        // Make sure the chart is defined
        const candlestickSeries = newChart.addCandlestickSeries({
          upColor: "#26a69a",
          downColor: "#ef5350",
          borderVisible: false,
          wickUpColor: "#26a69a",
          wickDownColor: "#ef5350",
        });
        candlestickSeries.setData(formattedData);
      }
      setIsLoading(false);
    };
// Call fetchData immediately after chart creation
    fetchData(); 

    const intervalId = setInterval(() => {
      fetchData();
    }, 60000);

    return () => {
      clearInterval(intervalId);
      if (newChart) {
        
        newChart.remove();
      }
    };
  }, [selectedInterval, theme]); 

  return (
    <>
      <div className="flex justify-center items-center">
        {isLoading && ( // Show loader when isLoading is true
          <div className="flex justify-center items-center h-screen">
            <Audio
              height="100"
              width="100"
              color="#4fa94d"
              ariaLabel="audio-loading"
              wrapperStyle={{}}
              wrapperClass="wrapper-class"
              visible={true}
            />
          </div>
        )}
      </div>

      <div className="lg:flex lg:flex-row flex-col w-full gap-32 h-full justify-center items-center">
        <div
          ref={chartRef} 
          className="flex justify-center items-center h-[80%] lg:w-[80%] w-full"
        />
        <Select
          value={{ value: selectedInterval, label: selectedInterval }}
          onChange={(selectedOption) => {
            if (selectedOption) {
              setSelectedInterval(selectedOption.value as string);
            }
          }}
          options={intervalOptions}
          className="dark:text-black overflow-visible"
        />
      </div>
    </>
  );
};

export default Chart;
