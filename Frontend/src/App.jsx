import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Pages/Register';
import Login from './Pages/Login';
import CreatePost from './Pages/CreatePost';
import PublicPosts from './Pages/PublicPosts';
import Profile from './Pages/Profile';
import Settings from './Pages/Settings';
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab);
function App() {

  return (
    <Router>
      <div className='container mt-4'>
        <Routes>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/createpost' element={<CreatePost/>}></Route>
          <Route path='/publicpost' element={<PublicPosts/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
          <Route path='/settings' element={<Settings/>}></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
