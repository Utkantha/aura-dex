
import './App.css'
import { Provider } from "react-redux"
import { store } from './redux/store'
import { BrowserRouter } from 'react-router'
import Mainroutes from './router/Mainroutes'
import { Toaster } from "sonner"
import { GoogleOAuthProvider } from '@react-oauth/google';


function App() {
  return (
    <Provider store={store} >
      <BrowserRouter>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || "dummy-client-id"}>
          <Mainroutes />
          <Toaster richColors position="top-right" closeButton />
        </GoogleOAuthProvider>
      </BrowserRouter>
    </Provider>
  )
}

export default App
