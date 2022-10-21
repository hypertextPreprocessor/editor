import React from 'react';
import * as ReactDOM from 'react-dom/client';
class RootElement extends React.Component{
    render(){
        return <h1>Hello,this is a besic demo of React.</h1>
    }
}

const root = ReactDOM.createRoot(document.querySelector('#app'));
root.render(<RootElement/>);