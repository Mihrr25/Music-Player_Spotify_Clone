import React, { useState , useContext, useEffect} from 'react';
import './loginStyle.css'; 
import { Link, useNavigate,redirectDocument, json} from 'react-router-dom'
import { mycontext } from "../context";
import bcrypt from 'bcryptjs';
import playlist from './playlist';
const saltRounds = 10;

const LoginForm = () => {
    const myctxt = useContext(mycontext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [incorrect, setInorrect] = useState(false);
    const [fuser, setFUser] = useState(true);
    async function comparePasswords(plainPassword, hashedPassword) {
        try {
            const match = await bcrypt.compare(plainPassword, hashedPassword);
            return match; // true or false
        } catch (error) {
            console.error('Error while comparing passwords:', error);
            throw error;
        }
    }

    const handleSubmit = (e) => {
        setInorrect(false)
        setFUser(true)
        e.preventDefault();
        (async function myf() {
            let x = await fetch('http://localhost:5000/api/fetchuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username })
            });
            let a = await x.json();
            if (!a) {
                setFUser(false);
            }
            else {
                let fin= await comparePasswords(password,a.password);
                if(!fin){
                    setInorrect(true);
                }
                else {
                    let myobj={
                        username:a.username,
                        playlist:a.playlist
                    }

                    await myctxt.setCurrentUID(username);
                    localStorage.setItem('sUser',JSON.stringify(myobj));
                    localStorage.setItem('isUser',"false");
                    window.location = "http://localhost:5173/";
                    // redirectDocument("http://localhost:5173/");
                }
            }

        })();
    };

    return (
        <div className="login">
            <h1>Login To World Of Music</h1>
            <form onSubmit={handleSubmit}>
                {!fuser ? (<p className='wrng'>Username Not Found</p>) : (<></>)}
                <input
                    type="text"
                    name="userName"
                    id="userName"
                    placeholder="Username"
                    autoComplete="on"
                    autoFocus
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                {incorrect ? (<p className='wrng'>Incorrect Password!!</p>) : (<></>)}
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="buttons">
                    <Link to="/" ><button type="button" className="back-btn">Back to Playlist</button></Link>
                    <button type="submit" className="submit-btn">Log In</button>
                    <Link to="/signin" ><button type="button" className="create-account-btn">Create an Account</button></Link>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
