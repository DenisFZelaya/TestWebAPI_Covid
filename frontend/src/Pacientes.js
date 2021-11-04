import { IsConstructor } from "es-abstract";
import React, { Component } from "react";
import { variables } from './Variables';

export class Pacientes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pacientes: [],
            modalTitle: "",
            pacienteId: 0,
            expediente: "",
            nombres: "",
            apellidos: "",
            sexo: "",
            fechaNacimiento: "",
            edad: 0,
            tipoEdad: "",

            PacienteIdFilter: "",
            PacienteNombreFilter: "",
            pacientesWithoutFilter: []
        }
    }

    FilterFn() {
        var PacienteIdFilter = this.state.PacienteIdFilter;
        var PacienteNombreFilter = this.state.PacienteNombreFilter;

        var filteredData = this.state.pacientesWithoutFilter.filter(
            function (el) {
                return el.pacienteId.toString().toLowerCase().includes(
                    PacienteIdFilter.toString().trim().toLowerCase()
                ) &&
                    el.nombres.toString().toLowerCase().includes(
                        PacienteNombreFilter.toString().trim().toLowerCase()
                    )
            }
        );

        this.setState({ pacientes: filteredData });
    }

    sortResult(prop, asc) {
        var sortedData = this.state.pacientesWithoutFilter.sort(function (a, b) {
            if (asc) {
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            } else {
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            }
        })

        this.setState({ pacientes: sortedData });
    }

    changePacienteIdFilter = (e) => {
        this.state.PacienteIdFilter = e.target.value;
        this.FilterFn();
    }

    changePacienteNombreFilter = (e) => {
        this.state.PacienteNombreFilter = e.target.value;
        this.FilterFn();
    }



    refreshList() {
        fetch(variables.API_URL + 'Pacientes')
            .then(Response => Response.json())
            .then(data => {
                this.setState({ pacientes: data, pacientesWithoutFilter: data });
            })
    }

    componentDidMount() {
        this.refreshList();
    }


    changeIdPaciente = (e) => {
        this.setState({ pacienteId: e.target.value });
    }

    changeNombre = (e) => {
        this.setState({ nombres: e.target.value });
    }

    changeApellido = (e) => {
        this.setState({ apellidos: e.target.value });
    }

    changeExpediente = (e) => {
        this.setState({ expediente: e.target.value });
    }

    changeSexo = (e) => {
        this.setState({ sexo: e.target.value });
    }

    changeFechaNac = (e) => {
        this.setState({ fechaNacimiento: e.target.value });
    }

    changeEdad = (e) => {
        this.setState({ edad: e.target.value });
    }
    changeTipoEdad = (e) => {
        this.setState({ tipoEdad: e.target.value });
    }

    addClick() {
        this.setState({
            modalTitle: "Agregar Paciente",
            pacienteId: 0,
            expediente: "",
            nombres: "",
            apellidos: "",
            sexo: "",
            fechaNacimiento: "",
            edad: 0,
            tipoEdad: "",
        });
    }

    editClick(dep) {
        this.setState({
            modalTitle: "Editar Paciente",
            pacienteId: dep.pacienteId,
            nombres: dep.nombres,
            expediente: dep.expediente,
            apellidos: dep.apellidos,
            sexo: dep.sexo,
            fechaNacimiento: dep.fechaNacimiento,
            edad:  dep.edad,
            tipoEdad: dep.tipoEdad,
        });
    }

    createClick() {
        fetch(variables.API_URL + "Pacientes", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(    {
                "pacienteId": 0,
                "expediente": this.state.expediente,
                "nombres": this.state.nombres,
                "apellidos": this.state.apellidos,
                "sexo": this.state.sexo,
                "fechaNacimiento": this.state.fechaNacimiento,
                "edad": parseInt(this.state.edad),
                "tipoEdad": this.state.tipoEdad,
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result.toString());
                this.refreshList();
            }, (error) => {
                this.refreshList();
                alert('Failed');
            })
    }

    updateClick(id) {
        fetch(variables.API_URL + "Pacientes/" + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pacienteId: this.state.pacienteId,
                nombres: this.state.nombres,
                expediente: this.state.expediente,
                apellidos: this.state.apellidos,
                sexo: this.state.sexo,
                fechaNacimiento: this.state.fechaNacimiento,
                edad: this.state.edad,
                tipoEdad: this.state.tipoEdad
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                this.refreshList();
                alert('Failed');
            })
    }

    deleteClick(id) {
        if (window.confirm('Esta seguro de eliminar el registro?')) {
            fetch(variables.API_URL + "Pacientes/" + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
                .then(res => res.json())
                .then((result) => {
                    alert(result);
                    this.refreshList();
                }, (error) => {
                    alert('Failed');
                })
        }
    }

    render() {
        const {
            pacientes,
            modalTitle,
            pacienteId,
            expediente,
            nombres,
            apellidos,
            sexo,
            fechaNacimiento,
            edad,
            tipoEdad,
        } = this.state;

        return (
            <div>
                <button type="button" className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    Registrar Nuevo Paciente
                </button>
                <div className="d-flex flex-row">
                    <input className="form-control m-2" onChange={this.changePacienteIdFilter} placeholder="Filter por Id" />
                    <button type="button" className="btn btn-light" onClick={() => this.sortResult('pacienteId', true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-bar-down" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z" />
                        </svg>
                    </button>
                    <button type="button" className="btn btn-light" onClick={() => this.sortResult('pacienteId', false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-bar-up" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z" />
                        </svg>
                    </button>
                </div>

                <div className="d-flex flex-row">
                    <input className="form-control m-2" onChange={this.changePacienteNombreFilter} placeholder="Filter por Nombre" />
                    <button type="button" className="btn btn-light" onClick={() => this.sortResult('nombres', true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-bar-down" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z" />
                        </svg>
                    </button>

                    <button type="button" className="btn btn-light" onClick={() => this.sortResult('nombres', false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-bar-up" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z" />
                        </svg>
                    </button>
                </div>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Id Paciente</th>
                            <th>Expediente</th>
                            <th>Nombres</th>
                            <th>Apellidos</th>
                            <th>Sexo</th>
                            <th>Fecha Nacimiento</th>
                            <th>Edad</th>
                            <th>Tipo Edad</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pacientes.map(dep =>
                            <tr key={dep.pacienteId}>
                                <td> {dep.pacienteId} </td>
                                <td> {dep.expediente} </td>
                                <td> {dep.nombres} </td>
                                <td> {dep.apellidos} </td>
                                <td> {dep.sexo} </td>
                                <td> {dep.fechaNacimiento} </td>
                                <td> {dep.edad} </td>
                                <td> {dep.tipoEdad} </td>
                                <td>
                                    <button type="button" className="btn btn-light mr-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(dep)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
                                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z" />
                                        </svg>
                                    </button>
                                    <button type="button" className="btn btn-light mr-1"
                                        onClick={() => this.deleteClick(dep.pacienteId)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title"> {modalTitle} </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">

                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <div className="p-2 w-50 bd-highlight">

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Expediente</span>
                                            <input type="text" className="form-control"
                                                value={expediente}
                                                onChange={this.changeExpediente}
                                            />
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Nombres</span>
                                            <input type="text" className="form-control"
                                                value={nombres}
                                                onChange={this.changeNombre}
                                            />
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Apellido</span>
                                            <input type="text" className="form-control"
                                                value={apellidos}
                                                onChange={this.changeApellido}
                                            />
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Sexo</span>
                                            <input type="text" className="form-control"
                                                value={sexo}
                                                onChange={this.changeSexo}
                                            />
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Fecha Nacimiento</span>
                                            <input type="date" className="form-control"
                                                value={fechaNacimiento}
                                                onChange={this.changeFechaNac}
                                            />
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Edad</span>
                                            <input type="text" className="form-control"
                                                value={edad}
                                                onChange={this.changeEdad}
                                            />
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Tipo Edad</span>
                                            <input type="text" className="form-control"
                                                value={tipoEdad}
                                                onChange={this.changeTipoEdad}
                                            />
                                        </div>
                                    </div>

                                </div>



                                {pacienteId == 0 ?
                                    <button type="button" className="btn btn-primary float-start"
                                        onClick={() => this.createClick()}>
                                        Crear
                                    </button>
                                    : null
                                }

                                {pacienteId != 0 ?
                                    <button type="button" className="btn btn-primary float-start"
                                        onClick={() => this.updateClick(pacienteId)}>
                                        Actualizar
                                    </button>
                                    : null
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}