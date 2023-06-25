import AllUsers from './Component/Users/AllUsers';
import AddEmployee from './Component/Add/AddEmployee';
import EditEmployee from './Component/Edit/EditEmployee';
import NavBar from './Component/Navbar/NavBar';
import NotFound from './Component/NotFound'; 
import CrudApp from './Component/Home/CrudApp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<CrudApp /> } />
        <Route path="all" element={<AllUsers /> } />
        <Route path="/add" element={<AddEmployee />} />
        <Route path="/edit/:id" element={<EditEmployee />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
