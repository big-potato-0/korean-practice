import { createTheme } from '@material-ui/core/styles'
import { colors } from './colors'

const theme = createTheme({
  palette: {
    primary: {
      main: colors.UNBLEACHED_SILK,
    },
    secondary: {
      main: colors.BRIGHT_GREY,
    }
  },
})

export default theme