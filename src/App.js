import './scss/App.scss';
import Sidebar from './components/shared/Sidebar/Sidebar';
import Header from './components/shared/Header/Header';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';

function App() {

  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <div className="right-screen">
          <Header />            
          <Dashboard />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
