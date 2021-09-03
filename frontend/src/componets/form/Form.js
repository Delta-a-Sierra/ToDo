import "./style.css"
import { useState } from "react";

const Form = () => {
    const [password, setPassword] = useState("")
    const [userName, setUserName] = useState("")


    const changePassword = (e) => {
        setPassword(e.target.value)
    }

    const changeUserName = (e) => {
        setUserName(e.target.value)
    }


    return ( 
        <div>
            <form>
                <label>
                    <input onChange={changeUserName} value={userName} placeholder="Username" type="text" /> 
                </label>
                <label>
                    <input onChange={changePassword}value={password} placeholder="Password" type="password" /> 

                </label>
        
            </form>

        </div>
     );
}
 
export default Form;