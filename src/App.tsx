import './App.css'
import NotePage from './Components/Pages/NotePage'
import { CategoryProvider } from './Context/CategoriesContext'

function App() {


  return (
    <>
      <CategoryProvider>
        <NotePage/>
      </CategoryProvider>
    </>
  )
}

export default App
