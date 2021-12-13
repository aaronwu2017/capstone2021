import axios from 'axios';

export function signIn({ email, password }) {
/*
    await axios.post(
        'https://67zgy6fl0h.execute-api.us-east-2.amazonaws.com/default/login',
        { email: `${email}`,
        password: `${password}` }
    ).then(res => {
        if (res.data) {
            console.log('Sign in success')
            console.log(res.data)
            return res
        }else{
            alert('Sign in fail');
            console.log('login fail')
            return null
        }
    });
*/
    const user = "123@gmail.com" === email && "123" === password;
    console.log(user)
    if (user === false) throw new Error();
    return user;
  
}