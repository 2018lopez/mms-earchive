import {useState, useEffect} from 'react'
import axios  from 'axios'
import { useNavigate, useParams } from 'react-router-dom'


const UpdateOrder = () =>{    

    const [status, setStatus] = useState('')
    
    const navigate = useNavigate()
    const {id} = useParams()
    console.log(id+'first')

    const editOrder = async (e) =>{
        console.log(status +'t1')
        e.preventDefault()
        await axios.put(`http://localhost:3001/api/orders/${id}`,{
            status: status
        })
        console.log(status +'t2')
        navigate('/Stall')
    
    }

   useEffect(() => {
        getOrderById()

    }, [])

    const getOrderById = async () =>{

        const res = await axios.get(`http://localhost:3001/api/orders/${id}`)
        
        setStatus(res.data.status)   
        console.log(status+'status b')     
    }

    return (
        <div>
            {console.log(id, status +'ori')}
            <form onSubmit={ editOrder}>
                <div className="field">
                    <label className="label">Status</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder={status}
                        value={ status }
                        onChange={ (e) => setStatus(e.target.value) }
                    />
                </div>
                
 
                <div className="field">
                    <button className="button is-primary">Update</button>
                </div>
            </form>
        </div>
    )

}

export default UpdateOrder