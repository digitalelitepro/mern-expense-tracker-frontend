 import { useEffect, useState } from 'react'
import {LuArrowRight} from 'react-icons/lu'
import CustomPieChart from '../charts/CustomPieChart'
 
const COLORS = ["#fa2c37","#875cf5","#ff6900","#4f39f6"]
 
const RecentIncomeWithChart = ({data,totalIncome}) => {
    const [chartData , setChartData ] = useState([])
    const prepareChartData = () => {
        const dataArr = data?.map((item) => ({
            name:item?.source,
            amount:item?.amount
        }))

       setChartData(dataArr)
    }

    useEffect(() => {
        prepareChartData()
        return () => {}

    }, [data])
  return (
    <div className="card">
         <div className="flex justify-between items-center">
            <h5 className="text-lg">Last 60 Days Incomes</h5>
            <button className='card-btn'>
                See All <LuArrowRight />
            </button>
         </div>

         <CustomPieChart 
          data={chartData}
          label="Total Income"
          totalAmount = {`$${totalIncome}`}
          showTextAnchor 
          colors={COLORS}
         />


    </div>
  )
}

export default RecentIncomeWithChart