//Primeira versão
document.addEventListener('DOMContentLoaded', function() {
    fetch('exames.json')
      .then(response => response.json())
      .then(data => {
        const pacientes = data.pacientes;
  
        // Ordenar os pacientes por nome em ordem alfabética
        pacientes.sort((a, b) => a.nome.localeCompare(b.nome));
  
        // Gerar a lista de pacientes
        const listaPacientes = document.getElementById('pacientes-lista');
        pacientes.forEach(paciente => {
          const pacienteItem = document.createElement('div');
          pacienteItem.classList.add('paciente-item');
  
          const nomeCpf = document.createElement('span');
          nomeCpf.textContent = `${paciente.nome} - CPF: ${paciente.cpf}`;
          pacienteItem.appendChild(nomeCpf);
  
          const detalhesBtn = document.createElement('button');
          detalhesBtn.textContent = 'Ver Detalhes';
          detalhesBtn.addEventListener('click', function() {
            exibirDetalhesPaciente(paciente);
          });
          pacienteItem.appendChild(detalhesBtn);
  
          listaPacientes.appendChild(pacienteItem);
        });
      })
      .catch(error => {
        console.log('Erro ao carregar os dados: ', error);
      });
  });
  
  function exibirDetalhesPaciente(paciente) {
    // Limpar detalhes anteriores (se houver)
    const detalhesPaciente = document.getElementById('detalhes-paciente');
    detalhesPaciente.innerHTML = '';
  
    // Criar elementos para exibir os detalhes do paciente
    const nome = document.createElement('h2');
    nome.textContent = paciente.nome;
  
    const cpf = document.createElement('p');
    cpf.textContent = `CPF: ${paciente.cpf}`;
  
    const dataNascimento = document.createElement('p');
    dataNascimento.textContent = `Data de Nascimento: ${paciente.data_nascimento}`;
  
    const sexo = document.createElement('p');
    sexo.textContent = `Sexo: ${paciente.sexo}`;
  
    const examesTitulo = document.createElement('h3');
    examesTitulo.textContent = 'Exames';
  
    const examesLista = document.createElement('ul');
    paciente.exames.forEach(exame => {
      const exameItem = document.createElement('li');
      exameItem.textContent = `${exame.nome} - Resultado: ${exame.resultado}`;
  
      examesLista.appendChild(exameItem);
    });
  
    // Adicionar os elementos ao container de detalhes
    detalhesPaciente.appendChild(nome);
    detalhesPaciente.appendChild(cpf);
    detalhesPaciente.appendChild(dataNascimento);
    detalhesPaciente.appendChild(sexo);
    detalhesPaciente.appendChild(examesTitulo);
    detalhesPaciente.appendChild(examesLista);
  }
