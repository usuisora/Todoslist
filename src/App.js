import React,{useState} from 'react'
import {MyProvider} from './Provider'
import Bar from './components/Bar/Bar'
import { createMuiTheme,MuiThemeProvider } from '@material-ui/core/styles';
import SideBar from './components/SideBar/SideBar';
import TodosTable from './components/Main/TodosTable';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#444',
    },
    secondary: {
      main: '#f12',
    },
  },
}
);

   function App(props){
  const [isSideOpen, setIsSideOpen] = useState(false);


  return (
    <MyProvider>
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Bar  setIsSideOpen = {setIsSideOpen}/>
          <SideBar isSideOpen= {isSideOpen} setIsSideOpen = {setIsSideOpen}/>
          <TodosTable/>
        </div>
      </MuiThemeProvider>
    </MyProvider>
  )
  }

export default App
