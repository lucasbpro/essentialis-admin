import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Table from 'react-bootstrap/Table'

import { getMaterialById, updateMaterial } from '../../services';
import Loading from '../../components/Loading';

const MaterialDetails = () => {

  const {materialId} = useParams();
  const [originalMaterial, setMaterial] = useState({});
  const [newMaterial, setNewMaterial] = useState({});
  const [materialModified, setModified] = useState(false);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
     getMaterialById(materialId).then(material => {
        setMaterial(material);
        setNewMaterial(material);
     })
  },[materialId]);


  useEffect(() => {
    document.getElementById("material-description").value = newMaterial.description;
    document.getElementById("material-supplier").value = newMaterial.supplier_name;
    document.getElementById("material-price").value = newMaterial.package_price;
    document.getElementById("material-amount").value = newMaterial.package_amt;
    document.getElementById("material-unit").value = newMaterial.unit_material;
    setLoading(false);
  },[newMaterial]);

  
  const modifyProperty = (propType, newValue) => {
    let materialInfo = {...newMaterial};
    switch(propType){
        case 1:
            materialInfo.description = newValue;
            break
        case 2:
            materialInfo.supplier_name = newValue;
            break
        case 3:
            materialInfo.package_price = newValue;
            break
        case 4:
            materialInfo.package_amt = newValue;
            break
        case 5:
            materialInfo.unit_material = newValue;
            break
        default:
          return
    }
    setNewMaterial(materialInfo);
    setModified(true);
  }

  const restoreOriginalValues = () => {
    setNewMaterial(originalMaterial);
    setModified(false);
  };

  return (
    <div className="container">
        <h2>{originalMaterial.description}</h2>

        <p>Última atualização em {`${newMaterial.last_update}`}</p>

        {loading? <Loading/> : 
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th> Propriedade </th>
                  <th> Valor </th>
                </tr>
              </thead>

              <tbody>
                <tr> 
                    <td> Descrição </td>
                    <td>
                        <input  id="material-description" onChange={(e)=>modifyProperty(1,e.target.value)}/>
                    </td>
                </tr>
                <tr> 
                    <td> Fornecedor </td>
                    <td>
                        <input  id='material-supplier' onChange={(e)=>modifyProperty(2,e.target.value)}/>
                    </td>
                </tr>
                <tr> 
                    <td> Preço (por pacote) </td>
                    <td>
                      <input  id='material-price'
                              type="number" 
                              min={0.1} 
                              onChange={(e)=>modifyProperty(3,e.target.value)}/>
                    </td>
                </tr>
                <tr> 
                    <td> Quantidade </td>
                    <td>
                      <input  id='material-amount'
                              type="number" 
                              min={0.1} 
                              onChange={(e)=>modifyProperty(4,e.target.value)}/>
                    </td>
                </tr>
                <tr> 
                    <td> Unidade </td>
                    <td>
                      <input  id='material-unit' 
                              onChange={(e)=>modifyProperty(5,e.target.value)}/>
                    </td>
                </tr>
              </tbody>
            </Table>
        }
        
        {loading? <Loading/> : 
            <div style={{"display": "flex", "flexDirection":"row"}}>
              <button  className={materialModified? "button-update":"button-update-disabled"} 
                      disabled={materialModified? false : true}
                      onClick = {()=>updateMaterial(newMaterial)}>	
                  Atualizar
              </button>

              <button  className={materialModified? "button-restore":"button-restore-disabled"} 
                      disabled={materialModified? false : true}
                      onClick = {()=>restoreOriginalValues()}>	
                  Cancelar alterações
              </button>
            </div>
        }
    </div>
  );

};

export default MaterialDetails;