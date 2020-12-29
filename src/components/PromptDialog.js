import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

class PromptDialog extends React.Component {
  state = {
    value: this.props.defaultValue
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value })
  }

  render () {
    const { value } = this.state;
    const { open, onClose, onExited, title, message, placeholder,ok, cancel, required, defaultValue } = this.props

    return (
      <Dialog
        fullWidth
        open={open}
        onClose={() => onClose(null)}
        onExited={onExited}
        aria-labelledby="prompt-dialog-title"
        aria-describedby="prompt-dialog-message"
      >
        <DialogTitle id="prompt-dialog-title">{title}</DialogTitle>
        <DialogContent>
          {typeof message === `string`
            ? <DialogContentText id="confirm-dialog-message">{message}</DialogContentText>
            : message}
          <TextField
            id="prompt-dialog-text-field"
            onChange={this.handleChange}
            defaultValue={defaultValue}
            required
            placeholder={placeholder}
            margin="dense"
            fullWidth
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose(null)} color={cancel.color} variant={cancel.variant} startIcon={cancel.startIcon} endIcon={cancel.endIcon}>{cancel.text}</Button>
          <Button onClick={() => onClose(value)} color={ok.color} variant={ok.variant} disabled={required && !value} startIcon={ok.startIcon} endIcon={ok.endIcon}>{ok.text}</Button>
        </DialogActions>
      </Dialog>
    )
  }
}

PromptDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onExited: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.node,
  placeholder: PropTypes.string,
  ok: PropTypes.shape({
    text: PropTypes.string,
    color: PropTypes.string,
    variant: PropTypes.string,
    startIcon: PropTypes.element,
    endIcon: PropTypes.element
  }),
  cancel: PropTypes.shape({
    text: PropTypes.string,
    color: PropTypes.string,
    variant: PropTypes.string,
    startIcon: PropTypes.element,
    endIcon: PropTypes.element
  }),
  required: PropTypes.bool,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

PromptDialog.defaultProps = {
  open: false,
  title: '',
  placeholder: '',
  ok: {
    text: 'OK',
    color: 'primary',
    variant: 'text'
  },
  cancel: {
    text: 'Cancel',
    color: 'primary',
    variant: 'text'
  },
  required: false
}

export default PromptDialog
