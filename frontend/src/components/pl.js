import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

function ProductTable({ data }) {
  const [expandedRows, setExpandedRows] = useState([]);

  const handleRowClick = (rowKey) => {
    if (expandedRows.includes(rowKey)) {
      setExpandedRows(expandedRows.filter((key) => key !== rowKey));
    } else {
      setExpandedRows([...expandedRows, rowKey]);
    }
  };

  const renderNestedTable = (subData , prevLevelName) => {
    return (
      <Table bordered>
        <thead>
          <tr>
            <th>二階產品名稱</th>
            <th>使用量</th>
            <th>Unit Price</th>
            <th>Total Price</th>
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
    );
  };

  const renderNestedTable2 = (subData , prevLevelName) => {
    return (
      <Table bordered>
        <thead>
          <tr>
            <th>三階原料名稱</th>
            <th>使用量</th>
            <th>Unit Price</th>
            <th>Total Price</th>
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
    );
  };

  return (
    <Table bordered>
      <thead>
        <tr>
          <th>產品名稱</th>
          <th>Product Cost</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(data.productCosts).map((key) => (
          <React.Fragment key={key}>
            <tr onClick={() => handleRowClick(key)}>
              <td>{data.productCosts[key].product_name}</td>
              <td>{data.productCosts[key].product_cost}</td>
            </tr>
            {expandedRows.includes(key) && (
              <tr>
                <td colSpan="2">{renderNestedTable(data.productCosts_sec , key)}</td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </Table>
  );
}

export default ProductTable;
