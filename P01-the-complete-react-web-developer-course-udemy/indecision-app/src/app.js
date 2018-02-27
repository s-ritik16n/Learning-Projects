import React from 'react';
import ReactDOM from 'react-dom';
import IndecisionApp from './components/IndecisionApp';

const Layout = (props) => {
    return (
        <div>
            <p>header</p>
            {props.children}
            <p>footer</p>
        </div>
    );
}


ReactDOM.render(<IndecisionApp />, document.getElementById("app"));

// const template = (
//     <div>
//         <h1>Page Title</h1>
//         <p>Page Title</p>
//     </div>
// );
// ReactDOM.render(
//     <Layout>
//         <p>this is inline</p>
//     </Layout>,
//     document.getElementById("app"));
