import React,{useState, Fragment} from 'react'
import TextField from '@material-ui/core/TextField';
import { withStyles,createStyles} from '@material-ui/core/styles';
import { Divider , FormControl, RadioGroup,FormControlLabel,Radio, Button,InputAdornment} from '@material-ui/core';
import TegsField from './TegsField'
import DoneIcon from '@material-ui/icons/Done';
import DescIcon from '@material-ui/icons/Description';
import TimeIcon from '@material-ui/icons/AccessTime';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme =>createStyles({
    root: {
        display: 'flex',
        // flexWrap: 'wrap',
        flexDirection: 'column',
        padding: 20,
        overflow:'auto',
        height:'65%'
    }, 
    formControl: {
      margin: 12
    },
    group: {
        margin: 0
    },
    progress : {
      marginLeft: 'auto' ,
      marginRight: 'auto' 
    }
})


function SideForm({classes,importance, addTodo,setIsSideOpen,initTodo,setMsg,setOpenSnack,setInitTodo}) {
    
    const [progressStyle, setProgressStyle] = useState({
      display: "none"
    });
  
   const [buttonStyle, setButtonStyle] = useState({});
   
    const scrollToBottom =()=>{
      var f = document.getElementById('rootform');
      f.scrollTop = f.scrollHeight;
    }

    const handleChange=({target:{value,name}})=>{
      if(name === 'todo'){
         setInitTodo({...initTodo,name:value})

      }
      else{
        setInitTodo({...initTodo,[name]:value})

      }
    }
  
  return (
    <Fragment>
    <form  className = {classes.root} id = 'rootform' onSubmit ={e=>{ e.preventDefault()}}>

          <TextField  
            name="todo"
            multiline
            rowsMax="1"
            placeholder = 'Задача...'
            value={initTodo.name}
            onChange={handleChange}
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DoneIcon />
                  </InputAdornment>
                )}}
          />
          <TextField 
            name='description'
            placeholder = 'Описание...'
            multiline
            rowsMax="4"
            margin="normal"
            value={initTodo.description}
            onChange={handleChange}
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DescIcon/>
                  </InputAdornment>
                )}}
            
          />
          <TextField
            name="date"
            label="Дата"
            type="date"
            placeholder = 'Дата...'
            value={initTodo.date}

            onChange={handleChange}
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TimeIcon />
                  </InputAdornment>
                )}}
            InputLabelProps={{
              shrink: true,
          }}/>
          
          <FormControl component="fieldset" className={classes.formControl}>
              <RadioGroup
                value={initTodo.importance}
                onChange={handleChange}
                id = 'importance'
                name= 'importance'
                className={classes.group}
                
              >
                {
                  importance.map(el =>{
                    return (<FormControlLabel id = {el.id} key = {el.id} value={el.name} control={<Radio />} label={el.name}  />)       
                })
                }         
              </RadioGroup>
          </FormControl>
          
          <TegsField newtodo = {initTodo} setNewtodo = {setInitTodo} scrollToBottom ={scrollToBottom} />
      </form>
     <Divider/>
        
        <Button  style = {buttonStyle} color="primary" onClick={()=>{

                                                  if(initTodo.name ==null){
                                                    setMsg('Введите пожалуйта задачу')
                                                    setOpenSnack(true);
                                                    
                                                  }
                                                  else{
                                                  setTimeout(()=>{
                                                     addTodo()
                                                     setIsSideOpen(false);
                                                  },2000)
                                                  setProgressStyle({
                                                    padding: 20,
                                                    marginLeft: 'auto' ,
                                                    marginRight: 'auto' ,
                                                    zIndex  : 2
                                                  })     
                                                  setButtonStyle({
                                                    display: "none"
                                                  })
                                                  }
                                               }} 
                                                  >Сохранить</Button>
        <Button style = {buttonStyle} color="secondary" onClick={()=>{
                                                            setIsSideOpen(false) 
                                                                setInitTodo({})   
                                                          }}>Отмена</Button>
        <CircularProgress style= {progressStyle} />

</Fragment>
  )
}

export default withStyles(styles)(SideForm)
