/* eslint-disable react/jsx-key */
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Consulta.css';

export default function Consulta() {
  //Estado
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  //Consumo de API
  const url = 'https://fakestoreapi.com/products';
  const getData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setUsers(data);
  };
  useEffect(() => {
    getData();
  }, []);

  //Búsqueda de datos
  const handleSearch = (e) => {
    setSearch(e.target.value);
    // console.log(e.target.value);
  };
  //Filtrado de datos
  let results = [];
  if (!search) {
    results = users;
  } else {
    results = users.filter((user) =>
      user.category.toLowerCase().includes(search.toLowerCase())
    );
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="search Category"
          className="form-control"
          value={search}
          onChange={handleSearch}
        />
      </div>
      <div id="main">
        {results.map((user) => (
          <Card style={{ width: '15rem' }}>
            <Card.Img variant="top" src={user.image} width="50%" />
            <Card.Body>
              <Card.Title>{user.title}</Card.Title>
              <Card.Text>{user.category}</Card.Text>
              <Button variant="primary">{user.price}</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}
