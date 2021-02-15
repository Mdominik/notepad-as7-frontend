import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

const useStyles = makeStyles({
  root: {
    minWidth: 225,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  icon: {
    margin: '10px'
  }
});

export default function SingleNote(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  console.log(props.id);
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        {props.createdTime.substring(0,10) + "  " +props.createdTime.substring(11,19)}
        </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        
        </Typography>
        <Typography variant="h5" component="h2">
            {props.topic}
        </Typography>
        <Typography variant="body2" component="p">
          {props.content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <FontAwesomeIcon className={classes.icon} icon={faEdit} />
        </Button>
        <Button size="small">
            <FontAwesomeIcon className={classes.icon} icon={faEdit} />
        </Button>
      </CardActions>
    </Card>
  );
}