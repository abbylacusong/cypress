import React from 'react'
import { AuthUser } from '@supabase/supabase-js'

interface DashboardSetupProps{
    user : AuthUser,
    subscription : { } | null,

}

const DashboardSetup:React.FC<DashboardSetupProps> = ({
    user,
    subscription
}) => {
  return (
    <div>DashboardSetup</div>
  )
}

export default DashboardSetup