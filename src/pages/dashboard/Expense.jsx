import DashboardLayout from "../../components/layouts/DashboardLayout"
import { useUserAuth } from "../../hooks/useUserAuth"
 
const Expense = () => {
  useUserAuth()
  return (
    <DashboardLayout activeMenu="Expense">
          <div className="my-5 mx-auto">Expense</div>
     </DashboardLayout>

  )
}

export default Expense