import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { getItem } from './../../service/func';
import { Button } from "react-bootstrap"
import Paypal from './Paypal'

const Pay = ({ total, handleClose }) => {
    const [paypal, setPaypal] = useState(null);
    const [streetsList, setStreetsList] = useState([]);
    useEffect(async () => {
        const streetsList1 = await getItem("/streets");
        setStreetsList(streetsList1);
    }, [])
    let values = {
        street: '',
        numHouse: 1
    }
    const validation = yup.object({
        numHouse: yup.number().required('Please enter num house')
    })
    return (
        <div>
            <Formik initialValues={values} validationSchema={validation} onSubmit={() => { setPaypal(1) }}>
                {props => (
                    <div>
                        <Form>
                            <div className="modal-body">
                                <div className="entranceInputDiv">
                                    <div className="entranceInputDivLabel">
                                        <label className="entranceLabel">Street:</label>
                                    </div>
                                    <div className="entranceInputDivInput">
                                        <Field name="Designation" className="entranceInput" as="select">
                                            {streetsList.map((street, index) => {
                                                return (
                                                    <option key = {index}>{street.name}</option>
                                                )
                                            })}
                                        </Field>
                                    </div>
                                </div>
                                <br />
                                <div className="entranceInputDiv">
                                    <div className="entranceInputDivLabel">
                                        <label className="entranceLabel">num house: </label>
                                    </div>
                                    <div className="entranceInputDivInput" onChange = {()=>{setPaypal(null)}}>
                                        <Field name="numHouse" type="number" min='1' className="entranceInput"></Field>
                                    </div>
                                    <div className="entranceErrorMessage">
                                        <ErrorMessage name="numHouse"></ErrorMessage>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                {paypal && <Paypal total={total} />}
                                <Button className="button" variant="secondary" type="submit" disabled={props.isValid === false}>Submit</Button>
                                <Button className="button" variant="secondary" onClick={()=>{handleClose(); setPaypal(null)}}>Close</Button> 
                            </div>
                        </Form>
                    </div>
                )}
            </Formik>
        </div>
    );
}
export default Pay;