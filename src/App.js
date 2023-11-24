import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import SortingScreen from './screens/SortingScreen';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import PrimeNumberScreen from './screens/PrimeNumberScreen';
import BinarySearchScreen from './screens/BinarySearchScreen';
import TwoPointerScreen from './screens/TwoPointerScreen';
import Container from '@mui/material/Container';
import GraphScreen from './screens/GraphScreen';
import AboutMeScreen from './screens/AboutMeScreen';
import SinglyLinkedList from './screens/SinglyLinkedList';


const App = () =>{
  return(
    <React.Fragment>
     <BrowserRouter>
     <Container maxWidth="lg" sx={{bgcolor: '#fff'}}>
     <ResponsiveAppBar/>
      <Routes>
        <Route path="/" element={<SortingScreen />} exact/>
      </Routes>
      <Routes>
        <Route path="/prime_number" element={<PrimeNumberScreen />}/>
      </Routes>
      <Routes>
        <Route path="/binary_search" element={<BinarySearchScreen />}/>
      </Routes>
      <Routes>
        <Route path="/two_pointer" element={<TwoPointerScreen />}/>
      </Routes>
      <Routes>
        <Route path="/graph_screen" element={<GraphScreen />}/>
      </Routes>
      <Routes>
        <Route path="/about_me_screen" element={<AboutMeScreen />}/>
      </Routes>
      <Routes>
        <Route path="/singly" element={<SinglyLinkedList />}/>
      </Routes>
      <div style={{paddingBottom: '500px'}}></div>
      </Container>
    </BrowserRouter>
    </React.Fragment>
  )
}
export default App;