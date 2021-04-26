import React from "react";

import { Table } from "reactstrap";
import { Link } from "react-router-dom";

const Lista = (props) => {

  //para crear las filas hacemos un "map" de los contactos recibidos
  let filas = props.contactos
    .map((contacto) => {
      return (
        <tr key={contacto.id}>
          <td>{contacto.id}</td>
          <td>{contacto.nombre}</td>
          <td>{contacto.email}</td>
          <td>
            <Link className="btn btn-primary" to={"/modifica/" + contacto.id}>Editar</Link>
          </td>
          <td>
            <Link className="btn btn-danger" to={"/elimina/" + contacto.id}>Eliminar</Link>
          </td>
        </tr>
      );
    });

  return (
    <>
    <br />
    <h3>Contactos</h3>
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Email</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>{filas}</tbody>
    </Table>
    <br />
    <Link className="btn btn-success" to="/nuevo">Añadir contacto</Link>
    </>
  );
};

export default Lista;
