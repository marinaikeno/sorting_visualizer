import React from 'react';
import '../css/bar.css';
import Chart from './chart/Chart';
import SortSelector from './selectors/SortSelector';

function App() {
  return (
    <div className="main-container">
      <SortSelector />
      <Chart />
      <h2><a target="_blank" href="https://github.com/marinaikeno/sorting_visualizer"><i className="fa fa-github" /> check out my repo</a></h2>
    </div>
  );
}

export default App;
