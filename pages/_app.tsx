import '../styles/globals.css'
import type {AppProps} from 'next/app'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {Provider} from '../contexts';
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
    return (<Provider><Component {...pageProps} /></Provider>);
}

export default MyApp
