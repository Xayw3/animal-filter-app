import { useState } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import './App.scss';
import AnimalList from './components/AnimalList/AnimalList';
import AnimalCard from './components/Card/AnimalCard';

const App = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div className="App p-3">
      <Button onClick={handleShow}>Add new animal</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new animal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AnimalList />
        </Modal.Body>
      </Modal>
      <AnimalCard />
    </div>
  );
};

export default App;
