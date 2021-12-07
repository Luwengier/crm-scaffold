import React from 'react'
import { styled } from '@mui/material/styles'
import { Drawer as MuiDrawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import AudiotrackIcon from '@mui/icons-material/Audiotrack'
import TwitterIcon from '@mui/icons-material/Twitter'

const drawerWidth = 240

const openedMixin = theme => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.standard,
  }),
  overflowX: 'hidden',
})

const closedMixin = theme => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  // [theme.breakpoints.up('sm')]: {
  //   width: `calc(${theme.spacing(9)} + 1px)`,
  // },
})

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...closedMixin(theme),
    '& .MuiDrawer-paper': {
      ...closedMixin(theme),
      backgroundColor: '#fcfcfc',
    },
    '& .MuiListItemText-root': {
      overflow: 'hidden',
    },
    '& .MuiListItemIcon-root': {
      minWidth: 0,
    },
    '& .MuiButtonBase-root:hover': {
      backgroundColor: 'rgb(182 255 235 / 15%)',
    },
    '& .MuiButtonBase-root:hover .MuiListItemIcon-root': {
      color: '#3c97a4',
    },
    '&:hover': {
      // 以下取消註解變成可推擠其他內容的Drawer
      // ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    },
  }),
)

export default function MiniDrawer() {

  return (
    <Drawer variant="permanent">
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Tik Tok', 'Trash'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
            <ListItemIcon>
              {index % 2 === 0 ? <AudiotrackIcon /> : <TwitterIcon />}
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}
