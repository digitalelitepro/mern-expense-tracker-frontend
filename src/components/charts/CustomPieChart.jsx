 import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Text,
  ResponsiveContainer,
  Legend,
 } from "recharts"
import CustomToolkit from "./CustomToolkit"
import CustomLegend from "./CustomLegend"
   
 
const CustomPieChart = ({data,label,totalAmount,colors,showTextAnchor}) => {
  return (
      <ResponsiveContainer width="100%" height={380}>
         <PieChart>
            <Pie 
               data={data}
               dataKey="amount"
               nameKey="name"
               cx="50%"
               cy="50%"
               outerRadius={140}
               innerRadius={100}
               labelLine={false}
              >
                 {
                     data?.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                     ))
                 }

              </Pie>
               <Tooltip content={CustomToolkit} />
               <Legend content={CustomLegend}/>

               {
                     showTextAnchor && (
                     <>
                        <Text 
                            x="50%"
                            y="50%"
                            dy={-25}
                            textAnchor="middle"
                            fill="#666"
                            fontSize="14px"
                            >
                                {label}
                        </Text>

                        <Text
                            x="50%"
                            y="50%"
                            dy={8}
                            textAnchor="middle"
                            fill="#333"
                            fontSize="24px"
                            fontWeight="semi-bold"
                         >
                            {totalAmount}
                        </Text>
                     </>
                   )
               }

         </PieChart>
      </ResponsiveContainer>
  )
}

export default CustomPieChart