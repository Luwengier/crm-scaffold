import React from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

export default function MemberInfo() {
  return (
    <Paper elevation={0} sx={{
      p: { xs: 4, sm: 1 },
      mb: 1,
      bgcolor: 'info.bg',
      color: (theme) =>
        theme.palette.getContrastText(theme.palette.info.bg),
      '& .MuiGrid-item': {
        pr: 2,
      },
      '& .MuiTypography-subtitle1': {
        fontWeight: 'bold',
      },
    }}>
      <Grid container>
        <Grid item container xs={12} sm="auto" direction="column">
          <Grid item>
            <Typography variant="subtitle1" component="span">
              會員代碼 :&nbsp;
            </Typography>
            <Typography variant="body1" component="span">
              CU009999
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="span">
              會員代碼 :&nbsp;
            </Typography>
            <Typography variant="body1" component="span">
              CU009999
            </Typography>
          </Grid>
        </Grid>

        <Grid item container xs={12} sm="auto" direction="column">
          <Grid item>
            <Typography variant="subtitle1" component="span">
              會員代碼 :&nbsp;
            </Typography>
            <Typography variant="body1" component="span">
              CU0099992266
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="span">
              會員代碼cc :&nbsp;
            </Typography>
            <Typography variant="body1" component="span">
              CU009999
            </Typography>
          </Grid>
        </Grid>

        <Grid item container xs={12} sm="auto" direction="column">
          <Grid item>
            <Typography variant="subtitle1" component="span">
              會員代碼 :&nbsp;
            </Typography>
            <Typography variant="body1" component="span">
              CU0099992266
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="span">
              會員代碼cc :&nbsp;
            </Typography>
            <Typography variant="body1" component="span">
              CU009999677777000
            </Typography>
          </Grid>
        </Grid>

      </Grid>
    </Paper>
  )
}


