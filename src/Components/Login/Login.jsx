import { FaEnvelope, FaLock } from 'react-icons/fa'
import { useState } from 'react'
import "./Login.css"
import { Link } from 'react-router-dom';

//required


const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        alert('Enviando os dados: ' + username + " - " + password)
    }

    return (

        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>Acesse o Sistema</h1>
                <div className='input-field'>
                    <input type="email" placeholder='E-mail'
                        onChange={(e) => setUsername(e.target.value)}required/>
                    <FaEnvelope className='icon' />
                </div>
                <div className='input-field'>
                    <input type="password" placeholder='Senha'
                        onChange={(e) => setPassword(e.target.value)} required/>
                    <FaLock className='icon'  />
                </div>

                <div className="recall-forget">
                    <label>
                        <input type="checkbox" />
                        Lembre de mim
                    </label>
                    <a href="#">Esqueceu a senha?</a>
                </div>

                <button>Entrar</button>

                <div className="signup-link">
                    <p>Não tem uma conta? <Link to="/cadastro">Cadastrar</Link></p>
                </div>

            </form>
        </div>
    )
}

export default Login
