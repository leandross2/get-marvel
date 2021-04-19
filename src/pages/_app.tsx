import { Header } from '../components/Header'
import { ToastContainer } from 'react-toastify'
import { RecoilRoot } from 'recoil'
import Modal from 'react-modal'
import 'react-toastify/dist/ReactToastify.min.css'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  if (typeof (window) !== 'undefined') {
    Modal.setAppElement('#__next')
  }
  return (
    <RecoilRoot>
      <Header />
      <Component {...pageProps} />
      <ToastContainer autoClose={3000} />
    </RecoilRoot>
  )
}

export default MyApp
