import axios from "axios";
import { useState, useEffect } from "react";
import { FormTareas } from "./FormTareas";

export function Lista() {
    const API = import.meta.env.VITE_URL_API;
    const [tareas, setTareas] = useState([]);
    const [busqueda, setBusqueda] = useState('')
    const [estados, setEstados] = useState([])


    const tareasFiltradas = tareas.filter(tarea => (
        busqueda.trim() === "" || tarea.titulo.toLowerCase().includes(busqueda.toLocaleLowerCase())
    ))

    const actualizarLista = () => {
        axios
            .get(`${API}/api/tareas`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`

                }
            })
            .then((res) => setTareas(res.data))
            .catch((err) => console.error(err));
    }


    const estadosTareas = () => {
        axios
            .get(`${API}/api/estados`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res) => setEstados(res.data))
            .catch((err) => console.error(err));
    }

    const obtenerValorEstado = (key) => {
        const estado = estados.find(e => e.key === key)
        return estado ? estado.value : key
    }

    const colorEstado = (key) => {
        switch (key) {
            case 'P': return 'badge-warning';
            case 'C': return 'badge-success';
        }
    }


    useEffect(() => {
        actualizarLista()
        estadosTareas()
    }, [])


    return (
        <>
            <div className="flex flex-col md:flex-row justify-center items-start gap-6 mt-10 px-4 max-w-7xl mx-auto">
                {/* Contenedor de tabla */}
                <div className="flex flex-col w-full md:w-3/5  border border-base-content/20 rounded-lg shadow-md overflow-x-auto p-4">
                    <input
                        value={busqueda}
                        onChange={e => setBusqueda(e.target.value)}
                        type="text"
                        placeholder="Buscar..."
                        className="input input-bordered w-full md:w-64 mb-4"
                    />

                    <table className="table-auto w-full min-w-[400px]">
                        <thead className="">
                            <tr>
                                <th className="py-2 px-4 text-left">ID</th>
                                <th className="py-2 px-4 text-left">Título</th>
                                <th className="py-2 px-4 text-left">Descripción</th>
                                <th className="py-2 px-4 text-left">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tareasFiltradas.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-6 text-gray-500">
                                        No hay datos
                                    </td>
                                </tr>
                            ) : (
                                tareasFiltradas.map((item, index) => (
                                    <tr key={index} className=" last:border-none ">
                                        <td className="py-2 px-4">{item.id}</td>
                                        <td className="py-2 px-4">{item.titulo}</td>
                                        <td className="py-2 px-4">{item.descripcion}</td>
                                        <td className="py-2 px-4">
                                            <span className={`badge ${colorEstado(item.estado)}`}>
                                                {obtenerValorEstado(item.estado)}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Contenedor del formulario */}
                <div className=" flex justify-center w-full md:w-2/5 bg-base-100 ">
                    <FormTareas onActualizarLista={actualizarLista} />
                </div>
            </div>
        </>
    );
}
