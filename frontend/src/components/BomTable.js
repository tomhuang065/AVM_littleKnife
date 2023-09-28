import React, { useEffect, useState } from 'react';
import {Table , Card ,Button, Accordion} from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus , faFileAlt , faEdit , faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import RemoveModal from '../pages/examples/BomEditForm';
import { useChat } from "../api/context";
import { AddBOMModal2 } from '../pages/examples/BomModal';


function ProductTable({data }, data2) {
  const [expandedRows, setExpandedRows] = useState([]);
  const instance = axios.create({baseURL:'http://localhost:5000/api/avm'});
  const [removeModal, setRemoveModal] = useState(false);
  const [states, setStates] = useState("")
  const [origs, setOrigs] = useState("")
  const [product, setproduct] = useState({
    status:"",
    product_id: "",
    product_name:"",
    update_time: "",
    update_user:"",
  })
  const {result, setResult} = useState("");

  const [showBomModal, setShowBomModal] = useState(false);


  const {sup, setSup} = useChat();
  const handleRowEditDelete = (states, supid, supName, updateUsr, updateTime, status) => {
    setStates(states)
    setRemoveModal(true);
    setproduct({ product_id: supid, product_name:supName, update_time: updateTime, update_user: updateUsr, status:status});
    setOrigs(supid)
}

const handleEditproduct = async(sup)=>{
  console.log("sup", sup)
  const jsonData = {
    orig: `${origs}`,
    status:`${sup}`,
    update_user: `${product.update_user}`,
    update_time: `${product.update_time}`,
    product_id: `${product.product_id}`,
    product_name: `${product.product_name}`,
    task:"change_state"

  };
  const response = await instance.post('/update_bom_first', {
    ID:JSON.stringify(jsonData)
  })
  console.log(response.data)
  //alert("已成功修改供應商顯示狀態")
  setRemoveModal(false)


}

const handleChangeState = (supid, supName, updateUsr, updateTime, status) =>{
  setOrigs(supid)
  setproduct({
    product_id: supid,
    product_name:supName,
    update_time: updateTime,
    update_user:updateUsr,
  })
  console.log(status)
  if(status === 1){
    setSup(false)
  }
  else{
    setSup(true)
  }
}

  useEffect(()=>{
    console.log(sup)
    if(origs !== ''){
      setproduct({status :sup})
      handleEditproduct(sup)
    }
    setOrigs("")    
  },[sup])

  const handleRowClick = (rowKey) => {
    if (expandedRows.includes(rowKey)) {
      setExpandedRows(expandedRows.filter((key) => key !== rowKey));
    } else {
      setExpandedRows([...expandedRows, rowKey]);
    }
  };

  const handleSingleAdd = (product_id, product_name) => {
    setproduct({product_id: product_id, product_name: product_name})
    setShowBomModal(true);
  };
  const handleCloseBomModal = () => {
    setShowBomModal(false);
  };

  const handleSaveBom = async () => {
    // Handle the logic to save the Bom data
    setResult(await instance.get('/get_bom'))
    console.log(result.data)
  };

  const handleRowEdit2 = (rowKey) => {
    console.log(rowKey)
  }
  const handleRowEditDelete2 = (rowKey) => {
    console.log(rowKey)
  }

  

  const renderNestedTable = (subData , prevLevelName) => {
    return (
      //<Card border="light" className="shadow-sm mb-6">
      <Table  className="user-table table-striped">
        <thead>
          <tr>
            <th className="border-bottom">二階產品代碼</th>
            <th className="border-bottom">二階產品名稱</th>
            <th className="border-bottom">用量</th>
            <th className="border-bottom">單價</th>
            <th className="border-bottom">總價</th>
            <th className="border-bottom">選項</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(subData).map((subKey) => (
            <React.Fragment key={subKey}>
              {subData[subKey].prev_level_name === prevLevelName && (
              <tr onClick={() => handleRowClick(subKey)}>
                <td>{subData[subKey].product_sec_id}</td>
                <td>{subData[subKey].product_sec_name}</td>
                <td>{subData[subKey].useage}</td>
                <td>{subData[subKey].unit_price}</td>
                <td>{subData[subKey].total_price}</td>
                <td>
                  <Button variant = "link"onClick={() => {handleRowEdit2()}}>
                    <FontAwesomeIcon icon={faEdit} className="me-0.5" /> 
                  </Button>
                  <Button  variant = "link" className="text-danger" onClick={() => {handleRowEditDelete2()}}>
                    <FontAwesomeIcon icon={faTrashAlt} className="me-0.5" /> 
                  </Button>
                  <Button variant="link" onClick={() => handleSingleAdd(subData[subKey].product_sec_id, subData[subKey].product_sec_name)}>
                    <FontAwesomeIcon icon={faPlus} className="me-0.5" />
                  </Button>
              </td>
              </tr>
              
            )}
              {expandedRows.includes(subKey) && (
                <tr>
                  <td colSpan="6">{renderNestedTable2(data.productCosts_third, subKey)}</td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    //</Card>
    );
  };

  const renderNestedTable2 = (subData , prevLevelName) => {
    return (
      //<Card border="light" className="shadow-sm mb-3">
      <Table className="user-table align-items-center table-striped">
        <thead>
          <tr>
            <th className="border-bottom">三階原物料代碼</th>
            <th className="border-bottom">三階原物料名稱</th>
            <th className="border-bottom">使用量</th>
            <th className="border-bottom">Unit Price</th>
            <th className="border-bottom">Total Price</th>
          </tr>
        </thead>  
        <tbody>
          {Object.keys(subData).map((subKey) => (
            <React.Fragment key={subKey}>
              {subData[subKey].prev_level_name === prevLevelName && (
              <tr>
                <td>{subData[subKey].material_id}</td>
                <td>{subData[subKey].material_name}</td>
                <td>{subData[subKey].useage}</td>
                <td>{subData[subKey].unit_price}</td>
                <td>{subData[subKey].total_price}</td>
              </tr>
            )}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    //</Card>
    );
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
    <Table className="user-table align-items-center table-striped">
      <thead>
        <tr>
          <th className="border-bottom">產品代碼</th>
          <th className="border-bottom">產品名稱</th>
          <th className="border-bottom">Product Cost</th>
          <th className="border-bottom">Actions</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(data.productCosts).map((key) => (
          <React.Fragment key={key}>
            <tr onClick={() => handleRowClick(key)}>
              <td>{data.productCosts[key].product_id}</td>
              <td>{data.productCosts[key].product_name}</td>
              <td>{data.productCosts[key].product_cost}</td>
              <td>
                  <Button variant = "link"onClick={() => {handleRowEditDelete("editing",  data.productCosts[key].product_id, data.productCosts[key].product_name)}}>
                    <FontAwesomeIcon icon={faEdit} className="me-0.5" /> 
                  </Button>
                  <Button  variant = "link" className="text-danger" onClick={() => {handleRowEditDelete("deleting",  data.productCosts[key].product_id, data.productCosts[key].product_name)}}>
                    <FontAwesomeIcon icon={faTrashAlt} className="me-0.5" /> 
                  </Button>
                  <Button variant="link" onClick={() => handleSingleAdd(data.productCosts[key].product_id , data.productCosts[key].product_name)}>
                    <FontAwesomeIcon icon={faPlus} className="me-1" />
                    新增二階產品
                  </Button>
              </td>
            </tr>
            {expandedRows.includes(key) && (
              <tr>
                {/* <Button variant="primary" onClick={handleRowClick(key)}>新增二階產品</Button>    
                         */}
                <td colSpan="4">{renderNestedTable(data.productCosts_sec , key)}</td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </Table>
    {removeModal?
          <RemoveModal /** 編輯視窗 */
            show={removeModal}
            onHide={() => setRemoveModal(false)}
            states ={states}
            product ={product}
            origs={origs}

        />:<div></div>}
    <AddBOMModal2 /** 新增視窗 */
            show={showBomModal}
            onHide={handleCloseBomModal}
            onSave={handleSaveBom}
            product_in ={product}

    />
  </Card>
  );
}

export default ProductTable;
