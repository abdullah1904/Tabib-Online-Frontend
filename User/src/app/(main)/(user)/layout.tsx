import AppNavbar from '@/components/AppNavbar'
import { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

const UserLayout = ({children}: Props) => {
  return (
    <main>
        <AppNavbar/>
        {children}
    </main>
  )
}

export default UserLayout