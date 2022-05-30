import { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { remove } from '../../store/reducers/animalsSlice';

const AnimalCard = () => {
  const animalsData = useSelector((state: RootState) => state.persistedReducer.animals.animalsData);
  const filterButtons = useSelector((state: RootState) => state.persistedReducer.animals.animalsSpecies);

  const [filtredAnimals, setFiltredAnimals] = useState([...animalsData]);

  const dispatch = useDispatch();

  return (
    <div>
      {
        animalsData.length === 0 ? <h1>Not animals added</h1>
          : (
            <div>
              <>
                <Button className="m-2" onClick={() => setFiltredAnimals([...animalsData])}>All</Button>
                {
                  filterButtons.map((el) => (
                    <Button
                      onClick={() => setFiltredAnimals([...animalsData].filter((specie) => specie.species === el))}
                      className="m-2"
                      key={Math.random()}
                    >
                      {el}
                    </Button>
                  ))
                }
              </>
              <div className="d-flex flex-wrap justify-content-center">
                {
              filtredAnimals.map((el, i) => (
                <Card className="m-3" style={{ width: '250px' }} key={Math.random()}>
                  <Card.Img variant="top" style={{ height: '150px' }} src={el?.image} />
                  <Card.Body>
                    <Card.Title>{el?.name}</Card.Title>
                    <Card.Text>{el?.species}</Card.Text>
                    <Button onClick={() => dispatch(remove(i))}>Delete</Button>
                  </Card.Body>
                </Card>
              ))
            }
              </div>
            </div>
          )
      }
    </div>
  );
};

export default AnimalCard;
