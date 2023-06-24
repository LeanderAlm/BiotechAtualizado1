import { pacienteService } from "../service/service.js";

function criarPacientePreview(paciente) {
  const pacienteDiv = criarElemento('div', 'paciente-preview', '');

  const nomeCpfDiv = criarElemento('div', 'nome-cpf', '');
  nomeCpfDiv.innerHTML = `<strong>${capitalizeFirstLetter(paciente.nome)} ${capitalizeFirstLetter(paciente.sobrenome)}</strong> - CPF: ${paciente.cpf} - Data de Nascimento: ${paciente.dataNascimento}<br>Exames registrados: `;

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  pacienteDiv.appendChild(nomeCpfDiv);

  // Listar os exames para o preview
  const exames = paciente.Exame;
  let nomesExames = '';
  if (Array.isArray(exames)) {
    exames.forEach(exame => {
      nomesExames += exame.exame + ', ';
    });
    nomesExames = nomesExames.slice(0, -2);
  }

  nomeCpfDiv.innerHTML += nomesExames;

  // Botões
  const deleteBtn = criarElemento('button', 'btn-detalhes', 'Excluir');
deleteBtn.addEventListener('click', () => {
  deletarPaciente(paciente.id);
});

pacienteDiv.appendChild(deleteBtn);

  const editarPacienteBtn = criarElemento('button', 'btn-detalhes', 'Editar Paciente');
  editarPacienteBtn.addEventListener('click', () => exibirEdicaoPaciente(paciente.id));
  pacienteDiv.appendChild(editarPacienteBtn);

  const detalhesBtn = criarElemento('button', 'btn-detalhes', 'Documentos');
  detalhesBtn.addEventListener('click', () => exibirDetalhesPaciente(paciente.id));
  pacienteDiv.appendChild(detalhesBtn);

  const cadastrarExamesBtn = criarElemento('button', 'btn-detalhes', 'Cadastrar Pedido de Exame');
  cadastrarExamesBtn.addEventListener('click', () => exibirCadastroPedidoExames(paciente.id));
  pacienteDiv.appendChild(cadastrarExamesBtn);

  return pacienteDiv;
}
function deletarPaciente(pacienteId) {
  // Exibir uma mensagem de confirmação ao usuário
  if (!confirm('Tem certeza de que deseja excluir este paciente?')) {
    return; // Abortar a exclusão caso o usuário cancele
  }

  pacienteService.deletarPaciente(pacienteId)
    .then(() => {
      console.log('Paciente excluído com sucesso.');
      // Atualizar a página ou realizar outras ações necessárias após a exclusão
    })
    .catch(error => {
      console.error('Erro ao excluir o paciente:', error);
    });
}

function exibirEdicaoPaciente(pacienteId) {
  // Redirecionar para a página de edição do paciente junto com o ID do paciente
  window.location.href = `/src/admin/screens/editar-paciente/index.html?id=${pacienteId}`;
}

function exibirCadastroPedidoExames(pacienteId) {
  // Redirecionar para a página de cadastro de pedido de exames junto com o ID do paciente
  window.location.href = `/src/admin/screens/cadastro-pedido-exame/index.html?id=${pacienteId}`;
}

function exibirDetalhesPaciente(pacienteId) {
  window.location.href = `./documento.html?id=${pacienteId}`;
}

function criarElemento(tag, classes, conteudo) {
  const elemento = document.createElement(tag);
  elemento.className = classes;
  elemento.innerHTML = conteudo;
  return elemento;
}

document.addEventListener('DOMContentLoaded', function() {
  const pacientesContainer = document.getElementById('pacientes-container');

  pacienteService.carregarPacientes()
    .then(pacientes => {
      // Ordenar os pacientes por nome em ordem alfabética
      pacientes.sort((a, b) => (a.nome && b.nome) ? a.nome.localeCompare(b.nome) : 0);

      // Limitar o número de pacientes exibidos no preview
      const numPacientesPreview = 50;
      const pacientesPreview = pacientes.slice(0, numPacientesPreview);

      // Gerar o preview dos pacientes
      if (pacientesContainer) {
        pacientesPreview.forEach(paciente => {
          const pacientePreviewDiv = criarPacientePreview(paciente);
          pacientesContainer.appendChild(pacientePreviewDiv);
        });
      } else {
        console.log('O elemento pacientes-container não foi encontrado.');
      }
      
      // Renderizar os pacientes para o recurso de pesquisa
      renderPatients(pacientes);
    })
    .catch(error => {
      console.log('Erro ao carregar os dados: ', error);
    });
});

// Search
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.querySelector('.cabecalho__pesquisar input[name="pesquisa"]');
  const pacientesContainer = document.getElementById('pacientes-container');

  searchInput.addEventListener('input', function() {
    const searchTerm = searchInput.value.toLowerCase();

    if (searchTerm.trim() === '') {
      pacientesContainer.innerHTML = '';
      return;
    }

    // Carregar os pacientes usando o service
    pacienteService.carregarPacientes()
      .then(function(pacientes) {
        const filteredPatients = pacientes.filter(function(paciente) {
          // Verificar se o termo de pesquisa corresponde ao nome ou ao CPF do paciente
          const nomeMatches = paciente.nome.toLowerCase().includes(searchTerm);
          const cpfMatches = paciente.cpf && paciente.cpf.replace(/\D/g, '').includes(searchTerm);

          // Verificar se o termo de pesquisa corresponde ao nome de algum exame do paciente
          const exameMatches = paciente.Exame && paciente.Exame.some(function(exame) {
            return exame.exame.toLowerCase().includes(searchTerm);
          });

          return nomeMatches || cpfMatches || exameMatches;
        });

        renderPatients(filteredPatients);
      })
      .catch(function(error) {
        console.log('Erro ao carregar os dados:', error);
      });
  });

  function renderPatients(pacientes) {
    if (pacientes.length === 0) {
      pacientesContainer.innerHTML = 'Nenhum dado correspondente encontrado.';
      return;
    }

    pacientesContainer.innerHTML = '';

    pacientes.forEach(function(paciente) {
      const pacientePreviewDiv = criarPacientePreview(paciente);
      pacientesContainer.appendChild(pacientePreviewDiv);
    });
  }
  function deletarPaciente(pacienteId) {
  // Exibir uma mensagem de confirmação ao usuário
  if (!confirm('Tem certeza de que deseja excluir este paciente?')) {
    return; // Abortar a exclusão caso o usuário cancele
  }

  pacienteService.deletarPaciente(pacienteId)
    .then(() => {
      console.log('Paciente excluído com sucesso.');
      // Atualizar a página ou realizar outras ações necessárias após a exclusão
    })
    .catch(error => {
      console.error('Erro ao excluir o paciente:', error);
    });
}

  function exibirDetalhesPaciente(pacienteId) {
    window.location.href = `documento.html?id=${pacienteId}`;
  }
});
