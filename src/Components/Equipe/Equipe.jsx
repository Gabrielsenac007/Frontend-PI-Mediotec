import { FaUser } from 'react-icons/fa'; 
import './Equipe.css'

const Equipe = () => {
    return (
        <div>
            <div className="equipe-container">
                <h1>Professores</h1>
                <button className="add-button">+ Adicionar</button>
                <div className="container-profs">
                    <label className="professor-label">Nome Professor</label>
                    <label className="professor-label">Nome Professor</label>
                    <label className="professor-label">Nome Professor</label>
                    <label className="professor-label">Nome Professor</label>
                </div>
            </div>
            <div className="container-profCard">
            <div className="logo-equipe">
                <FaUser className="login-icon" />
            </div>
                <h3>Nome</h3>
                <h3>Matéria</h3>

            </div>
        </div>
    );
};

export default Equipe;
