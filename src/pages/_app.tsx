import { Header } from '../components/Header'
import { ToastContainer } from 'react-toastify'
import { RecoilRoot } from 'recoil'

import 'react-toastify/dist/ReactToastify.min.css'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Header />
      <Component {...pageProps} />
      <ToastContainer autoClose={3000} />
    </RecoilRoot>
  )
}

export default MyApp
