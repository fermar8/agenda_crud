import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Row, Col } from "reactstrap";

const ModificaContacto = (props) => {
  const id = props.id * 1; //convertimos a int!!!
  const contacto = props.contactos.find((el) => el.id === id);

  const [nombre, setNombre] = useState(contacto.nombre);
  const [email, setEmail] = useState(contacto.email);
  const [telefono, setTelefono] = useState(contacto.telefono);
  const [imagen, setImagen] = useState(contacto.imagen)
  const [volver, setVolver] = useState(false);

  //método activado al enviar el form (submit)
  function guardar(e) {
    e.preventDefault();
    //validación de datos!
    props.guardaContacto({
      id,
      nombre,
      email,
      telefono,
      imagen
    });
    setVolver(true);
  }

  function cancelar() {
    setVolver(true);
  }

  if (volver === true) {
    return <Redirect to="/lista" />;
  }

  return (
    <>
      <br />
      <h3>Modifica contacto</h3>
      <Form onSubmit={guardar}>
        <Row>
          <Col xs="6">
            <FormGroup>
              <Label for="nombreInput">Nombre</Label>
              <Input
                type="text"
                id="nombreInput"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="emailInput">E-mail</Label>
              <Input
                type="text"
                id="emailInput"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="telefonoInput">Teléfono</Label>
              <Input
                type="text"
                id="telefonoInput"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="telefonoInput">Link de la imagen</Label>
              <Input
                type="text"
                id="imagenInput"
                value={imagen}
                onChange={(e) => setImagen(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col>
            <Button type="submit" color="primary">
              Guardar
            </Button>{" "}
            <Button type="button" onClick={cancelar} color="danger">
              Cancelar
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default ModificaContacto;
