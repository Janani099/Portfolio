import React, { Component } from 'react';
import jsPDF from 'jspdf';


export default class PDF extends Component {
 constructor(props){
  super(props)
  this.state ={}
 }

 jsPdfGenerator=() => {
   var doc = new jsPDF('p','pt');

   doc.text(20,20,'/profile');
   doc.link(25, 50, 25, 25, {url: 'https://www.example.com/'});
   doc.save("generate.pdf");
 }
 render() {
  return (
  
  <button onClick = {this.jsPdfGenerator}>Generate PDF</button>
 
  )
}
}