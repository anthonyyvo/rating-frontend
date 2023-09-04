import axios from 'axios';
import React, { PureComponent, useEffect, useState } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import './chart.scss';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];
const data2 = [
  { name: '1 stars', value: 1 },
  { name: '2 stars', value: 23 },
  { name: '3 stars', value: 23 },
  { name: '4 stars', value: 50 },
];

const COLORS = ['#FF6042', '#FF8042', '#FFBB28', '#00C49F', '#0088FE'];


const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const PieChartIndex = ({ colors, index, name }) => {
  return (
    <li>
      <div className='colorIndex' style={{ backgroundColor: colors[index] }}></div>
      {name}
    </li>
  )
}

const Chart = ({ location, info }) => {
  const [dataChart, setDataChart] = useState(data2);
  if (location === 1) {
    console.log('1')
  }
  useEffect(() => {
    const urlRes = `${process.env.REACT_APP_SERVER}/rating`;
    axios.get(urlRes)
      .then(res => {
        const dataFinal = res.data;
        console.log(dataFinal);
        let finalDataChart = [
          { name: "1", value: 0 },
          { name: "2", value: 0 },
          { name: "3", value: 0 },
          { name: "4", value: 0 },

        ]
        finalDataChart.map((e, i) => {
          let countRate = dataFinal.reduce((acc, current, index) => {
            if (current[info] === i +1 && current.location === location ) {
              acc++
            }
            return acc;
          }, 0);
          e.value = countRate;

        })
        setDataChart(finalDataChart);
        console.log(finalDataChart)
      })

  }, [])

  return (
    <div className='chartWrap'>
      <div className='chartPie'>
        {dataChart ?
          (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={300} height={300}>
                <Pie
                  data={dataChart}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {dataChart.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

          ) : ''}
      </div>
      <p className='chartIndexTitle'>ĐÁNH GIÁ QUẬN {location}</p>
      <ul className='chartIndex'>
        {dataChart.map((e,i) => 
        (
          <PieChartIndex colors={COLORS} index={i} name={e.name} />
        )
        )}
        

      </ul>
    </div>
  )

}
export default Chart;
