import { useState } from 'react';
import './App.css';
import { VoteTimeline } from './components/VoteTimeline/VoteTimeline';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  customTabs: {
    "& .MuiTab-root": {
      color: "#1D4659",
      opacity: "90%"
    }
  }
});

function App() {
  const [value, setValue] = useState(1);
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="content">
      <Tabs classes={{ root: classes.customTabs }} value={value} onChange={handleChange}>
        <Tab className={value === 0 ? 'unselected' : ''} label="Day One" />
        <Tab className={value === 1 ? 'unselected' : ''} label="Day Two" />
      </Tabs>

      {value === 0 && (<VoteTimeline day={1} />)}
      {value === 1 && (<VoteTimeline day={2} />)}
    </div>
  );
}

export default App;
