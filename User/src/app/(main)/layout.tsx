import AppNavbar from '@/components/AppNavbar'
import { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

const MainLayout = ({children}: Props) => {
  return (
    <main>
        <AppNavbar/>
        {children}
    </main>
  )
}

export default MainLayout