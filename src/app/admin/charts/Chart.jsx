"use client";
import React , { PureComponent }  from 'react';
import PieChart from './PieChart';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];


const Chart = () => {
  return (
    <div className='flex flex-col xl:flex-row justify-evenly '>
        <div className=' basis-[30%] border-collapse bg-gray-100 p-2 rounded-xl shadow-2xl drop-shadow-xl '>
          <div className='flex bg-gray-100 border-gray-300 border-b-4 rounded-sm items-center  justify-center px-5 py-2'>
            <h2>چارت فروش و اجاره ماهانه</h2>
          </div>
        < PieChart/>
        </div>
        <div className='items-center xl:basis-[50%] border-collapse bg-gray-100 p-2 rounded-xl shadow-2xl drop-shadow-xl '>
          
          <BarChart
          width={800}
          height={500}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#0093AB"/>
          <Bar dataKey="uv" fill="#FFD124"/>
        </BarChart>
          
        </div>
    </div>
  )
}

export default Chart
