import React from 'react'
import _ from 'lodash'
import { Card, CardContent, CardHeader, Divider, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { places } from '../../korean/vocabulary/nouns'

const useStyles = makeStyles((theme) => ({
  container: {
  
  },
  header: {
    paddingBottom: theme.spacing(2),
  },
  card: {
    padding: theme.spacing(2),
    maxWidth: 300,
  },
  definitions: {
  },
}))
export default function Home() {
  const classes = useStyles()
  const placesEnglish = _.keys(places)
  
  // TODO: make into a pretty card
  
  return (
    <div>
      <div className={classes.header}>
        <Typography variant="h2">Directory</Typography>
      </div>
      <Card className={classes.card}>
        <CardHeader title="Places" />
        <Divider/>
        <CardContent>
          <div className={classes.definitions}>
            { placesEnglish.map(placeEnglish => {
              return <Typography classN>{getDictionaryStr(places, placeEnglish)}</Typography>
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const getDictionaryStr = (dictionary, key) => {
  const value = dictionary[key]
  return `${key}: ${value}`
}