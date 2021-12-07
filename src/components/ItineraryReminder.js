import React, { useState } from 'react'
import { Fab, Badge, Popover, Typography, Button, Card, CardActions, CardContent, CardMedia } from '@mui/material'
import TextSnippetIcon from '@mui/icons-material/TextSnippet'

export default function ItineraryReminder() {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <React.Fragment>
      <Popover
        open={open}
        onClose={handleClose}
        // anchorReference="anchorPosition"
        // anchorPosition={{ top: 0, left: 0 }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        marginThreshold={0}
        PaperProps={{
          sx: {
            height: '100%',
            maxHeight: '100%',
            padding: '1rem',
          },
        }}
        sx={{
          zIndex: 1600,
          width: 360,
        }}
      >
        <Card sx={{ maxWidth: 345, mb: '0.75rem', }}>
          <CardMedia
            component="img"
            height="140"
            image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="140"
            image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>

      </Popover>

      <Fab
        onClick={handleClick}
        sx={{
          position: 'absolute',
          left: 24,
          bottom: 24,
          // 需介於1200至1300之間
          zIndex: 1250,
        }}
      >
        <Badge badgeContent={'n'} color="info">
          <TextSnippetIcon />
        </Badge>
      </Fab>
    </React.Fragment>
  )
}
