import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Alert from '@material-ui/lab/Alert';

import Axios from 'axios'



const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    flexGrow: 1,
  },
  inputFiledStyle:{
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function App() {
  const classes = useStyles();

  const [method, setMethod] = useState('')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const handleChange = (event) => {
    setMethod(event.target.value);
  };
  const submitInfo=()=>{
    let obj={sortMethod:method,input:input}
    console.log(obj)
    Axios.post('http://localhost:5000/post',obj)
    .then(data=>{
      console.log(data.output)
      setOutput(data.data.output)
    })
    .catch(err=>{
      console.log(err)
    })
  }
  
  
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          </IconButton>
          <Typography variant="h6" color="inherit">
            Test Application
          </Typography>
        </Toolbar>
      </AppBar>

      <div className="row mt-5" >
        <div className="col-md-4 offset-md-4">
          {
              output?
              <Alert severity="success">
                <strong>Result is : </strong>
                {output}
                </Alert>
              :''
            }
          <Card >
            <h4 className="text-info text-center m-2">Enter Your Input</h4>
            <CardContent>
              <form className={classes.inputFiledStyle} noValidate autoComplete="off">
                <FormControl className={classes.formControl}>
                  <InputLabel  id="demo-simple-select-label">Select A Method</InputLabel>
                  <Select
                    labelId="Select A Method"
                    id="demo-simple-select"
                    value={method?method:'Please Select a Method'}
                    onChange={handleChange}
                  >
                    <MenuItem value={'sana'}>String  (Ascending) and Number (ascending)</MenuItem>
                    <MenuItem value={'sdnd'}>String  (Descending) and Number (Descending)</MenuItem>
                    <MenuItem value={'nasa'}>Number (Ascending) and String  (Ascending)</MenuItem>
                    <MenuItem value={'ndsd'}>Number (Descending) and String  (Descending)</MenuItem>
                  </Select>
                </FormControl>
                <TextField onChange={(event)=>{setInput(event.target.value)}} id="standard-basic" label="Enter Inpur here " />
              </form>
            </CardContent>
            <CardActions>
              {
                method && input ?
                <Button onClick={()=>{submitInfo()}} variant="outlined" color="primary" className="ml-3 mb-2">Submit</Button>:
                <p className="ml-3 mb-2 text-info">Please Select Method and fill up input filed</p>
              }
            </CardActions>
          </Card>
        </div>
      </div>
    </div>
  );
}
