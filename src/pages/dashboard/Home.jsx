 import { useNavigate } from "react-router-dom"
import DashboardLayout from "../../components/layouts/DashboardLayout"
import { useAuth } from "../../context/userContext"
import { useUserAuth } from "../../hooks/useUserAuth"
import { useEffect, useState } from "react"
import axiosInstance from "../../utils/axiosInstance"
import { API_PATHS } from "../../utils/apiPaths" 
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu'
import { IoMdCard }  from "react-icons/io"
import { addThousandsSeparator } from "../../utils/helpers"
import InfoCard from "../../components/cards/InfoCard"
import RecentTransactions from "../../components/dashboard/RecentTransactions"
import FinanceOverview from "../../components/dashboard/FinanceOverview"
import ExpenseTransactions from "../../components/dashboard/ExpenseTransactions"
import Last30DaysExpenses from "../../components/dashboard/Last30DaysExpenses"
import RecentIncomeWithChart from "../../components/dashboard/RecentIncomeWithChart"
import RecentIncome from "../../components/dashboard/RecentIncome"

 
 

const Home = () => {
  useUserAuth()
  const {user} = useAuth()
  const navigate =  useNavigate()

  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetDashboardData = async () => {
     if(loading) return;

     setLoading(true)

     try {
           const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`)

           if(response.data.data){
              console.log("Home/DashBoardData",response.data.data )
              setDashboardData(response.data.data)
           }
     } catch (error) {
         console.log("Something went wrong. Please try again . ", error)
     }finally {
      setLoading(false)
     }
  }
   

  useEffect(() => {
       fetDashboardData()
       return () => {}
  },[])

  return (
   
      <DashboardLayout activeMenu="Dashboard">
          <div className="my-5 mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <InfoCard
                         icon={<IoMdCard />}
                         label="Total Balance"
                         value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
                         color="bg-primary"
                     />
                      <InfoCard
                         icon={<LuWalletMinimal />}
                         label="Total Income"
                         value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
                         color="bg-orange-500"
                     />
                      <InfoCard
                         icon={<LuHandCoins />}
                         label="Total Expense"
                         value={addThousandsSeparator(dashboardData?.totalExpenses || 0)}
                         color="bg-red-500"
                     /> 
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                 <RecentTransactions 
                    transactions={dashboardData?.recentTransactions}
                    onSeeMore = {() => navigate('/expense')}
                 />

                 <FinanceOverview 
                     totalBalance={dashboardData?.totalBalance || 0}
                     totalIncome={dashboardData?.totalIncome || 0}
                     totalExpense={dashboardData?.totalExpenses || 0}
                  />

                  <ExpenseTransactions 
                    transactions={dashboardData?.last30DaysExpenses?.transactions}
                    onSeeMore={() => navigate('/')}
                  />

                  <Last30DaysExpenses 
                      data={dashboardData?.last30DaysExpenses?.transactions}
                   />

                 <RecentIncomeWithChart
                   data={dashboardData?.last60DaysIncome?.transactions.slice(0,5) || []}  
                   totalIncome={dashboardData?.totalIncome}
                   />
                <RecentIncome 
                   transactions={dashboardData?.last60DaysIncome?.transactions || []}
                   onSeeMore={() => navigate('/income')}
                />

              </div>

          </div>
      </DashboardLayout>
  )
}

export default Home