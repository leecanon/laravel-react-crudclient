import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function AddClient() {

    const history = useHistory();
    const [clientInput, setClient] = useState({
        name: '',
        direction: '',
        city: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setClient({...clientInput, [e.target.name]: e.target.value })
    }

    const saveClient = (e) => {
        e.preventDefault();
        
        const data = {
            name:clientInput.name,
            direction:clientInput.direction,
            city:clientInput.city,
        }

        axios.post(`/api/add-client`, data).then(res => {

            if(res.data.status === 200)
            {
                swal("Success!",res.data.message,"success");
                setClient({
                    name: '',
                    direction: '',
                    city: '',
                    error_list: [],
                });
                history.push('/clients');
            }
            else if(res.data.status === 422)
            {
                setClient({...clientInput, error_list: res.data.validate_err });
            }
        });
    }

    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Add Clients 
                                    <Link to={'/'} className="btn btn-danger btn-sm float-end"> BACK</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <form onSubmit={saveClient} >
                                    <div className="form-group mb-3">
                                        <label>Client Name</label>
                                        <input type="text" name="name" onChange={handleInput} value={clientInput.name} className="form-control" />
                                        <span className="text-danger">{clientInput.error_list.name}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Client Direccion</label>
                                        <input type="text" name="direction" onChange={handleInput} value={clientInput.direction}  className="form-control" />
                                        <span className="text-danger">{clientInput.error_list.direction}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Client Ciudad</label>
                                        <input type="text" name="city" onChange={handleInput} value={clientInput.city}  className="form-control" />
                                        <span className="text-danger">{clientInput.error_list.city}</span>
                                    </div>
                                
                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Save Client</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default AddClient;