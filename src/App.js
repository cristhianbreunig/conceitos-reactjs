import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(({ data }) => {
      setRepositories(data);
    });
  }, []);

  async function handleAddRepository() {

    const newRepository = {
      title: `Novo Repositório ${Date.now()}`,
      url: "http://github.com/cristhianbreunig/",
      techs: ["Node.js", "ReactJS", "ReactNative"]
    };

    const { data } = await api.post('repositories', newRepository);

    setRepositories([...repositories, data]);
    
  }

  async function handleRemoveRepository(id) {

    try {
      await api.delete(`repositories/${id}`);

      setRepositories(repositories.filter(repository => repository.id !== id));

    } catch (err) {
      alert('Erro ao deletar repositório, tente novamente.');
    }

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id}>
            <a href={repository.url} target="_blank" rel="noopener noreferrer">
              {repository.title}
            </a>

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
