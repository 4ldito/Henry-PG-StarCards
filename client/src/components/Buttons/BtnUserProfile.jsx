import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  FormGroup,
  Input,
} from "reactstrap";
import s from "../../styles/ProfileUser/BtnUserProfile.module.css";
import "bootstrap/dist/css/bootstrap.css";
import { useDispatch, useSelector } from "react-redux";
import { modifyUser, userCleanMsgInfo } from "../../redux/actions/user";
import Swal from "sweetalert2";
import { FaRegEdit } from "react-icons/fa";

import css from "./BtnUserProfile.module.css";

export default function username({ user, property }) {
  const dispatch = useDispatch();
  const [state, setState] = useState({ open: false });
  const [value, setValue] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const invalidPassword = useSelector((state) => state.userReducer.msg);
  const user1 = useSelector((state) => state.userReducer.user);

  function openModal() {
    setState({ open: !state.open });
    setValue("");
  }

  const modalStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  function handleChange(e) {
    const input = e.target.value;
    setValue(input);
  }

  function handleConfirm(e) {
    const input = e.target.value;
    setOldPassword(input);
  }

  useEffect(() => {
    if (invalidPassword === "Incorrect") {
      Swal.fire({
        background:
          "linear-gradient( 135deg, rgba(7, 110, 153, 1) 0%, rgba(43, 0, 110, 1) 100% )",
        color: "white",
        title: "Error",
        text: "Wrong password",
        icon: "error",
      });
      //clean status:
      dispatch(userCleanMsgInfo());
      setState({ open: false });
    }
  }, [invalidPassword]);

  useEffect(() => {
    if (invalidPassword === "Correct") {
      Swal.fire({
        background:
          "linear-gradient( 135deg, rgba(7, 110, 153, 1) 0%, rgba(43, 0, 110, 1) 100% )",
        color: "white",
        title: "Completado",
        text: "Updated info",
        icon: "success",
      });
    }
    dispatch(userCleanMsgInfo());
    setState({ open: false });
  }, [user1]);

  function sendData(e) {
    if (property === "username") {
      dispatch(modifyUser(user.id, { [property]: value }));
      Swal.fire({
        background:
          "linear-gradient( 135deg, rgba(7, 110, 153, 1) 0%, rgba(43, 0, 110, 1) 100% )",
        color: "white",
        title: "Completado",
        text: "Username modified",
        icon: "success",
      });
      openModal();
    }
    if (property === "password") {
      dispatch(
        modifyUser(user.id, { verifyPassword: oldPassword, [property]: value })
      );
    }
  }

  return property == "username" ? (
    <>
      <div className={s.principal}>
        <div className={s.secundario}>
          <span className={css.btnModify} onClick={openModal}>
            Edit <FaRegEdit size={30} />
          </span>
        </div>
      </div>
      <div className={s.global}>
        <Modal isOpen={state.open} style={modalStyles}>
          <ModalHeader className={css.modals}>MODIFY</ModalHeader>
          <ModalBody className={css.modals}>
            <FormGroup className={css.modals}>
              <span>Username</span>
              <Input
                type="text"
                onChange={(e) => handleChange(e)}
                id="username"
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter className={css.modals}>
            <div className={css.buttons}>
              <button value="username" onClick={(e) => sendData(e)}>
                Send
              </button>
              <button onClick={openModal}>Close</button>
            </div>
          </ModalFooter>
        </Modal>
      </div>
    </>
  ) : (
    <>
      <div className={s.principal}>
        <div className={s.secundario}>
          <span className={css.btnModify} onClick={openModal}>
            Edit <FaRegEdit size={30} />
          </span>
        </div>
      </div>
      <div className={s.global}>
        <Modal isOpen={state.open} style={modalStyles}>
          <ModalHeader className={css.modals}>Modificar</ModalHeader>
          <ModalBody className={css.modals}>
            <FormGroup className={css.modals}>
              <span>Enter Current Password</span>
              <Input
                type="password"
                onChange={(e) => handleConfirm(e)}
                id="password"
              />
              <span>Enter New Password</span>
              <Input
                type="password"
                onChange={(e) => handleChange(e)}
                id="password2"
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter className={css.modals}>
            <div className={css.buttons}>
              <button value="password" onClick={(e) => sendData(e)}>
                Send
              </button>
              <button onClick={openModal}>Close</button>
            </div>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
}
