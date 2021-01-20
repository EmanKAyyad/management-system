import React, { useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { useRef } from 'react/cjs/react.development';
import moment from 'moment';

const EditVehicleModal = (props) => {
    let targetVehicle;
    let formikRef = useRef(null);

    useEffect(() => {
        if (props.vehicleIdToEdit && props.vehicles && props.vehicles.length > 0) {
            targetVehicle = props.vehicles.find(z => z.id === props.vehicleIdToEdit);
            updateInitialValues(targetVehicle);
        }
    }, [props.vehicles, props.vehicleIdToEdit]);

    const updateInitialValues = (targetVehicle) => {
        formikRef.current.setFieldValue("name", targetVehicle.name)
        formikRef.current.setFieldValue("date", moment(targetVehicle.date).format("YYYY-MM-DD"))
        formikRef.current.setFieldValue("time", moment(targetVehicle.time, "LT").format("kk:mm"))
        formikRef.current.setFieldValue("total_km", targetVehicle.total_km)
        formikRef.current.setFieldValue("volume", targetVehicle.volume)
    }


    const editVehicle = (values) => {
        const updatedTargetVehicle = {...targetVehicle, ...values };
        updatedTargetVehicle.date = moment(updatedTargetVehicle.date).format("M/DD/YYYY")
        props.updateSingleVehicle(updatedTargetVehicle);
        console.log(updatedTargetVehicle)
        document.getElementById("close-modal").click();

    }

    const SignupSchema = Yup.object().shape({
        name: Yup.string().required('Vehicle Type is required'),
        date: Yup.date().required('Date is Required'),
        total_km: Yup.number().positive('Odometer should be a positive number').required(),
        volume: Yup.number().integer('Volume should be an integer').positive('Volume should be a positive number').required()
    });

    return <Formik
        initialValues={{
            name: '',
            date: '',
            time: '00:00',
            total_km: '',
            volume: '',
            fuelType: '',
            fillingType: ''
        }}
        innerRef={formikRef}
        onSubmit={(values) => { editVehicle(values) }}
        validationSchema={SignupSchema}
    >
        {({ ...props }) => (
            <Form>
                <div className="modal fade ms-modal" id="edit-vehicle-modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit Fuel Entry</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">

                                <div className="row">
                                    <div className="col-12">
                                        <label htmlFor="name">Vehicle</label>
                                        <Field id="vehinamecle" as="select" name="name" placeholder="name" >
                                            <option value="Toyota Xenia">Toyota Xenia</option>
                                            <option value="Toyota Avanza">Toyota Avanza</option>
                                            <option value="Toyota Corolla">Toyota Corolla</option>
                                        </Field>
                                        {props.errors.name && props.touched.name ? (<span className="error">{props.errors.name}</span>) : null}
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="StartDate">Start Date</label>
                                        <div className="row">
                                            <div className="col-6 mb-0">
                                                <Field type="date" id="date" name="date" />
                                                {props.errors.date && props.touched.date ? (<span className="error">{props.errors.date}</span>) : null}
                                            </div>
                                            <div className="col-6 mb-0">
                                                <Field type="time" id="time" name="time" />
                                                {props.errors.time && props.touched.time ? (<span className="error">{props.errors.time}</span>) : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="total_km">odometer</label>
                                        <Field type="number" id="total_km" name="total_km" />
                                        {props.errors.total_km && props.touched.total_km ? (<span className="error">{props.errors.total_km}</span>) : null}
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="volume">volume</label>
                                        <Field type="number" id="volume" name="volume" />
                                        {props.errors.volume && props.touched.volume ? (<span className="error">{props.errors.volume}</span>) : null}
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="fuelType">Fuel Type (optional)</label>
                                        <Field id="fuelType" as="select" name="fuelType" placeholder="fuelType" >
                                            <option value="option1">option1</option>
                                            <option value="option2">option2</option>
                                            <option value="option3">option3</option>
                                        </Field>
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="fillingType">Filling Type (optional)</label>
                                        <Field id="fillingType" as="select" name="fillingType" placeholder="fillingType" >
                                            <option value="option1">option1</option>
                                            <option value="option2">option2</option>
                                            <option value="option3">option3</option>
                                        </Field>
                                    </div>

                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" id="close-modal" className="ms-secondary-button" data-dismiss="modal">Cancel</button>
                                <button type="submit" className="ms-primary-button">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        )}
    </Formik>
}

const mapStateToProps = state => {
    return {
        vehicles: state.vehicles,
        vehicleIdToEdit: state.vehicleIdToEdit
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateSingleVehicle: (updatedVehicle) => dispatch({ type: 'UPDATE_SINGLE_VEHICLE', updatedVehicle: updatedVehicle })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditVehicleModal);