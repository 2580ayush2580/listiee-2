import React, { useState} from 'react'
import Loader from '../components/Loader'
import { Col, Row,Button, Form} from 'react-bootstrap'
import { Link ,useHistory} from 'react-router-dom'
import axios from 'axios'
import NavBar from './NavBar'
const Register = () => {

    const history=useHistory()
    const [name, setname] = useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [alert, setalert] = useState(null)
    const [loading, setloading] = useState(false)
    const [success, setsuccess] = useState(null)

    const submitHandler=async (e)=>{
        e.preventDefault()
        if(password!==confirmPassword){
            setalert('Password do not match')
        }
        else{
        try{
            setloading(true)
            const {data}=await axios.post('https://listiee.herokuapp.com/api/users',{name,email,password})
            // const {data}=await axios.post('https://pure-river-17146.herokuapp.com/api/users',{name,email,password})
            setsuccess(data.success)
            data.success?localStorage.setItem('user',JSON.stringify(data.data)):localStorage.setItem('user','')
            setalert(data.message)
            setloading(false)
            if(data.success){
                setname('');
                setEmail('');
                setPassword('');
                setConfirmPassword();
                history.push('/home') 
            }
        }catch(e){
            setloading(false)
            setalert('Some error occured')
        }}
    }

    return (
        <>
        <NavBar></NavBar>
        <div className="wrapper">
            <div className="table">
                <div>
                    <h1>Sign Up</h1>
                </div>
                {success===true?<div className="inform success">{alert}</div>:null}
                {success===false?<div className="inform fail">{alert}</div>:null}
                {loading && <Loader></Loader>}
                <Form>
                    <Form.Group controlId='name'>
                        <Form.Control 
                            type='text' 
                            placeholder="Enter Name" 
                            value={name} 
                            onChange={(e)=>setname(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Control 
                            type='email' 
                            placeholder="Enter Email" 
                            value={email} 
                            onChange={(e)=>setEmail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Control 
                            type='password' 
                            placeholder="Enter password" 
                            value={password} 
                            onChange={(e)=>setPassword(e.target.value)}
                        >
                            
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='confirmpassword'>
                        <Form.Control 
                            type='password' 
                            placeholder="Renter password" 
                            value={confirmPassword} 
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                </Form>
                <Button type="submit" variant="primary" disabled={loading} onClick={submitHandler}>Sign Up</Button>
                <Row className="py-3">
                    <Col>
                        Already have an account ?{' '} 
                        <Link to='/login'>Login</Link>
                    </Col>
                </Row>
            </div>
        </div>
        </>          
    )
}

export default Register
