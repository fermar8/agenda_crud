import React, { useState } from "react";

import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';

// importamos los componentes de la aplicación (vistas)
import Inicio from './Inicio';
import Lista from './Lista';
import NuevoContacto from './NuevoContacto';
import ModificaContacto from './ModificaContacto';
import EliminaContacto from './EliminaContacto';
import P404 from './P404';

// importamos css
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';



const contactosInicio = [
  {
    id: 1,
    nombre: "indiana",
    email: "indiana@jones.com"
  },
  {
    id: 2,
    nombre: "007",
    email: "bond@james.bond"
  },
  {
    id: 3,
    nombre: "spiderman",
    email: "peter@parker.com"
  }
];


// clase App 
const App = () => {

  const [contactos, setContactos] = useState(contactosInicio);


// //extra guardado de datos
// saveData(){
//   var jsonData = JSON.stringify(state);
//   localStorage.setItem("datagenda", jsonData);
// }

// //carga de datos
// loadData(){
//   var text = localStorage.getItem("datagenda");
//   if (text) {
//     var obj = JSON.parse(text);
//     setState(obj);
//   }
// }


function guardaContacto(contacto) {
  //eliminamos version actual del contacto
  let nuevaLista = contactos.filter(el => el.id !== contacto.id);
  // añadimos la nueva version
  nuevaLista.push(contacto);
  //asignamos a contactos
  setContactos(nuevaLista);
}

function nuevoContacto(contacto) {
  // s miramos el id del ultimo contacto y sumamos 1 
  contacto.id = contactos[contactos.length-1].id + 1 ;
  const nuevaLista = [...contactos, contacto];
  //asignamos a contactos
  setContactos(nuevaLista);
}


function eliminaContacto(idEliminar) {
  //creamos lista a partir de contactos, sin el contacto con el id recibido
  const nuevaLista = contactos.filter(el => el.id !== idEliminar);
  //asignamos a contactos
  setContactos(nuevaLista);

}



  return (
    <BrowserRouter>
      <Container>
        <Row>
          <Col>
            <ul className="list-unstyled menu">
              <li> <Link className="link" to="/">Inicio</Link> </li>
              <li> <Link className="link" to="/lista">Contactos</Link> </li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col>
            <Switch>
              <Route exact path="/" component={Inicio} />
              <Route path="/lista" render={() => <Lista contactos={contactos} />} />
              <Route path="/nuevo" render={() => <NuevoContacto nuevoContacto={nuevoContacto} />} />
              <Route path="/modifica/:id" render={(props) => <ModificaContacto id={props.match.params.id} contactos={contactos} guardaContacto={guardaContacto} />} />
              <Route path="/elimina/:id" render={(props) => <EliminaContacto id={props.match.params.id} contactos={contactos} eliminaContacto={eliminaContacto} />} />
              <Route component={P404} />
            </Switch>
          </Col>
        </Row>

        {/* <Row>
          <Button onClick={loadData}>Cargar datos</Button>
          <Button onClick={saveData}>Guardar datos</Button>
        </Row> */}

      </Container>
    </BrowserRouter>
  );

}

export default App;