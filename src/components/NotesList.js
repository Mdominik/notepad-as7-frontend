import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CardNote from './CardNote';
import {AppBar ,Toolbar, Grid, CircularProgress, Input} from "@material-ui/core";
import { makeStyles} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import React, {useEffect, useState} from "react";
import Button from '@material-ui/core/Button';
import { CenterFocusStrong } from "@material-ui/icons";
import Icon from '@material-ui/core/Icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAirFreshener, faAlignCenter, faEdit, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import Grow from '@material-ui/core/Grow';
import { AnimationWrapper } from 'react-hover-animation'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: '20px',
    paddingTop: '40px',
    paddingRight: '20px'
  },
})


function NotesList({items, addNoteClicked=false}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [currentContent, setCurrentContent] = React.useState("");
  const [currentTopic, setCurrentTopic] = React.useState("");

  if(addNoteClicked && !open ) {
    setOpen(true);
    console.log("State of addNoteclIcked" + addNoteClicked);
    console.log("State of open" + open);
  }
  
  const handleClose = () => {
    setOpen(false);
    console.log("handleClose")
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleCancelNote = () => {
    setOpen(false);
    console.log("Closing the dialog");
    addNoteClicked = false;
  };

  const handleSaveNote = () => {
    setOpen(false);
    const noteData = {
      "noteContent": document.getElementById('formContent').value,
      "topic": document.getElementById('formTopic').value,
    }

    console.log(noteData);
    fetch("https://notepad-as7.herokuapp.com/api", {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(noteData),
    })
    .then(response => response.text())
    .then(data => {
      console.log('Success:', data);
      window.location.reload(false);

    })
    .catch((error) => {
      console.error('Error:', error);
    });
    
    console.log("State of let addNote" + open);
  }
  return (
    <>

    {/* notes */}
    
    <Grid container
    className={classes.gridContainer} 
    justify="center">

      {items.map((note) => (
        <Grid item xs={12} sm={6} md={4}>
          <CardNote topic={note.topic} content={note.noteContent}
          lastModificationDate={note.lastModifiedTime}
          createdTime={note.createdTime}
          id={note.id}/>
        </Grid>
      ))}


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
          just now
          </Typography>
          <Typography variant="h5" component="h2">
            <TextField id="formTopic" label="topic"/>
          </Typography>
          <TextField
          id="formContent"
          label="ehh"
          multiline
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

    </Grid>
    </>
  );
}

export default NotesList;
