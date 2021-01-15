import './scss/App.scss';
import Sidebar from './components/shared/Sidebar/Sidebar';
import Header from './components/shared/Header/Header';
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <div className="right-screen">
          <Header />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
