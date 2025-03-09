 import {
   BarChart,
   Bar,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   Legend,
   ResponsiveContainer,
   Cell,
 } from 'recharts'
import CustomLegend from './CustomLegend'


const CustomBarChart = ({data}) => {

    const getBarColor = (index) => {
        return index % 2 === 0 ? "#875cf5" : "#cfbefb"
    }

    const CustomTooltip = ({active, payload}) => {
        if(active && payload && payload.length){
             return (
                <div className='bg-white shadow rounded-lg p-2 border border-gray-50'>
                   <p className='text-xs font-semibold text-purple-800 mb-1'>
                       { payload[0].payload.category}
                   </p>
                   <p className='text-sm text-gray-600'>
                   Amount  : <span className='text-sm font-medium text-gray-900'>${payload[0].payload.amount}</span>
                   </p>
                </div>
             )
        }
        return null
    }

  return (
    <div className='mt-6'>

          <ResponsiveContainer width="100%" height={300}>
             <BarChart data={data}>
                <CartesianGrid stroke="none" />
                 <XAxis dataKey="month" tick={{fontSize:12, fill:"#555"}}  stoke="none"  />
                 <YAxis dataKey="amount" tick={{fontSize:12, fill:"#555"}} stoke="none" />
                 <Tooltip content={CustomTooltip} />
                 <Legend content={CustomLegend} />

                 <Bar 
                   dataKey="amount"
                   fill="#ff8042"
                   radius={[10,10,0,0]}
                   activeDot={{r:8, fill:"yellow"}}
                   activeStyle={{fill:"green"}}
                  >
                     {
                         data?.map((entry, index) =>  {
                             const colorBar = getBarColor(index)
                             console.log(colorBar)
                             return (<Cell key={index} fill={colorBar} />)
                            })
                     }
                  </Bar>

             </BarChart>
          </ResponsiveContainer>
    </div>
  )
}

export default CustomBarChart