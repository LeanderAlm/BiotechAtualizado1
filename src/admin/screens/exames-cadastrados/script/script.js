//Documentos
window.jsPDF = window.jspdf.jsPDF;
  
    document.addEventListener('DOMContentLoaded', function() {
      // ID do paciente selecionado obtido a partir da URL
      const urlParams = new URLSearchParams(window.location.search);
      const pacienteId = parseInt(urlParams.get('id'));
  
      // Carregar o arquivo JSON com as informações dos pacientes
      fetch('/exames-cadastrados/exames.json')
        .then(response => response.json())
        .then(data => {
          // Encontrar o paciente com o ID correspondente
          const paciente = data.pacientes.find(p => p.id === pacienteId);
  
          // Verificar se o paciente foi encontrado
          if (!paciente) {
            console.error('Paciente não encontrado.');
            return;
          }
  
          // Criar um novo documento jsPDF
          const doc = new jsPDF();
  
          // Adicionar o título do documento
          doc.setFontSize(16);
          doc.text('Relatório de Exames Laboratoriais', 20, 20);
  
          // Adicionar informações do paciente
          doc.setFontSize(12);
          doc.text(`Paciente: ${paciente.nome || 'Nome não disponível'}`, 20, 30);
          doc.text(`CPF: ${paciente.cpf || 'CPF não disponível'}`, 20, 36);
          doc.text(`Data de nascimento: ${paciente.data_nascimento || 'Data de nascimento não disponível'}`, 20, 42);
          doc.text(`Sexo: ${paciente.sexo || 'Sexo não disponível'}`, 20, 48);
  
          // Adicionar uma tabela com os resultados dos exames
          const exames = paciente.exames || [];
          const tabelaExames = [['Exame', 'Resultado', 'Referência']];
          exames.forEach(exame => {
            tabelaExames.push([exame.nome || '', exame.resultado || '', exame.referencia || '']);
          });
          doc.autoTable({
            startY: 60,
            head: tabelaExames.slice(0, 1),
            body: tabelaExames.slice(1),
          });
  
          // Adicionar um rodapé com a data e hora do relatório
          const dataHora =
            new Date().toLocaleDateString() +
            ' - ' +
            new Date().toLocaleTimeString();
          doc.setFontSize(10);
          doc.text(`Data do relatório: ${dataHora}`, 20, doc.internal.pageSize.height - 10);
  
          // Gerar o documento PDF
          const pdfDataUri = doc.output('datauristring');
  
          // Exibir o preview do PDF
          const pdfPreview = document.getElementById('pdf-preview');
          pdfPreview.innerHTML = `<iframe src="${pdfDataUri}" width="100%" height="100%"></iframe>`;
          
        })
        .catch(error => {
          console.error('Erro ao carregar o arquivo JSON:', error);
        });
    });

  //view
function criarPacientePreview(paciente) {
    const pacienteDiv = criarElemento('div', 'paciente-preview', '');
  
    const nomeCpfDiv = criarElemento('div', 'nome-cpf', '');
    nomeCpfDiv.innerHTML = `<strong>${paciente.nome}</strong> - CPF: ${paciente.cpf} - Data de Nascimento: ${paciente.data_nascimento}<br>Exames registrados: `;
    pacienteDiv.appendChild(nomeCpfDiv);

    //Listar os exames para o preview
    const exames = paciente.exames;
    let nomesExames = '';
    exames.forEach(exame => {
    nomesExames += exame.nome + ', ';
});
    nomesExames = nomesExames.slice(0, -2);
    nomeCpfDiv.innerHTML += nomesExames;
  
    const detalhesBtn = criarElemento('button', 'btn-detalhes', 'Detalhes');
    detalhesBtn.addEventListener('click', () => exibirDetalhesPaciente(paciente.id));
    pacienteDiv.appendChild(detalhesBtn);
  
    return pacienteDiv;
  }
  
  function exibirDetalhesPaciente(pacienteId) {
    window.location.href = `./documento.html?id=${pacienteId}`;
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    fetch('./exames.json')
      .then(response => response.json())
      .then(data => {
        const pacientes = data.pacientes;
  
        // Ordenar os pacientes por nome em ordem alfabética
        pacientes.sort((a, b) => a.nome.localeCompare(b.nome));
  
        // Limitar o número de pacientes exibidos no preview
        const numPacientesPreview = 5;
        const pacientesPreview = pacientes.slice(0, numPacientesPreview);
  
        // Gerar o preview dos pacientes
        const pacientesContainer = document.getElementById('pacientes-container');
        if (pacientesContainer) {
          pacientesPreview.forEach(paciente => {
            const pacientePreviewDiv = criarPacientePreview(paciente);
            pacientesContainer.appendChild(pacientePreviewDiv);
          });
        } else {
          console.log('O elemento pacientes-container não foi encontrado.');
        }
      })
      .catch(error => {
        console.log('Erro ao carregar os dados: ', error);
      });
  });
  
  function criarElemento(tag, classes, conteudo) {
    const elemento = document.createElement(tag);
    elemento.className = classes;
    elemento.innerHTML = conteudo;
    return elemento;
  }
  
