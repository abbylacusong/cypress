import { createClient } from '@/lib/utils/supabase/server'
import db from '@/lib/supabase/db'
import { redirect } from 'next/navigation'
import DashboardSetup from '@/components/dashboard-setup/dashboard'

const DashboardPage = async () => {

  const supabase = await createClient()
  const { data : { user } } = await supabase.auth.getUser()
  if(!user) return

  const workspace = await db.query.workspaces.findFirst({
    where: (workspace , {eq} ) => eq(workspace.workspaceOwner,user.id)
  })

  if(!workspace){
    return (
      <div className='bg-background h-screen w-screen flex justify-center items-center'>
        <DashboardSetup>

        </DashboardSetup>
      </div>
    )
}

  redirect(`dashboard/${workspace.id}`)
}

export default DashboardPage