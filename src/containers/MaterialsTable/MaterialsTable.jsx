import React from "react";
import MaterialItem from '../../components/MaterialItem';
import Table from 'react-bootstrap/Table'


const MaterialsTable = ({materialsList}) => { 

   const formatter = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'});

   if (materialsList.length===0)
      return null;
   else return (
         <Table striped bordered hover>
            <thead>
               <tr>
                  <th> Material </th>
                  <th> Detalhes </th>
                  <th>  </th>
               </tr>
            </thead>

            <tbody>
               {materialsList && materialsList.map((material, index)  => {

                  const materialDetails = {
                     "Fornecedor" : material.supplier_name,
                     "Preço": formatter.format(material.package_price),
                     "Quantidade (pacote ou frasco)": `${material.package_amt} ` + material.unit_material,
                  }

                  return <MaterialItem key={index} 
                                       id={material.id}
                                       description={material.description} 
                                       details = {materialDetails} />
               })} 
            </tbody>
         </Table>
		);
}

export default MaterialsTable;