import _ from 'lodash'
import clsx from 'clsx'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, Typography } from '@material-ui/core'
import { colors } from '../../theme/colors'


const useStyles = makeStyles((theme) => ({
  flashcard: {
    maxWidth: 400,
    minHeight: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flip: {
    transform: 'rotateY(180deg)',
  },
  //https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_flip_card
  //.flip-card {
  //   background-color: transparent;
  //   width: 300px;
  //   height: 300px;
  //   perspective: 1000px;
  // }
  //
  // .flip-card-inner {
  //   position: relative;
  //   width: 100%;
  //   height: 100%;
  //   text-align: center;
  //   transition: transform 0.6s;
  //   transform-style: preserve-3d;
  //   box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  // }
  //
  // .flip-card:hover .flip-card-inner {
  //   transform: rotateY(180deg);
  // }
  //
  // .flip-card-front, .flip-card-back {
  //   position: absolute;
  //   width: 100%;
  //   height: 100%;
  //   -webkit-backface-visibility: hidden;
  //   backface-visibility: hidden;
  // }
  //
  // .flip-card-front {
  //   background-color: #bbb;
  //   color: black;
  // }
  //
  // .flip-card-back {
  //   background-color: #2980b9;
  //   color: white;
  //   transform: rotateY(180deg);
  // }
}))
export default function Flashcard(props) {
  const classes = useStyles()
  const { english, korean } = props
  
  const [flip, setFlip] = useState(false)
  
  const handleFlip = () => {
    setFlip(true)
    setTimeout(() => setFlip(false), 1000)
  }
  
  const handleFlipEnd = () => {
    setFlip(false)
  }
  
  console.log('flip ', flip)
  
  return (
    <div onClick={handleFlip}>
      <Card className={clsx(classes.flashcard, flip ? classes.flip: '')} >
        <Typography>b fjkdsl;ajf kl;</Typography>
      </Card>
    </div>
  )
}