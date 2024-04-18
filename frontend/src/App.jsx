import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import PrivateScreen from './components/PrivateScreen'
import Login from './components/Login'
import Register from './components/Register'
import Forgotpassword from './components/Forgotpassword'
import Resetpassword from './components/Resetpassword'
import { AuthProvider } from './components/AuthContext'
const App = () => {
  return (
    <>
    <AuthProvider>
        <Router>
        <Routes>
            <Route path="/" element={<PrivateScreen/>} />
              <Route path='/login' element={<Login></Login>}></Route>
              <Route path='/register' element={<Register></Register>}></Route>
              <Route path='/forgotpassword' element={<Forgotpassword></Forgotpassword>}></Route>
              <Route path='/resetPassword/:resetToken' element={<Resetpassword></Resetpassword>}></Route>
            </Routes>
        </Router>
    </AuthProvider>
    </>
  )
}

export default App
