import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Divider } from '@material-ui/core'
import ImgHeader from './ImgHeader'
import Nav from './Nav'
import { colors } from '../../theme/colors'


const useStyles = makeStyles((theme) => ({
  root: {},
  mainDivider: {
    backgroundColor: colors.UNBLEACHED_SILK,
    width: '100%',
    height: theme.spacing(1),
  },
}))

export default function AppWrapper({ children }) {
  const classes = useStyles()
    return (
      <Grid container className={classes.root}>
        <ImgHeader />
        <Divider className={classes.mainDivider}/>
        <Nav>
          {children}
        </Nav>
      </Grid>
    )
}