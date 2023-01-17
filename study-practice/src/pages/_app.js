import { ThemeProvider } from '@material-ui/core'
import theme from '../theme/theme'

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
