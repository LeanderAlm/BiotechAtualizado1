window.jsPDF = window.jspdf.jsPDF;
const webService = 'http://localhost:3000/';

document.addEventListener('DOMContentLoaded', function() {
  // ID do paciente selecionado obtido a partir da URL
  const urlParams = new URLSearchParams(window.location.search);
  const pacienteId = parseInt(urlParams.get('id'));

  // Carregar os dados do paciente
  fetch(`${webService}pacientes/${pacienteId}`)
    .then(response => response.json())
    .then(paciente => {
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
      doc.text(`Data de nascimento: ${paciente.dataNascimento || 'Data de nascimento não disponível'}`, 20, 42);
      doc.text(`Sexo: ${paciente.genero || 'Sexo não disponível'}`, 20, 48);
      

      // Buscar os dados dos exames do paciente
      fetch(`${webService}exames/${pacienteId}`)
        .then(response => response.json())
        .then(dadosExame => {
          // Verificar se o exame foi encontrado
          if (!dadosExame) {
            console.error(`Dados do exame (${pacienteId}) não encontrados.`);
            return;
          }

         // Adicionar a tabela de exames ao documento
// Adicionar a tabela de exames ao documento
doc.autoTable({
    startY: 70,
    head: [['Exames', 'Resultados']],
    theme: 'grid', // Adicionei o tema 'grid' para melhor visualização das células
    styles: { valign: 'middle' }, // Centraliza verticalmente o conteúdo das células
  });
  
  // Verificar o tipo de exame e adicionar os detalhes específicos
  if (dadosExame.exame1 === 'Exames de Fezes') {
    doc.autoTable({
      startY: doc.previousAutoTable.finalY + 10, // Define a posição de início da nova tabela
      head: [['Exame de Fezes', 'Resultado']],
      body: [
        ['Consistência das fezes', dadosExame.consistencia || 'Não disponível'],
        ['Cor das fezes', dadosExame.cor || 'Não disponível'],
        ['Presença de sangue oculto', dadosExame.sangueoculto || 'Não disponível'],
        ['Leucócitos nas fezes', dadosExame.leucocitosfezes || 'Não disponível'],
        ['Vírus/Parasitas nas fezes', dadosExame.vparasitas || 'Não disponível'],
        ['Ovos/Parasitas nas fezes', dadosExame.ovosparasitas || 'Não disponível'],
        ['Bactérias nas fezes', dadosExame.bacterias || 'Não disponível'],
        // Adicionar mais campos específicos dos exames de fezes, se necessário
      ].map(row => row.map(cell => ({ content: cell, styles: { align: 'left' } }))),
      theme: 'grid', // Adicionei o tema 'grid' para melhor visualização das células
      styles: { valign: 'middle' }, // Centraliza verticalmente o conteúdo das células
    });
  }  if (dadosExame.exame2 === 'Exames de Urina') {
    doc.autoTable({
      startY: doc.previousAutoTable.finalY + 10, // Define a posição de início da nova tabela
      head: [['Exame de Urina', 'Resultado']],
      body: [
        ['Cor da urina', dadosExame.corurina || 'Não disponível'],
                ['Aspecto da urina', dadosExame.aspectourina || 'Não disponível'],
                ['Densidade da urina', dadosExame.densidadeurina || 'Não disponível'],
                ['pH da urina', dadosExame.phurina || 'Não disponível'],
                ['Proteínas na urina', dadosExame.proteinasurina || 'Não disponível'],
                ['Glicose na urina', dadosExame.glicoseurina || 'Não disponível'],
                ['Cetonas na urina', dadosExame.cetonasurina || 'Não disponível'],
                ['Bilirrubina na urina', dadosExame.bilirrubinaurina || 'Não disponível'],
                ['Urobilinogênio na urina', dadosExame.urobilinogeniourina || 'Não disponível'],
                ['Hemácias na urina', dadosExame.hemaciasurina || 'Não disponível'],
                ['Leucócitos na urina', dadosExame.leucocitosurina || 'Não disponível'],
                ['Nitrito na urina', dadosExame.nitritourina || 'Não disponível'],
                ['Células epiteliais na urina', dadosExame.celulasepiteliaisurina || 'Não disponível'],
                ['Cilindros na urina', dadosExame.cilindrosurina || 'Não disponível'],
                ['Cristais na urina', dadosExame.cristaisurina || 'Não disponível'],
                ['Bactérias na urina', dadosExame.bacteriasurina || 'Não disponível'],
                // Adicionar mais campos específicos dos exames de urina, se necessário
      ].map(row => row.map(cell => ({ content: cell, styles: { align: 'left' } }))),
      theme: 'grid', // Adicionei o tema 'grid' para melhor visualização das células
      styles: { valign: 'middle' }, // Centraliza verticalmente o conteúdo das células
    });
  }  if (dadosExame.exame === 'Exames de Sangue') {
    doc.autoTable({
      startY: doc.previousAutoTable.finalY + 10, // Define a posição de início da nova tabela
      head: [['Exame de Sangue', 'Resultado']],
      body: [
        ['Hemoglobina', dadosExame.hemoglobina || 'Não disponível'],
                ['Hematócrito', dadosExame.hematocritos || 'Não disponível'],
                ['Leucócitos', dadosExame.leucocitos || 'Não disponível'],
                ['TSH', dadosExame.tsh || 'Não disponível'],
                ['T4 Total', dadosExame.t4total || 'Não disponível'],
                ['T4', dadosExame.t4 || 'Não disponível'],
                ['Plaquetas', dadosExame.plaquetas || 'Não disponível'],
                ['ALT', dadosExame.alt || 'Não disponível'],
                ['Reticulócitos', dadosExame.reticulocitos || 'Não disponível'],
                ['AST', dadosExame.ast || 'Não disponível'],
                ['Colesterol Total', dadosExame.colesteroltotal || 'Não disponível'],
                ['TGP', dadosExame.tgp || 'Não disponível'],
                ['HDL Colesterol', dadosExame.hdlcolesterol || 'Não disponível'],
                ['TGO', dadosExame.tgo || 'Não disponível'],
                ['LDL Colesterol', dadosExame.ldlcolesterol || 'Não disponível'],
                ['Triglicerídeos', dadosExame.triglicerideos || 'Não disponível'],
                ['Glicemia em Jejum', dadosExame.glicemiajejum || 'Não disponível'],
                ['Glicemia Pós-prandial', dadosExame.glicemiaposprandial || 'Não disponível'],
                // Adicionar mais campos específicos dos exames de sangue, se necessário
      ].map(row => row.map(cell => ({ content: cell, styles: { align: 'left' } }))),
      theme: 'grid', // Adicionei o tema 'grid' para melhor visualização das células
      styles: { valign: 'middle' }, // Centraliza verticalmente o conteúdo das células
    });
  }
  
  

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
          console.error('Erro ao carregar os dados do exame:', error);
        });

    })
    .catch(error => {
      console.error('Erro ao carregar os dados do paciente:', error);
    });
});
