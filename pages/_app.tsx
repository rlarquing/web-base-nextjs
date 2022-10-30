import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {useContext, useEffect} from 'react'
import {useRouter} from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {UserProvider} from '../contexts';
import { store } from '../redux/store';
import { Provider } from 'react-redux'

function MyApp({Component, pageProps}: AppProps) {
    const router = useRouter();

    useEffect(() => {
        const handleStart = (url: string) => {
            NProgress.start()
        }

        const handleStop = () => {
            NProgress.done()
        }

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleStop)
        router.events.on('routeChangeError', handleStop)

        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleStop)
            router.events.off('routeChangeError', handleStop)
        }
    }, [router])
    return (<Provider store={store}><UserProvider><Component {...pageProps} /></UserProvider></Provider>);
}

export default MyApp
