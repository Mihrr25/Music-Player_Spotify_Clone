import React, { useState , useContext, useEffect} from 'react';
import './loginStyle.css'; // Assuming you have a separate CSS file for styling
import { Link, useNavigate,redirectDocument, json} from 'react-router-dom'
import { mycontext } from "../context";
import bcrypt from 'bcryptjs';
import playlist from './playlist';
const saltRounds = 10;

const SigninForm = () => {
    const myctxt = useContext(mycontext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [notMatch, setNotMatch] = useState(false);
    const [fuser, setFUser] = useState(true);
    async function hashPassword(pswd) {
        try {
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(pswd, salt);
            return hashedPassword;
        } catch (error) {
            console.error('Error while hashing password:', error);
            throw error;
        }
    }

    async function handleChangeinUser(e) {
        let currentId = e.target.value;
        setUsername(currentId);
        try {let response = await fetch('http://localhost:5000/api/fetchuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: currentId })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            let data = await response.json();
            console.log(data);
            if (data) {
                setFUser(false);
                console.log(data);
            } else {
                setFUser(true);
            }
        } catch (error) {
        }
    }
    useEffect(() => {
        if(cPassword!=password){
            setNotMatch(true)
        }
        else{
            setNotMatch(false);
        }
      
    }, [password,cPassword])
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!fuser || notMatch) return;
    
        console.log("fetching..");
    
        try {
            let newpas = await hashPassword(password);
            console.log(newpas);
    
            let x = await fetch('http://localhost:5000/api/createuser', {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, newpas })
            });
    
            let a = await x.json();
            console.log("creating");
    
            let myobj = {
                username: a.username,
                playlist: a.playlist
            };
    
            await myctxt.setCurrentUID(username);
            localStorage.setItem('sUser', JSON.stringify(myobj));
            window.location = "http://localhost:5173/";
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    };
    

    return (
        <div className="login">
            <h1>Create an account To start your voyage</h1>
            <form onSubmit={handleSubmit}>
                {!fuser ? (<p className='wrng'>Username Already exists...</p>) : (<></>)}
                <input
                    type="text"
                    name="userName"
                    id="userName"
                    placeholder="Username"
                    autoComplete="on"
                    autoFocus
                    required
                    value={username}
                    onChange={handleChangeinUser}
                />
                <input
                    type="password"
                    name="password"
                    id="Password"
                    placeholder="Password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={ (e) =>  setPassword(e.target.value) }
                    />
                    {notMatch ? (<p className='wrng'>Password Not Matched!!</p>) : (<></>)}
                <input
                    type="password"
                    name="cPassword"
                    id="cPassword"
                    placeholder="Confirm Password"
                    autoComplete="current-password"
                    required
                    value={cPassword}
                    onChange={ (e) =>  setCPassword(e.target.value) }
                />
                <div className="buttons">
                    <Link to="/" ><button type="button" className="back-btn">Back to Playlist</button></Link>
                    <button type="submit" className="submit-btn">Create An Account</button>
                    <Link to="/Login" ><button type="button" className="create-account-btn">Log In</button></Link>
                </div>
            </form>
        </div>
    );
};

export default SigninForm;
