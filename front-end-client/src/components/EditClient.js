import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function EditClient(props) {

    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [clientInput, setClient] = useState([]);
    const [errorInput, setError] = useState([]);

    useEffect(() => {
        
        const client_id = props.match.params.id;
        axios.get(`/api/edit-client/${client_id}`).then( res => {

            if(res.data.status === 200)
            {
                setClient(res.data.client);
                setLoading(false);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                history.push('/client');
            }
        });

    }, [history]);

    const handleInput = (e) => {
        e.persist();
        setClient({...clientInput, [e.target.name]: e.target.value });
    }

    const updateClient = (e) => {
        e.preventDefault();
        
        const client_id = props.match.params.id;
        // const data = clientInput;
        const data = {
            name: clientInput.name,
            direction: clientInput.direction,
            city: clientInput.city,
        }

        axios.put(`/api/update-client/${client_id}`, data).then(res=>{
            if(res.data.status === 200)
            {
                swal("Success",res.data.message,"success");
                setError([]);
                history.push('/clients');
            }
            else if(res.data.status === 422)
            {
                swal("All fields are mandetory","","error");
                setError(res.data.validationErrors);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                history.push('/clients');
            }
        });
    }

    if(loading)
    {
        return <h4>Loading Edit Client Data...</h4>
    }
    
    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Edit Clients 
                                    <Link to={'/clients'} className="btn btn-danger btn-sm float-end"> BACK</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <form onSubmit={updateClient} >
                                    <div className="form-group mb-3">
                                        <label>Client Name</label>
                                        <input type="text" name="name" onChange={handleInput} value={clientInput.name} className="form-control" />
                                        <span className="text-danger">{errorInput.name}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Client Direccion</label>
                                        <input type="text" name="direction" onChange={handleInput} value={clientInput.direction}  className="form-control" />
                                        <span className="text-danger">{errorInput.direction}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Client Ciudad</label>
                                        <input type="text" name="city" onChange={handleInput} value={clientInput.city}  className="form-control" />
                                        <span className="text-danger">{errorInput.city}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" id="updatebtn" className="btn btn-primary">Update Client</button>
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

export default EditClient;