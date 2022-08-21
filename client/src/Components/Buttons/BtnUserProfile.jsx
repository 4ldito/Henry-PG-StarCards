import React, { useRef, useState } from "react";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, FormGroup, Input, Label } from 'reactstrap'
import s from '../../styles/ProfileUser/BtnUserProfile.module.css'
import 'bootstrap/dist/css/bootstrap.css'
import { useDispatch, useSelector } from "react-redux";
import { modifyUser } from "../../redux/actions/user";

////////////////////////////////////////////////////////////////////////
export default function username({ user, property }) {
    const dispatch = useDispatch()
    const [state, setState] = useState({ open: false })
    const [value, setValue] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const password = useSelector(state => state.userReducer.validPassword)

    function openModal() {
        setState({ open: !state.open })
        console.log(user,'password user : ', user.password)
        setValue('')
    }

    const modalStyles = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    }

    function handleChange(e) {
        const input = e.target.value
        setValue(input)
    }

    function handleConfirm(e) {
        const input = e.target.value
        setOldPassword(input)
    }

    function sendData(e) {
        let property = e.target.value
        if (property === 'password'){
            dispatch(modifyUser(user.id, { [property]: value }))
        }
        console.log('password button' , password)

        // if (property === 'password' && oldPassword !== user.password) { //si la password es incorrecta se cierra.
        //     openModal()
        //     return alert('Incorrect Password')
        // }
        // else if (property === 'password' && value.length >= 1 && value.length < 6) {
        //     return alert('New password a long six characters...')
        // }
        // else if (property === 'password' && !value.length) return alert('New password empty')
        // openModal()
    }
    return (
        property == 'username' ?
            <>
                <div className={s.principal}>
                    <div className={s.secundario}>
                        <Button color='success' onClick={openModal}>MODIFY</Button>
                    </div></div>
                <div className={s.global}>
                    <Modal isOpen={state.open} style={modalStyles}>
                        <ModalHeader>
                            MODIFY
                        </ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label for='username'>Username</Label>
                                <Input type='text' onChange={(e) => handleChange(e)} id='username' />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <button color='primary' value='username' onClick={(e) => sendData(e)}>Send</button>
                            <button color='secondary' onClick={openModal}>Close</button>
                        </ModalFooter>
                    </Modal>
                </div>
            </>
            :
            <>
                <div className={s.principal}>
                    <div className={s.secundario}>
                        <Button color='success' onClick={openModal}>MODIFY</Button>
                    </div></div>
                <div className={s.global}>
                    <Modal isOpen={state.open} style={modalStyles}>
                        <ModalHeader>
                            Modificar
                        </ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label for='password'>Enter Current Password</Label>
                                <Input type='password' onChange={(e) => handleConfirm(e)} id='password' />
                                <Label for='password'>Enter New Password</Label>
                                <Input type='password' onChange={(e) => handleChange(e)} id='password2' />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <button color='primary' value='password' onClick={(e) => sendData(e)}>Send</button>
                            <button color='secondary' onClick={openModal}>Close</button>
                        </ModalFooter>
                    </Modal>
                </div>
            </>)
}
