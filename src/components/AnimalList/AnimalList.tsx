import { useDispatch, useSelector } from 'react-redux';
import { FC, useState } from 'react';
import {
  Button, Col, Form, Row,
} from 'react-bootstrap';
import { add, animalType, push } from '../../store/reducers/animalsSlice';
import { RootState } from '../../store';
import './animal-list.scss';

const AnimalList = () => {
  const animalsSpecies = useSelector((state: RootState) => state.persistedReducer.animals.animalsSpecies);
  const dispatch = useDispatch();

  const [animal, setAnimal] = useState<animalType | any>();
  const [addSpecies, setAddSpecies] = useState(0);
  const [validated, setValidated] = useState(false);
  const [disable, setDisable] = useState(false);

  const onHandleSubmit = () => {
    if (!animal?.name) {
      setDisable(true);
    } else if (!animal?.image) {
      setDisable(true);
    } else if (!animal?.species) {
      setDisable(true);
    } else dispatch(add(animal));
  };

  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  console.log(disable);

  const options = animalsSpecies.map((el: any) => (
    <option key={Math.random()} value={el}>{el}</option>
  ));

  return (
    <>
      <Row>
        <Col className="m-auto" xs={8}>
          <Form className="p-5" noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="text-start" controlId="formGroupName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={animal?.name || ''}
                required
                placeholder="Animal name"
                onChange={(e) => setAnimal({ ...animal, name: e.target.value })}
                className="mb-1"
              />
              <Form.Control.Feedback type="invalid">
                This field is required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="text-start" controlId="formGroupImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                value={animal?.image || ''}
                required
                placeholder="Animal image source"
                onChange={(e) => setAnimal({ ...animal, image: e.target.value })}
                className="mb-1"
              />
              <Form.Control.Feedback type="invalid">
                This field is required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="text-start" controlId="formGroupSelect">
              <Form.Label>Species</Form.Label>
              {addSpecies === 0
                ? (
                  <Button
                    className="m-2 d-inline-flex"
                    onClick={() => setAddSpecies(1)}
                  >
                    Add species
                  </Button>
                )
                : (
                  <Button
                    className="m-2 d-inline-flex"
                    onClick={() => setAddSpecies(0)}
                  >
                    Choose species
                  </Button>
                )}
              {addSpecies === 0
                ? (
                  <Form.Select
                    value={animal?.species}
                    required
                    onChange={(e) => setAnimal({ ...animal, species: e.target.value })}
                  >
                    {options && options.length === 0
                      ? <option hidden value="">not value</option>
                      : <option hidden value="">Choose specie</option>}
                    {options}
                  </Form.Select>
                )
                : (
                  <div className="d-flex">
                    <Form.Control
                      value={animal?.species || ''}
                      placeholder="Animal species"
                      onChange={(e) => setAnimal({ ...animal, species: e.target.value })}
                      className="mb-1"
                    />
                    <Button className="m-2" onClick={() => dispatch(push(animal.species))}>Add</Button>
                  </div>
                )}
            </Form.Group>
            <Button
              type="submit"
              className="m-2"
              onClick={() => { onHandleSubmit(); }}
            >
              Add animal
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default AnimalList;
