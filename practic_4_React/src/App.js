import './CSS/App.css';
import rooms from './data.js';
import Table from './components/Table.js';

function App() {
  return (
    <div className="App">
       <Table data={ rooms } amountRows="15" />
    </div>
  );
}

export default App;
