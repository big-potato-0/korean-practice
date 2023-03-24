import Link from 'next/link'
import _ from 'lodash'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Divider } from '@material-ui/core'
import { colors } from '../../theme/colors'

const useStyles = makeStyles((theme) => ({
  itemContainer: {
    padding: theme.spacing(2, 1, 2, 1),
  },
  current: {
    backgroundColor: colors.UNBLEACHED_SILK_50,
  },
  notCurrent: {
  
  },
}))

export default function NavItem(props) {
  const classes = useStyles()
  const { page, text, onClick, currentPage } = props
  
  const isCurrentPage = _.isEqual(currentPage, page)
  const containerClassName = isCurrentPage ? classes.current : classes.notCurrent
  
  return (
    <div className={containerClassName}>
      <Link href={page}>
        <div className={classes.itemContainer} onClick={onClick}>
          {text}
        </div>
      </Link>
      <Divider />
    </div>
  )
}
