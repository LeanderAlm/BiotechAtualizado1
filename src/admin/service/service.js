const webService = 'http://localhost:3000/';

export const pacienteService = {
  cadastroPaciente,
  verificarCPFExistente,
  carregarPacientes,
  idCarregarPaciente,
  atualizarExame,
  atualizarPaciente,
  enviarNovoExame,
  atualizarExameExistente,
  atualizarDadosExame,
  adicionaDadoExame,
  deletarPaciente,
  deletarExame,
  carregarExames,
};

async function cadastroPaciente(paciente) {
  try {
    const responsePaciente = await fetch(`${webService}pacientes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paciente),
    });

    if (responsePaciente.ok) {
      const pacienteObj = await responsePaciente.json();
      const pacienteId = pacienteObj.id; // Obter o ID do paciente cadastrado

      const novoExame = {
        id: pacienteId, // Usar o mesmo ID do paciente como ID do exame
        pacienteId, // Usar o ID do paciente como referência
        // Adicionar outras propriedades do exame, se necessário
      };

      const responseExame = await fetch(`${webService}exames`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoExame),
      });

      if (responseExame.ok) {
        const exameObj = await responseExame.json();
        console.log('Exame cadastrado com sucesso:', exameObj);
        return pacienteObj;
      } else {
        throw new Error('Erro ao cadastrar exame');
      }
    } else {
      throw new Error('Erro ao cadastrar paciente');
    }
  } catch (error) {
    console.error('Erro ao cadastrar paciente:', error);
    throw error;
  }
}


async function verificarCPFExistente(cpf) {
  try {
    const response = await fetch(`${webService}pacientes?cpf=${cpf}`);
    const data = await response.json();
    return data.length > 0;
  } catch (error) {
    console.error('Erro ao verificar CPF existente:', error);
    throw error;
  }
}

function carregarPacientes() {
  return fetch(`${webService}pacientes`)
    .then(resposta => {
      return resposta.json();
    });
}

function idCarregarPaciente(id) {
  return fetch(`${webService}pacientes/${id}`)
    .then(resposta => {
      return resposta.json();
    });
}

async function atualizarExame(pacienteId, exame, data) {
  try {
    const response = await fetch(`${webService}pacientes/${pacienteId}`);
    if (response.ok) {
      const paciente = await response.json();

      // Verifica se o paciente já possui um exame com o mesmo nome
      const exameExistente = paciente.Exame && paciente.Exame.find(item => item.exame === exame);

      if (exameExistente) {
        console.Alert('Já existe um exame com o mesmo nome para esse paciente');
      } else {
        // Adiciona o novo exame à lista de exames do paciente
        const novoExame = { exame, data, status: 'ativo' };

        if (!paciente.Exame) {
          // Se o paciente não possui exame, cria uma nova lista com o novo exame
          paciente.Exame = [novoExame];
        } else {
          // Adiciona o novo exame à lista existente de exames do paciente
          paciente.Exame.push(novoExame);
        }

        // Faz a requisição PATCH para atualizar o paciente com o novo exame
        const atualizacaoResponse = await fetch(`${webService}pacientes/${pacienteId}`, {
          method: 'PATCH',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(paciente),
        });

        if (atualizacaoResponse.ok) {
          console.log('Exame atualizado com sucesso');
        } else {
          throw new Error('Erro ao atualizar o exame');
        }
      }
    } else {
      throw new Error('Erro ao carregar os dados do paciente');
    }
  } catch (error) {
    console.log('Erro ao atualizar o exame', error);
  }
}

async function atualizarPaciente(id, paciente) {
  // Obter os dados dos exames do paciente existente
  const pacienteExistente = await idCarregarPaciente(id);
  paciente.Exame = pacienteExistente.Exame;

  const response = await fetch(`${webService}pacientes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(paciente),
  });

  if (!response.ok) {
    throw new Error('Erro ao atualizar paciente: ' + response.statusText);
  }
}

async function enviarNovoExame(id, novoExame) {
  try {
    const response = await fetch(`${webService}pacientes/${id}/exames`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(novoExame),
    });
    return response.json();
  } catch (error) {
    throw new Error('Erro ao enviar o novo exame');
  }
}

async function atualizarExameExistente(id, exameExistente, novoExame) {
  try {
    const response = await fetch(`${webService}pacientes/${id}/exames/${exameExistente.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(novoExame),
    });
    return response.json();
  } catch (error) {
    throw new Error('Erro ao atualizar o exame existente');
  }
}

async function atualizarDadosExame(pacienteId, exame, novoExame) {
  try {
    const response = await fetch(`${webService}pacientes/${pacienteId}`);
    if (response.ok) {
      const paciente = await response.json();

      // Verifica se o paciente já possui um exame com o mesmo nome
      const exameExistente = paciente.Exame && paciente.Exame.find(item => item.exame === exame);

      if (exameExistente) {
        console.log('Já existe um exame com o mesmo nome para esse paciente');
      } else {
        // Adiciona o novo exame à lista de exames do paciente
        if (!paciente.Exame) {
          // Se o paciente não possui exame, cria uma nova lista com o novo exame
          paciente.Exame = [novoExame];
        } else {
          // Adiciona o novo exame à lista existente de exames do paciente
          paciente.Exame.push(novoExame);
        }

        // Faz a requisição PATCH para atualizar o paciente com o novo exame
        const atualizacaoResponse = await fetch(`${webService}pacientes/${pacienteId}`, {
          method: 'PATCH',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(paciente),
        });

        if (atualizacaoResponse.ok) {
          console.log('Exame atualizado com sucesso');
        } else {
          throw new Error('Erro ao atualizar o exame');
        }
      }
    } else {
      throw new Error('Erro ao carregar os dados do paciente');
    }
  } catch (error) {
    console.log('Erro ao atualizar o exame', error);
  }
}

async function adicionaDadoExame(id, novoExame) {
  try {
    const url = `${webService}exames/${id}`;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(novoExame),
    });

    if (!response.ok) {
      throw new Error('Erro ao adicionar dado do exame');
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Erro ao adicionar dado do exame:', error);
    throw error;
  }
}

async function deletarPaciente(id) {
  try {
    const response = await fetch(`${webService}pacientes/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  } catch (error) {
    console.error('Erro ao deletar paciente:', error);
    throw error;
  }
}

async function deletarExame(pacienteId, exameId) {
  try {
    const response = await fetch(`${webService}pacientes/${pacienteId}/exames/${exameId}`, {
      method: 'DELETE',
    });
    return response.json();
  } catch (error) {
    console.error('Erro ao deletar exame:', error);
    throw error;
  }
}

function carregarExames(id) {
  return fetch(`${webService}exames/${id}`)
    .then(resposta => {
      return resposta.json();
    });
}
