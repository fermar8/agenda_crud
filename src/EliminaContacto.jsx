import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import { Button } from "reactstrap";

const EliminaContacto = (props) => {
  const id = props.id * 1; //convertimos a int!!!
  const contacto = props.contactos.find((el) => el.id === id);
  const [volver, setVolver] = useState(false);

  function eliminar() {
    props.eliminaContacto(id);
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
      <h3>Desea eliminar a {contacto.nombre}?</h3>
      <br />
      <Button onClick={eliminar} color="danger">
        Sí
      </Button>{" "}
      <Button onClick={cancelar} color="success">
        No
      </Button>
    </>
  );
};

export default EliminaContacto;
