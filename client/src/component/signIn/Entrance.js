import React, { useState } from "react"
import { Button } from "react-bootstrap"  
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import isIsraeliIdValid from 'israeli-id-validator';
import { add } from './../../service/func'
import './Entrance.css'

export default function RegistrationFrom({handleClose, setUserName, setLogin}) {
  const [existUser, setExistUser] = useState(null);
  function saveToken(token) {
    localStorage.setItem('token', token);
    setLogin(true)
    localStorage.setItem("validUser", true);
  }
  const checkUser = async (values) => {
    let [user, status] = await add("/users/login", values);
    if (status !== 500){
      if (user.err === "user doesn't exist!")
        setExistUser(1)
      else {
        saveToken(user.token);
        setUserName(user.userName)
        handleClose();
      }
    }
  }
  let values = {
    userId: '',
    password: '',
  };
  const inputs = [{
    "name": "userId",
    "title": "ID",
    "type": "text"
  },
  {
    "name": "password",
    "title": "Password",
    "type": "password"
  }];
  const validation = yup.object({
    userId: yup.string().required('Please enter ID').test('test-name', 'Invalid ID', isIsraeliIdValid),
    password: yup.string().required("Please enter your password")
  })

  return (
    <div>
      <Formik initialValues={values} validationSchema={validation} onSubmit={values => { checkUser(values) }} onChange={() => { setExistUser(null) }}>
        {props => (
        <div>
          <Form>
            <div className ="modal-body">
              {inputs.map((input, index) => {
                return (
                  <div key = {index} className="entranceInputDiv" onChange={() => { setExistUser(null) }}>
                    <div className="entranceInputDivLabel">
                      <label htmlFor={input.name} className="entranceLabel">{input.title}</label>
                    </div>
                    <div className="entranceInputDivInput">
                      <Field name={input.name} type={input.type} className="entranceInput"></Field>
                    </div>
                    <div className="entranceErrorMessage">
                      <ErrorMessage name={input.name}></ErrorMessage>
                    </div>
                  </div>
                )
              })}
              {existUser && <div className="loginErrorMessage">Your ID or password seems to be wrong. Please try again</div>}
            </div >
            <div className="modal-footer">
              <Button className="button" variant="secondary" type="submit" disabled={props.isValid === false}>Submit</Button>
              <Button className="button" variant="secondary" onClick={handleClose}>Close</Button>
            </div>
          </Form>
        </div>
        )}
      </Formik>
    </div>
 );
}