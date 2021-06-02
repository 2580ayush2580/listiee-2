import React, { useState } from 'react'
import { Col, Row,Button, Form} from 'react-bootstrap'
import { Link ,useHistory} from 'react-router-dom'
import axios from 'axios'
import Loader from './Loader'
import NavBar from './NavBar'
const Login = () => {

    const history=useHistory()
    const [email, setemail] = useState(null)
    const [password, setpassword] = useState(null)
    const [alert, setalert] = useState(null)
    const [loading, setloading] = useState(null)
    const [success, setsuccess] = useState(null)


    const submitHandler=async (e)=>{
        e.preventDefault()
        try{
            setloading(true)
            const {data}=await axios.post('https://listiee.herokuapp.com/api/users/login',{email,password})
            // const {data}=await axios.post('https://pure-river-17146.herokuapp.com/api/users/login',{email,password})
            if(data.success)
                setsuccess(true)
            else
                setsuccess(false)
            data.success?localStorage.setItem('user',JSON.stringify(data.data)):localStorage.setItem('user','')
            setalert(data.message)
            setloading(false)
            if(data.success)
            {
                history.push('/home')
            }

        }catch(e){
            setloading(false)
            setalert('Some error occured')
        }
    }

    return (
        <>
        <NavBar></NavBar>
        <div className="wrapper">
            <div className="table">
                <div>
                    <h1>Login</h1>
                </div>
                {success===true?<div className="inform success">{alert}</div>:null}
                {success===false?<div className="inform fail">{alert}</div>:null}
                {loading && <Loader></Loader>}
                <Form>
                    <Form.Group controlId='email' >
                        <Form.Control 
                            type='email' 
                            placeholder="Enter Email" 
                            value={email} 
                            onChange={(e)=>setemail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Control 
                            type='password' 
                            placeholder="Enter password" 
                            value={password} 
                            onChange={(e)=>setpassword(e.target.value)}
                        >
                            
                        </Form.Control>
                    </Form.Group>
                </Form>
                <Button type="submit" variant="primary" disabled={loading} onClick={submitHandler}>Sign In</Button>
                <Row className="py-3">
                    <Col>
                        New Customer ?{' '} 
                        <Link to='/register'>Register</Link>
                    </Col>
                </Row>
            </div>
        </div>
        </>
    )
}

export default Login
