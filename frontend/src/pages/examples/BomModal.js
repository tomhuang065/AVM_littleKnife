import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
import { useChat } from '../../api/context';

function AddBOMModal({ show, onHide }) {
    const instance = axios.create({ baseURL: 'http://localhost:5000/api/avm' });
    const { userData , setSup} = useChat();
    const [formData, setFormData] = useState({
        product_id: '',
        product_name: '',
        product_sec_id: '',
        use_quantity: '',
        update_user: '',
        update_time: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleAddBOM = async (e) => {
        e.preventDefault();
        // 檢查是否有欄位未填寫
        if (formData.product_id === '') {
            alert('尚未輸入產品代碼');
            return;
        }
        if (formData.product_name === '') {
            alert('尚未輸入產品名稱');
            return;
        }
        // 設定更新人員


        // 設定更新時間
        formData.update_time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        // 將 formData 中的值發送到後端
        console.log('新增 BOM 第一階', formData);
        instance.post('/add_bom_first', {ID:JSON.stringify(formData)})
            .then((response) => {
                console.log('新增成功', response.data);
                alert('新增成功');
                onHide(); // 關閉 modal
            })
            .catch((error) => {
                alert('新增失敗，請稍後再試');
                console.error('新增失敗', error);
            });
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>新增 BOM 第一階</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="product_id">
                        <Form.Label>產品代碼</Form.Label>
                        <Form.Control
                            type="text"
                            name="product_id"
                            value={formData.product_id}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="product_name">
                        <Form.Label>產品名稱</Form.Label>
                        <Form.Control
                            type="text"
                            name="product_name"
                            value={formData.product_name}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    取消
                </Button>
                <Button variant="primary" onClick={handleAddBOM}>
                    新增
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddBOMModal;


export function AddBOMModal2({ show, onHide }) {
    const instance = axios.create({ baseURL: 'http://localhost:5000/api/avm' });
    const { userData , setSup} = useChat();
    const [formData, setFormData] = useState({
        product_id: '',
        product_name: '',
        product_sec_id: '',
        use_quantity: '',
        update_user: '',
        update_time: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleAddBOM = async (e) => {
        e.preventDefault();
        // 檢查是否有欄位未填寫
        if (formData.product_id === '') {
            alert('尚未輸入產品代碼');
            return;
        }
        if (formData.product_name === '') {
            alert('尚未輸入產品名稱');
            return;
        }
        // 設定更新人員


        // 設定更新時間
        formData.update_time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        // 將 formData 中的值發送到後端
        console.log('新增 BOM 第二階', formData);
        instance.post('/add_bom_first', {ID:JSON.stringify(formData)})
            .then((response) => {
                console.log('新增成功', response.data);
                alert('新增成功');
                onHide(); // 關閉 modal
            })
            .catch((error) => {
                alert('新增失敗，請稍後再試');
                console.error('新增失敗', error);
            });
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>新增 BOM 第二階</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="product_id">
                        <Form.Label>二階產品代碼</Form.Label>
                        <Form.Control
                            type="text"
                            name="product_id"
                            value={formData.product_id}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="product_name">
                        <Form.Label>二階產品名稱</Form.Label>
                        <Form.Control
                            type="text"
                            name="product_name"
                            value={formData.product_name}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    取消
                </Button>
                <Button variant="primary" onClick={handleAddBOM}>
                    新增
                </Button>
            </Modal.Footer>
        </Modal>
    );
}


