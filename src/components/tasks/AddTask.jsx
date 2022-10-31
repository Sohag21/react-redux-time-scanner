import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../../service/Tasks';

const AddTask = ({ isShow, closeModal, setModal }) => {
    const [name, setTaskName] = useState("");
    const [duration, setDuration] = useState("");

    const dispatch = useDispatch();
    const taskList = useSelector((state) => state.tasks.value);

    const submit = (e) => {
        e.preventDefault();
        dispatch(
            addTask({
                id: taskList[taskList.length - 1].id + 1,
                name,
                duration,
            })
        );
        setTaskName("");
        setDuration("");
        setModal(false);
    };

    return (
        <div>
            <Modal show={isShow}>
                <Modal.Header closeButton onClick={closeModal}>
                    <Modal.Title>Add New Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Task Name</Form.Label>
                            <Form.Control onChange={(e) => {
                                setTaskName(e.target.value)
                            }} type="text" placeholder="task x" value={name} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Duration</Form.Label>
                            <Form.Control onChange={(e) => {
                                setDuration(e.target.value);
                            }} type="text" placeholder="5" value={duration} />
                        </Form.Group>
                        <Button onClick={(e) => submit(e)} variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default AddTask