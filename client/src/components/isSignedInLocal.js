// Is Signed in logic
const isSignedInLocal = () => {
    var isSignedIn = false;
    if (localStorage.getItem('token')) {
        isSignedIn = true;
    }
    return isSignedIn;
}