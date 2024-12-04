import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalConfirm: React.FC<{
    show: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    message: string;
}> = ({ show, onCancel, onConfirm, message }) => (
    <Modal show={show} onHide={onCancel}>
        <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onCancel}>
                Cancel
            </Button>
            <Button variant="primary" onClick={onConfirm}>
                Confirm
            </Button>
        </Modal.Footer>
    </Modal>
);

export default ModalConfirm;
