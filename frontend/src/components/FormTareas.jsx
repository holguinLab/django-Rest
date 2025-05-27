import axios from 'axios'
import { useState ,useEffect} from 'react'


export function FormTareas({ onActualizarLista }) {
    const API = import.meta.env.VITE_URL_API;
    const [titulo, setTitulo] = useState("")
    const [descripcion, setDescripcion] = useState('')
    const [errores, setErrores] = useState({})

    const [estados, setEstados] = useState([])
    const [estado, setEstadoSeleccionado] = useState('')

    


    const handleForm = (e) => {
        e.preventDefault();
        axios.post(`${API}/api/nueva_tarea/`, { titulo, descripcion ,estado},{headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }})
            .then(res => {
                alert(res.data.mensaje) /* return Response({"mensaje" : 'Tarea Creada Con Exito ', "data" : serializer.data},status=status.HTTP_201_CREATED) */
                setErrores({}) /* Se limpia el objeto de errores por si habian errores antes de guardar con exito , para no mostrar los errores*/
                setDescripcion('')
                setTitulo('')
                onActualizarLista()
                console.log({ titulo, descripcion, estado });


            })
            .catch(error => {
                if (error.response && error.response.status == 400) {
                    setErrores(error.response.data)
                    console.log({ titulo, descripcion, estado });
                }
            })
    }

    const estadosTareas = () => {
    axios
        .get(`${API}/api/estados`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((res) => setEstados(res.data))
        .catch((err) => console.error(err));
}
    useEffect(() => {
        estadosTareas()
    }, [])


    return (
        <>

            <fieldset className="fieldset  gap-5 bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Añadir Nueva Tarea</legend>
                <form onSubmit={handleForm} className='flex flex-col gap-3' >


                    <input
                        value={titulo}
                        onChange={e => setTitulo(e.target.value)} /* Lo actualiza sin recargar la pagina */
                        type="text"
                        className="input"
                        placeholder="Titulo Tarea"
                    />


                    {errores.titulo &&
                        <p className="label text-error">{errores.titulo[0]} </p>
                    }



                    <input
                        value={descripcion}
                        onChange={e => setDescripcion(e.target.value)}
                        type="text"
                        className="input"
                        placeholder="Descripcion Corta"
                    />



                    {errores.descripcion &&
                        <p
                            className="label text-error">{errores.descripcion[0]} </p>
                    }

                    <select value={estado} onChange={e => setEstadoSeleccionado(e.target.value)}  required className="select">
                        <option value="" disabled hidden>Selecciona un estado</option>
                        {estados.map((item,index)=> (
                            <option key={index} value={item.key}>  {item.value} </option>
                            
                        ))}
                    </select>

                    {errores.estado &&
                        <p
                            className="label text-error">{errores.estado[0]} </p>
                    }


                    <button
                        type='submit'
                        className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">
                        Guardar
                    </button>

                </form>
            </fieldset>

        </>
    )
}