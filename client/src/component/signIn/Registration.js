import React, { useState } from "react"
import { Button } from "react-bootstrap"
import './Login.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import isIsraeliIdValid from 'israeli-id-validator';
import { add } from '../../service/func'

export default function Registration({ handleClose, setUserName, setLogin}) {
  const [existUser, setExistUser] = useState(null);
  const [err, setErr] = useState(null);
  const phoneRegex = /^0\d([\d]{0,1})([-]{0,1})\d{7}$/;
  function saveToken(token) {
    localStorage.setItem('token', token);
    setLogin(true)
    localStorage.setItem("validUser", true);
  }
  let values = {
    userId: '',
    userName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  const inputs = [{
    "name": "userId",
    "title": "ID",
    "type": "text"
  },
  {
    "name": "userName",
    "title": "User Name",
    "type": "text"
  },
  {
    "name": "phone",
    "title": "Phone",
    "type": "text"
  },
  {
    "name": "email",
    "title": "Email",
    "type": "text"
  },
  {
    "name": "password",
    "title": "Password",
    "type": "password"
  },
  {
    "name": "confirmPassword",
    "title": "Confirm Password",
    "type": "password"
  }];
  const validation = yup.object({
    userId: yup.string().required('Please enter ID').test('test-name', 'Invalid ID', isIsraeliIdValid),
    userName: yup.string().max(20, 'Name should not exceed 20 Characters').required('Please enter user name'),
    phone: yup.string().required('Please enter phone number').matches(phoneRegex, 'Invalid phone number'),
    email: yup.string().email('Invalid email address').required('Please enter email address'),
    password: yup.string().matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character").required("Please enter your password"),
    confirmPassword: yup.string().when("password", {
      is: val => (val && val.length > 0 ? true : false),
      then: yup.string().oneOf([yup.ref("password")], "Both password need to be the same")
    }).required("Please renter password")
  })
  //לא תפסתי שגיאות של ולידציה שחוזרות מהסרבר
  const appandUser = async (values) => {
    const [user, status] = await add("/users", values);
    if(status !== 500){
      if(user.err === "user exist!"){
        setExistUser(1);
      }
      else {
        saveToken(user.token);
        setUserName(values.userName)
        handleClose();
        add("/orders", {orderId: 1}, localStorage.getItem('token'))
      }
    }
  }
  return (
    <>
      <Formik initialValues={values} validationSchema={validation} onSubmit={values => { appandUser(values) }}>
        {props => (<div>
          <Form>
            <div className="modal-body">
              {inputs.map((input, index) => {
                return (
                  <div key = {index} className="entranceInputDiv" onChange={() => { setExistUser(null); setErr(null) }}>
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
              {existUser && <div className="loginErrorMessage">user already exist</div>}
              {err && <div className="loginErrorMessage">Sorry, we encountered a problem, please try again later</div>}
            </div>
            <div className = "modal-footer">
              <Button className="button" variant="secondary" type="submit" disabled={props.isValid === false}>Submit</Button>
              <Button className="button" variant="secondary" onClick={handleClose}>Close</Button>
            </div>
          </Form>

        </div>
        )}
      </Formik>
    </>
  );
}


