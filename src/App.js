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



// clase App 
const App = () => {

  const [contactos, setContactos] = useState(loadData());


// //extra guardado de datos
function saveData(contactosAGuardar){
  var jsonData = JSON.stringify(contactosAGuardar);
  localStorage.setItem("datagenda", jsonData);
}

// //carga de datos
function loadData(){
    var text = localStorage.getItem("datagenda");
    if (text) {
    var obj = JSON.parse(text);
    return obj;
}
return [];
}


function guardaContacto(contacto) {
  //eliminamos version actual del contacto
  let nuevaLista = contactos.filter(el => el.id !== contacto.id);
  // añadimos la nueva version
  nuevaLista.push(contacto);
  //asignamos a contactos
  setContactos(nuevaLista);
  saveData(nuevaLista);
}

function nuevoContacto(contacto) {
  // s miramos el id del ultimo contacto y sumamos 1 
  const maxId = contactos.sort(function(a, b) {
    return b.id - a.id;
  });
  contacto.id = contactos.length < 1 ? 1 : maxId[0].id + 1 ;

  const nuevaLista = [...contactos, contacto];

  const sortedNova = nuevaLista.sort(function(a, b) {
      return a.id - b.id
  });
  
  //asignamos a contactos
  setContactos(sortedNova);
  saveData(nuevaLista)
}


function eliminaContacto(idEliminar) {
  //creamos lista a partir de contactos, sin el contacto con el id recibido
  const nuevaLista = contactos.filter(el => el.id !== idEliminar);
  const sortedNueva = nuevaLista.sort(function(a, b) {
      return a.id - b.id
  })
  sortedNueva.forEach((el, i ) => {
      return el.id = i + 1;
  })
  //asignamos a contactos
  setContactos(nuevaLista);
  saveData(nuevaLista)

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
  
  {/*
        <Row>
          <Col>
            <Button className="btn-primary" onClick={loadData}>Cargar datos</Button>
            <Button className="btn-success" onClick={saveData}>Guardar datos</Button>
          </Col>
        </Row>    */}

      </Container>
    </BrowserRouter>
  );

}

export default App;