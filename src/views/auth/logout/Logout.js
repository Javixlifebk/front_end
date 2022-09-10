import React from "react"

class Logout extends React.Component {

    

    componentDidMount() {
       this.logout()

    }

    logout() {
        localStorage.clear();    
        window.location='/auth/login'
    }
 
    render(){
        
    return(

        <div>{this.logout()}</div>
       
    )

    }   

}
export default Logout
