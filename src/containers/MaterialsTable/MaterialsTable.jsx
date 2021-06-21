import React from "react";
import MaterialItem from '../../components/MaterialItem';
import Table from 'react-bootstrap/Table'

const MaterialsTable = ({materialsList}) => { 

      if (materialsList.length===0)
         return null;
      else return (
            <Table striped bordered hover>
               <thead>
                  <tr>
                     <th> Material </th>
                     <th> Detalhes </th>
                  </tr>
               </thead>

               <tbody>
                  {materialsList && materialsList.map((material, index)  => {

                     const materialDetails = {
                        "Fornecedor" : material.supplier_name,
                        "Preço": material.package_price,
                        "Quantidade (pacote/frasco):": `${material.package_price}` + material.unit_material,
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