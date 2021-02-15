import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NotesList from './components/NotesList';
import SingleNote from './components/SingleNote';
import {AppBar ,Toolbar, Grid} from "@material-ui/core";
import { makeStyles} from '@material-ui/core/styles';
import React, {useEffect, useState} from "react";
import TextField from '@material-ui/core/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faSearch } from '@fortawesome/free-solid-svg-icons'
import {sortData} from "./util.js";
import { createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { faAirFreshener, faPlusCircle } from '@fortawesome/free-solid-svg-icons'


const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});
const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: '20px',
    paddingTop: '40px',
    paddingRight: '20px'
  }
})


function App() {
  

  const classes = useStyles();
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [addNoteClicked, setAddNoteClicked] = useState(false);
  const fetchAllNotes = () => {
    fetch("https://notepad-as7.herokuapp.com/api/all")
    .then(response=>response.json())
    .then(data=>{
      console.log(data);
      const sortedData = sortData(data);
      setNotes(sortedData)
      setFilteredNotes(sortedData);

    })
  }

  useEffect(() => {
    fetchAllNotes();
  }, []);

  const onSearchTyped = (event) => {
    const searchedValue = event.target.value;
    let filteredNote = []
    notes.forEach(note => {
      if(note.noteContent.includes(searchedValue) || note.topic.includes(searchedValue)) {
        
        filteredNote.push(note);
      }
    });
    console.log(filteredNote);
    setFilteredNotes(filteredNote);
  }

  return (

    <Router>
      <Switch>
        <Route exact path="/"> 
          {/* Navigation */}
          <AppBar position="static" style={{display:'flex'}} >
            <Toolbar style={{ background: '#f3c61c', alignItems: 'center', justifyContent: 'space-evenly'}}>
              
              <TextField id="standard-basic" label={<FontAwesomeIcon icon={faSearch} />} onChange={onSearchTyped}/>

                <br/>
              <Button onClick={() => setAddNoteClicked(true)}>
                <Typography color="primary" style={{fontSize: 14, marginRight: '10px'}} >
                  new
                </Typography>
                <FontAwesomeIcon  icon={faPlusCircle} size="2x" color="primary" />
              </Button>
            </Toolbar>

          </AppBar>
          {/* notes list */}

          {<NotesList items={filteredNotes} addNoteClicked={addNoteClicked}/> }
        </Route>
        <Route path="/id">
          <SingleNote />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
