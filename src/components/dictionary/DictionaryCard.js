import React from 'react'
import { Card, CardContent, CardHeader, Divider, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
  },
}))
export default function DictionaryCard(props) {
  const { englishLst, dictionary, title } = props
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardHeader title={title} />
      <Divider/>
      <CardContent>
        <div className={classes.definitions}>
          { englishLst.map(englishWord => {
            return <Typography>{getDictionaryStr(dictionary, englishWord)}</Typography>
          })}
        </div>
      </CardContent>
    </Card>
  )
}

const getDictionaryStr = (dictionary, key) => {
  const value = dictionary[key]
  return `${key}: ${value}`
}