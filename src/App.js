import React from 'react';
import './App.scss';
import Typography from '@material-ui/core/Typography';
import MainComponent from "./components/MainComponent";

function App() {
  return (
      <Typography component="div" variant="body1">
      <MainComponent />
      </Typography>
  );
}

export default App;
