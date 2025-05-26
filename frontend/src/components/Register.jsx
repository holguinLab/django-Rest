import { useState } from "react";
import axios from "axios";

export function Register() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errores, setErrores] = useState({})

    const handleForm = (e) => {
        e.preventDefault();
        axios
            .post("http://127.0.0.1:8000/api/register/", { email, password })
            .then(res => {
                /* Si todo sale bien  */
                localStorage.setItem('accessToken', res.data.access);
                localStorage.setItem('refreshToken', res.data.refresh);
                alert(res.data.mensaje)
                setEmail('')
                setPassword('')
                setErrores({})
            })
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    setErrores(error.response.data)
                }
            })
    }
    return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
                <div className="card w-full max-w-md shadow-xl bg-white rounded-lg">
                    <div className="card-body">
                        <h2 className="card-title text-3xl font-bold mb-6 text-center text-gray-700">
                            Registrarse
                        </h2>
                        <form onSubmit={handleForm}>
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Correo Electrónico</span>
                                </label>
                                <input
                                    id="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    type="email"
                                    placeholder="tu@email.com"
                                    className="input input-bordered w-full"
                                    
                                    name="email"
                                />
                                {errores.email &&
                                <p className="label text-error">{errores.email[0]} </p>
                            }
                            </div>

                            <div className="form-control mb-6">
                                <label className="label">
                                    <span className="label-text">Contraseña</span>
                                </label>
                                <input
                                    id="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    type="password"
                                    placeholder="********"
                                    className="input input-bordered w-full"
                                    name="password"
                                />
                                {errores.password &&
                                <p className="label text-error">{errores.password[0]} </p>
                            }
                            </div>


                            <button type="submit" className="btn btn-primary w-full">
                                Entrar
                            </button>
                        </form>
                        <p className="text-center text-sm text-gray-500 mt-4">
                            ¿No tienes cuenta?{" "}
                            <a href="/register" className="text-primary font-semibold hover:underline">
                                Inicia sesion aquí
                            </a>
                        </p>
                    </div>
                </div>
            </div>
    )
}