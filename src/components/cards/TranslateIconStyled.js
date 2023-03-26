import React from 'react'
import clsx from 'clsx'
import { Tooltip } from '@material-ui/core'
import TranslateOutlinedIcon from '@material-ui/icons/TranslateOutlined'
import { makeStyles } from '@material-ui/core/styles'
import { KOREAN } from '../../utility/constants'
import { colors } from '../../theme/colors'

const useStyles = makeStyles((theme) => ({
  icon: {
    cursor: 'pointer',
  },
  korean: {
    color: colors.PALE_CHESTNUT,
  },
  english: {
    color: colors.PALE_GREY,
  },
}))
export default function TranslateIconStyled(props) {
  const classes = useStyles()
  const { language, onClick } = props
  
  const tooltipText = language === KOREAN ? 'Translate to English' : 'Translate to Korean'
  
  return (
    <Tooltip title={tooltipText} enterDelay={750} enterNextDelay={750}>
      <TranslateOutlinedIcon
        className={clsx(classes.icon, language === KOREAN ? classes.korean: classes.english)}
        onClick={onClick}
      />
    </Tooltip>
  )
  
}
