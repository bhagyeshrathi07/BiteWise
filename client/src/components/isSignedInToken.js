// Is signed in token logic
const isSignedInToken = () => {
    return localStorage.getItem('token') !== null;
}
export default isSignedInToken;