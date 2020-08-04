const request = require('request-promise');

// Coloque aqui sua Chave de API
const apiKey = '86c8930f-d247-4887-9bde-7b11f9caf275-31231306-a0d0-4de9-8d9c-ed6351c0e6a6';

/**
 * Dado um CNPJ, consulta a Receita Federal e adquire as informações
 * da inscrição bem como CNAEs e sócios 
 * @param { string } taxId - CNPJ a ser consultado
 */
async function getCompany(taxId) {
  const cnpjaHost = 'https://api.cnpja.com.br';
  const cleanTaxId = taxId ? taxId.toString().replace(/\D+/g, '') : null;

  const company = await request({
    uri: `${cnpjaHost}/companies/${cleanTaxId}`,
    headers: { 'Authorization': apiKey },
    json: true,
  });
  return company;
}

export {
    getCompany
}