import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);
     this.state = {
       HomeTown: "Dharamshala,Himachal",
       Location1: "HomeTown",
       count: 0,
     };
     console.log(this.props.username + " child cons called")
  }

 componentDidMount(){
   console.log(this.props.username + " child did mount called");
   //this.setState({Location1: "New Location"})
 }
  render() {
     const { username } = this.props;
    console.log(username + " child render called");
    return (
      <div className="abt-c1">
        <button onClick={()=>{
          this.setState({
             count : this.state.count+1,

          })
         
        }}>count : {this.state.count}</button>
        <h2>Hometown : {this.state.count}</h2>
        <h2>Welcome {this.props.username}!</h2>
        <p>Your email address is {this.props.email}</p>
      </div>
    );
  }
}

export default UserClass;
