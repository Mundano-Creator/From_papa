import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './styles/crearusers.css';

function Crearusuarios() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [cedula, setCedula] = useState("");
    const [email, setEmail] = useState("");
    const [cellphone, setCellphone] = useState("");
    const [city, setCity] = useState("");
    const goTo = useNavigate();

    const crearuser = (event) => {
        event.preventDefault();
        if (!username || !password || !birthdate || !cedula || !email || !cellphone || !city) {
            alert("Por favor, complete todos los campos.");
            return;
        }
        fetch(`https://back-papa.vercel.app/v1/signos/crear`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password, birthdate, cedula, email, cellphone, city })
        })
        .then(res => res.json())
        .then(responseData => {
            if (responseData.resultado === 'Usuario creado correctamente') {
                alert("Usuario creado correctamente");
                goTo("/Form");
            } else {
                alert("Error al crear usuario");
            }
        })
        .catch(error => {
            console.error("Error en la creación de usuario:", error);
            alert("Hubo un error en la solicitud. Inténtalo de nuevo.");
        });
    };

    return (
        <form onSubmit={crearuser} className="register-form">
            <h1 id="txtBienvenida" className="register-form__title">Regístrate</h1>
            <label className="form-label">Nombre de Usuario</label>
            <input type="text" className="input" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usuario" />
            <label className="form-label">Contraseña</label>
            <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
            <label className="form-label">Fecha de Nacimiento</label>
            <input type="date" className="input" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
            <label className="form-label">Cédula</label>
            <input type="text" className="input" value={cedula} onChange={(e) => setCedula(e.target.value)} placeholder="Cédula" />
            <label className="form-label">Correo Electrónico</label>
            <input type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo" />
            <label className="form-label">Número de Celular</label>
            <input type="tel" className="input" value={cellphone} onChange={(e) => setCellphone(e.target.value)} placeholder="Celular" />
            <label className="form-label">Ciudad</label>
            <input type="text" className="input" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Ciudad" />
            <input type="submit" value="Crear" className="btn" />
        </form>
    );
}

export default Crearusuarios;
