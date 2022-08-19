import React, { useRef, useState } from "react";
import {Button, Modal, ModalBody, ModalHeader, ModalFooter, FormGroup, Input, Label} from 'reactstrap'
import s from './BtnUserProfile.module.css'
import 'bootstrap/dist/css/bootstrap.css'
import { useDispatch } from "react-redux";
import { modifyUser } from "../../redux/actions/user";

////////////////////////////////////////////////////////////////////////
export default function username (props) {
    const dispatch = useDispatch()
    const [state, setState] = useState({open: false})
    const [value, setValue] = useState('')

    function openModal(){
        setState({open: !state.open})
    }

    const modalStyles={
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    }

    function handleChange(e){
        const input = e.target.value
        setValue(input)
    }
    function sendData(){
        dispatch(modifyUser(value))
        openModal()
    }
    return(
        props.value=='username'?
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
                        <Input type='text' onChange={(e)=>handleChange(e)} id='username'/>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <button color='primary' value='username' onClick={(e)=>sendData(e)}>Send</button>
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
                    <Label for='password'>Password</Label>
                    <Input type='text' onChange={(e)=>handleChange(e)} id='password'/>
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <button color='primary' value='password' onClick={(e)=>sendData(e)}>Send</button>
                <button color='secondary' onClick={openModal}>Close</button>
            </ModalFooter>
        </Modal>
        </div>
    </>)
}
