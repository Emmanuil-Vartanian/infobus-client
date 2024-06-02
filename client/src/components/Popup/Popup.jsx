import React from 'react'
import { DialogContent, DialogTitle } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import { DialogContentTextStyled, DialogStyled, IconButtonStyled } from './style'

const Popup = props => {
  const { open, onClose, title, content, maxWidthStyle, ...restProps } = props

  return (
    <DialogStyled
      open={open}
      onClose={onClose}
      scroll={'paper'}
      maxWidth={'md'}
      maxwidth={maxWidthStyle}
      {...restProps}
    >
      <DialogTitle>
        {title}
        <IconButtonStyled onClick={e => onClose(e, 'backdropClick')}>
          <CloseIcon />
        </IconButtonStyled>
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentTextStyled tabIndex={-1} component={'div'}>
          {content}
        </DialogContentTextStyled>
      </DialogContent>
    </DialogStyled>
  )
}

export default Popup
