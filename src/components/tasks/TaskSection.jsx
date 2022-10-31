import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { deleteTask, updateTask } from '../../service/Tasks';
import AddTask from './AddTask'

export default function TaskSection({ taskList }) {
    const [isShow, setModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [taskId, setTaskId] = useState('');
    const [name, setTaskName] = useState('')
    const [duration, setDuration] = useState('')

    const dispatch = useDispatch();

    const initModal = () => {
        return setModal(!false)
    }
    const closeModal = () => {
        setModal(false)
    }
    const updateTaskModal = (id) => {
        const data = taskList.find(obj => {
            return obj.id === id;
          });
          setTaskId(id)
          setTaskName(data?.name);
          setDuration(data?.duration);
        setUpdateModal(!false)
    }
    const closeupdateTaskModal = () => {
        setUpdateModal(false)
    };
    const deleteTaskFn = (task) => {
        dispatch(deleteTask({ id: task }));
    }

    const handleName =(event)=>{
        setTaskName(event.target.value);
    }
    const handleDuration =(event)=>{
        setDuration(event.target.value);
    }
    
    const update = (e)=>{
        e.preventDefault();
        dispatch(
            updateTask({
                id: taskId,
                name,
                duration,
            })
        );
        closeupdateTaskModal();
    }
    return (
        <div className='taskSection'>
            <div className="task-header">
                <h3 className="table-title">Task Table</h3>
                <button onClick={initModal} className="btn btn-success">Add Task</button>
            </div>
            {/* task table  */}
            <div className="task-table">
                <table>
                    <thead>
                        <th>Task Name</th>
                        <th>Duration</th>
                        <th>Action</th>
                    </thead>
                    {taskList?.map((task) => {
                        return (
                            <tr>
                                <td>{task?.name}</td>
                                <td>{task?.duration} Seconds</td>
                                <td>
                                    <Button onClick={e => updateTaskModal(task?.id)} variant="outline-info" size="sm">Edit</Button>{' '}
                                    <Button onClick={e => deleteTaskFn(task?.id)} variant="outline-danger" size="sm">Delete</Button>{' '}
                                </td>
                            </tr>
                        )
                    })}

                </table>
            </div>

            {/* task add modal  */}
            <AddTask isShow={isShow} closeModal={closeModal} setModal={setModal} />            

             {/* update task  */}
             <Modal show={updateModal}>
                <Modal.Header closeButton onClick={closeupdateTaskModal}>
                    <Modal.Title>Update Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Task Name</Form.Label>
                            <Form.Control onChange={handleName} name='taskName' value={name} type="text" placeholder="task x" />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Duration</Form.Label>
                            <Form.Control onChange={handleDuration} name='duration' value={duration} type="text" placeholder="5 sec" />
                        </Form.Group>
                        <Button onClick={(e) => update(e)} variant="primary" type="submit">
                            Update
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}
