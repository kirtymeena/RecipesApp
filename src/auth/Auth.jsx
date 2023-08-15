import { useState } from "react"
import supabase from "../superBaseSetup"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch } from "react-redux";
import { getUserData, showAuth } from "../store/features/authSlice";
import { useNavigate } from "react-router-dom";

function Auth() {
    const [showDisplayName, setShowDisplayName] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    })

    async function signInWithEmail() {
        console.log(formData)
        try {
            const { data, error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        name: formData.name
                    }
                }
            })
            console.log(data, error)
            if(data){
                alert("Account has been created!")
            }
        }
        catch (err) {
            alert(err)
        }
    }

    async function login() {
        console.log(formData)

        const { data, error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
        })
        console.log(data, error)
        if (data.user) {
            dispatch(getUserData(data.user))
            navigate("/")
            dispatch(showAuth({ howAuthForm: false }))
            return "Logged in successfully"
        }

        alert(error.message)


    }

    const handleFormData = (e) => {
        const data = { ...formData, [e.target.name]: e.target.value }
        setFormData(data)
    }


    return (
        <div className="auth__wrapper">
            <form className="auth__form">
                <div>
                    <p className="form__header">{showDisplayName ? "Register" : "Login"} to Fooders</p>
                </div>
                <TextField label="Email" required name="email" id="outlined-size-normal" onChange={handleFormData} />
                <TextField label="Password" required name="password" id="outlined-size-normal" onChange={handleFormData} />

                {
                    showDisplayName &&
                    <TextField label="Display Name" required name="name" id="outlined-size-normal" onChange={handleFormData} />
                }
                <div>
                    {
                        !showDisplayName ?
                            <small>Don't have an account? <span className="form__link" onClick={() => setShowDisplayName(true)}>Register</span></small>

                            :
                            <small>Already has an account? <span className="form__link" onClick={() => setShowDisplayName(false)}>Login</span></small>
                    }
                </div>
                {
                    showDisplayName ?
                        <Button variant="contained" onClick={signInWithEmail}>Register</Button>
                        :
                        <Button variant="contained" onClick={login}>Login</Button>
                }
            </form>
        </div>
    )
}

export default Auth