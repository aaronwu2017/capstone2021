import axios from 'axios';

export async function signIn({ email, password }) {
    return await axios.post(
        'https://67zgy6fl0h.execute-api.us-east-2.amazonaws.com/default/login',
        { email: `${email}`,
        password: `${password}` }
    ).then(res => {
        if (res.data) {
            return true
        }else{
            alert('Sign in fail');
            return null
        }
    })
}