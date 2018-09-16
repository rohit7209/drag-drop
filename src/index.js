import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// class DragDrop extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   onDrop(e) {
//     e.preventDefault();
//     console.log('dropped', e);
//   }


//   render() {
//     return (
//       <div>

//         <div
//           onDrop={(e) => { this.onDrop(e, empId); }}
//           onDragOver={this.allowDrop}
//         >
//         </div>

//       </div>
//     );
//   }
// }

// DragDrop.propTypes = {};



ReactDOM.render(<App />, document.getElementById('root'));
