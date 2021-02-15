import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import { createBrowserHistory } from 'history';
import Grow from '@material-ui/core/Grow';
import { AnimationWrapper } from 'react-hover-animation'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 225,
    margin: '20px',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  icon: {
    margin: '10px'
  },  
}));



const CardNote = props => {
  const {history} = createBrowserHistory();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [currentContent, setCurrentContent] = React.useState(props.content);
  const [currentTopic, setCurrentTopic] = React.useState(props.topic);
  const [changeId, setChangedId] = React.useState(props.id);
  const lastModificationDate = props.lastModificationDate.substring(0,10) + "  " +props.lastModificationDate.substring(11,19);
  const [noteDeleted, setNoteDeleted] = React.useState(false);

  console.log(currentTopic);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCancelNote = () => {
    setOpen(false);
    setCurrentContent(props.content);
    setCurrentTopic(props.topic);
  };

  const handleDeleteNote = () => {

    fetch("https://notepad-as7.herokuapp.com/api/"+props.id, {
      method: 'DELETE', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.text())
    .then(data => {
      console.log('Success:', data);
      setNoteDeleted(true);
      window.location.reload(false);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    
  }

  const handleChangeContent = (event) => {
    setCurrentContent(event.target.value);
  }
  const handleChangeTopic = (event) => {
    setCurrentTopic(event.target.value);
  }

  const handleSaveNote = () => {
    setOpen(false);
    const noteData = {
      "noteContent": currentContent,
      "topic": currentTopic,
      "id": props.id
    }

    console.log(noteData);
    fetch("https://notepad-as7.herokuapp.com/api", {
      method: 'PUT', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(noteData),
    })
    .then(response => response.text())
    .then(data => {
      setChangedId(data);
      console.log('Success:', data);
      window.location.reload(false);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  return (
    <>
    <AnimationWrapper>
    <Grow
      in={props != null}
      style={{ transformOrigin: '0 0 0' }}
      {...(props != null ? { timeout: 1000 } : {})}
    >
     <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
          {lastModificationDate}
          </Typography>

          <Typography variant="h5" component="h2" style={{wordBreak: 'break-all'}}>
            {currentTopic}
          </Typography>
          <Typography variant="body2" component="p" style={{wordBreak: 'break-all'}}>
            {currentContent}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="medium" onClick={handleClickOpen}>
            <FontAwesomeIcon className={classes.icon} icon={faEdit} style={{color:"3f50b5"}}/>
          </Button>
          <Button size="medium" onClick={handleDeleteNote}>
            <FontAwesomeIcon className={classes.icon} icon={faTrash} style={{color:"ba000d"}}/>
          </Button>
        </CardActions>
      </Card>
    </Grow>
    </AnimationWrapper>
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
        className={classes.dialog}
      >
        <DialogTitle style={{ cursor: 'move'}} id="draggable-dialog-title">
          
        </DialogTitle>
        <DialogContent>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
          {lastModificationDate}
          </Typography>
          <Typography variant="h5" component="h2">
            <TextField id="standard-basic" label="topic" value={currentTopic} onChange={handleChangeTopic}/>
          </Typography>
          <TextField
          id="filled-multiline-flexible"
          label="note"
          multiline
          rowsMax={20}
          value={currentContent}
          onChange={handleChangeContent}
          />
        </CardContent>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancelNote} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveNote} color="primary">
            Save the note
          </Button>
        </DialogActions>
    </Dialog>
    </> 

    
  );
}

export default CardNote;