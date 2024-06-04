import './App.css';
import Maincontent from './components/maincontent/Maincontent';
import Plistage from './pages/plistage/Plistage';
import Mypage from './pages/mypage/Mypage';
import Posting from './pages/posting/Posting';
import Main from './components/main/Main';
import Sidecontent from './components/sidecontent/Sidecontent';
import Edit from './pages/edit/Edit';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Indie from './pages/genre/Indie';
import Ballad from './pages/genre/Ballad';
import Hiphop from './pages/genre/Hiphop';
import Pop from './pages/genre/Pop';
import Rnb from './pages/genre/Rnb';
import Kpop from './pages/genre/KPOP';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <Main />
      <Sidecontent />
        <Routes>
          <Route path="/" element={<Maincontent />} />
          <Route path="/plistage" element={<Plistage />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/posting" element={<Posting />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          
          <Route path="/ballad" element={<Ballad />} />
          <Route path="/indie" element={<Indie />} />
          <Route path="/pop" element={<Pop />} />
          <Route path="/rnb" element={<Rnb />} />
          <Route path="/hiphop" element={<Hiphop />} />
          <Route path="/kpop" element={<Kpop />} />

        </Routes>
    </div>
  );
}

export default App;
