import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './styles/ganadores.css';

function Ganadores() {
    const [codigo, setCodigo] = useState("");
    const [premio, setPremio] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!codigo || !premio) {
            alert("Por favor, complete ambos campos para continuar.");
            return;
        }
        try {
            const response = await fetch("https://back-papa.vercel.app/v1/signos/premios", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ codigo, premio }),
            });
            const data = await response.json();
            if (data.resultado === "Premio registrado correctamente") {
                alert("Premio registrado con éxito");
                setCodigo("");
                setPremio("");
            } else {
                alert("Error al registrar el premio: " + data.resultado);
            }
        } catch (error) {
            console.error("Error registrando el premio:", error);
            alert("Hubo un problema al registrar el premio.");
        }
    };

    return (
        <div className="ganadores">
            <div className="card ganadores__card">
                <h1 className="ganadores__title">Registrar Premio</h1>
                <form onSubmit={handleSubmit} className="form form-premio">
                    <div className="form-group">
                        <label htmlFor="codigo" className="form-label">Código:</label>
                        <input
                            type="text"
                            id="codigo"
                            className="input form-input"
                            value={codigo}
                            onChange={(e) => setCodigo(e.target.value)}
                            placeholder="Código ganador"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="premio" className="form-label">Premio:</label>
                        <input
                            type="text"
                            id="premio"
                            className="input form-input"
                            value={premio}
                            onChange={(e) => setPremio(e.target.value)}
                            placeholder="Descripción del premio"
                        />
                    </div>
                    <button type="submit" className="btn btn-premio">Registrar Premio</button>
                </form>
            </div>
        </div>
    );
}

export default Ganadores;
