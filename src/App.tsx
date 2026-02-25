import './App.css'
import { SideBar } from './components/SideBar/SideBar'
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar'

function App() {
  return (
    <SidebarProvider>
      <SideBar />
      <main>
        <SidebarTrigger />
      </main>
    </SidebarProvider>
  )
}

export default App
