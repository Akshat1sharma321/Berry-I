import UserClass from "./Userclass";
import User from "./User";
import React from "react";
class About extends React.Component {
    constructor(props) {
        super(props);
        console.log("parent cons called")
    }
    componentDidMount(){
        console.log("parent did mount called")
    }
    render(){
        console.log("parent render called")
        return (
          <div className="font-gilroyLight">
            <h1>About Us</h1>
            <p>
              This is a simple React application with a navigation bar and two
              pages. The About page displays a brief description of the
              application.
            </p>
            <User />
            <UserClass username="First" email="akshat.sharma" />
            <UserClass username="Second" email="akshat.sharma" />
            <UserClass username="Third" email="akshat.sharma" />
          </div>
        );
    }
}

// const About = () => {
 //for getting tailwind suggestion in vscode use ctrl + space   
// }
export default About;