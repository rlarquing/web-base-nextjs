import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {useContext, useEffect} from 'react'
import {useRouter} from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {UserProvider} from '../contexts';
import { store } from '../redux/store';
import { Provider } from 'react-redux'
import {SnackbarOrigin, SnackbarProvider} from 'notistack';
import { isMobile } from 'react-device-detect';

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
    /**
     * El número máximo de barras de mensajes mostradas. Si supera, se cerrará la primera abierta y luego se mostrará la nueva. Es una cola
     * Si solo desea mostrar uno, configúrelo en 1 y 3 es el valor predeterminado
     */
    const MAX_SNACKBAR = 3
// Establece el tiempo de ocultación automática, el valor predeterminado es 5 segundos, que es 5000 milisegundos
    const AUTO_HIDE_DURATION = 3000
// Establecer la posición de la barra de mensajes, el valor predeterminado es la parte inferior izquierda
    const POSITION: SnackbarOrigin = {
        vertical: 'bottom', horizontal: 'right'
    }
    const DIRECTION: any ={
        direction: 'up'
    }
    return (<Provider store={store}><UserProvider><SnackbarProvider maxSnack={MAX_SNACKBAR} autoHideDuration={AUTO_HIDE_DURATION} anchorOrigin={POSITION} TransitionProps={DIRECTION} dense={isMobile}><Component {...pageProps} /></SnackbarProvider></UserProvider></Provider>);
}

export default MyApp
