import { registerWithEmailAndPassword, signInWithGoogle } from "../firebase"
function Auth() {
    return (
        <h1 style={{ cursor: "pointer" }}>
            <span onClick={signInWithGoogle}>login</span> or <span onClick={registerWithEmailAndPassword}>register</span>
        </h1>
    )
}

export default Auth