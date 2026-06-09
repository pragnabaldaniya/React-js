import { Outlet } from 'react-router'
import NavBar from './Components/NavBar'

export default function App() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  )
}
