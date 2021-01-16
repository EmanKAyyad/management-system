import './scss/App.scss';
import Sidebar from './components/shared/Sidebar/Sidebar';
import Header from './components/shared/Header/Header';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

function App(props) {

  const expandedPanel = {
    flex: 1
  };

  const condensedPanel = {
    width: 'calc(100% - 242px)'
  };

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

const mapStateToProps = state => {
  return {
    panelExpanded: !state.openSideBarFlag
  }
}
export default connect(mapStateToProps)(App);
