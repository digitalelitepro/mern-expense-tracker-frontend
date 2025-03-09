 import { LuPlus } from "react-icons/lu"
import CustomBarChart from "../charts/CustomBarChart"
import { useEffect, useState } from "react"
import { prepareIncomeBarCharData } from "../../utils/helpers"


 const IncomeOverview = ({transactions, onAddIncome}) => {
    const [chartData, setChartData] = useState([])

    useEffect(() => {
        const result = prepareIncomeBarCharData(transactions)
        setChartData(result)
        return () => {}
    },[transactions])

  return (
    <div className="card">
         <div className="flex justify-between items-center">
           <div className="flex flex-col justify-center  gap-1">
              <h5 className="text-lg font-semibold">Income OverView</h5>
              <p className="text-xs text-gray-600 mt-0.5">
                Track your earning over time and analyse your income
              </p>
           </div>

          <button className="add-btn" onClick={onAddIncome}>
              <LuPlus className="text-lg" />
              Add Income
          </button>
         </div>

         <div className="mt-10">
            <CustomBarChart data={chartData} />
         </div>

    </div>
  )
}

export default IncomeOverview