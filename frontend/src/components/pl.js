import React, { useEffect, useState } from 'react';
import {Table , Card ,Button} from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus , faFileAlt , faEdit , faTrashAlt } from '@fortawesome/free-solid-svg-icons';


function ProductTable({ data }) {
  const [expandedRows, setExpandedRows] = useState([]);

  const handleRowClick = (rowKey) => {
    if (expandedRows.includes(rowKey)) {
      setExpandedRows(expandedRows.filter((key) => key !== rowKey));
    } else {
      setExpandedRows([...expandedRows, rowKey]);
    }
  };

  const handleSingleAdd = (rowKey) => {
    console.log(rowKey)
  }

  const handleRowEdit = (rowKey) => {
    console.log(rowKey)
  }

  const handleRowEditDelete = (rowKey) => {
    console.log(rowKey)
  }

  const handleRowEdit2 = (rowKey) => {
    console.log(rowKey)
  }
  const handleRowEditDelete2 = (rowKey) => {
    console.log(rowKey)
  }

  

  const renderNestedTable = (subData , prevLevelName) => {
    return (
      <Card border="light" className="shadow-sm mb-3">
      <Table  className="user-table align-items-center table-striped">
        <thead>
          <tr>
            <th className="border-bottom">二階產品名</th>
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
              </td>
              </tr>
              
            )}
              {expandedRows.includes(subKey) && (
                <tr>
                  <td colSpan="4">{renderNestedTable2(data.productCosts_third, subKey)}</td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </Card>
    );
  };

  const renderNestedTable2 = (subData , prevLevelName) => {
    return (
      <Card border="light" className="shadow-sm mb-3">
      <Table className="user-table align-items-center table-striped">
        <thead>
          <tr>
            <th className="border-bottom">三階產品名稱</th>
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
    </Card>
    );
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
    <Table className="user-table align-items-center table-striped">
      <thead>
        <tr>
          <th className="border-bottom">產品名稱</th>
          <th className="border-bottom">Product Cost</th>
          <th className="border-bottom">Actions</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(data.productCosts).map((key) => (
          <React.Fragment key={key}>
            <tr onClick={() => handleRowClick(key)}>
              <td>{data.productCosts[key].product_name}</td>
              <td>{data.productCosts[key].product_cost}</td>
              <td>
                  <Button variant = "link"onClick={() => {handleRowEdit()}}>
                    <FontAwesomeIcon icon={faEdit} className="me-0.5" /> 
                  </Button>
                  <Button  variant = "link" className="text-danger" onClick={() => {handleRowEditDelete()}}>
                    <FontAwesomeIcon icon={faTrashAlt} className="me-0.5" /> 
                  </Button>
              </td>
            </tr>
            {expandedRows.includes(key) && (
                
              <tr>
                {/* <Button variant="primary" onClick={handleRowClick(key)}>新增二階產品</Button>    
                         */}
                <td>
                <Button icon={faFileAlt} className="me-2" variant="primary" onClick={handleSingleAdd}>
                  <FontAwesomeIcon icon={faPlus} className="me-2" />
                  新增二階產品
                </Button>
                </td>
                <td colSpan="2">{renderNestedTable(data.productCosts_sec , key)}</td>

              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </Table>
  </Card>
  );
}

export default ProductTable;
