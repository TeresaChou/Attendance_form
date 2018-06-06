import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import './popup';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { Button } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import Popup from 'react-popup';

function DateColumn(num, date) {
   return {
      dataField: "attend["+num+"]",
      text: date,
      sort: true,
      editor: {
         type: Type.CHECKBOX,
         value: "O:"
      },
      style: (cell, row, rowIndex, colIndex) => {
         if(cell === "") return { backgroundColor: "#FFE4E1" };
      }
   };
}

function sortPart(a, b, order) {
   let arr = ["Sop", "Alto", "Tenor", "Bass"];
   if(order === "asc")  return arr.indexOf(a) < arr.indexOf(b);
   else  return arr.indexOf(a) > arr.indexOf(b);
}

var columns = [{
   dataField: "id",
   text: "#"
},{
   dataField: "name",
   text: "姓名"
},{
   dataField: "part",
   text: "聲部",
   sort: true,
   sortFunc: sortPart
},
   DateColumn(0, "6/6"),
{
   dataField: "absent",
   text: "缺席",
   sort: true,
   editable: false
},{
   dataField: "rate",
   text: "出席率",
   sort: true,
   editable: false
}];

function memberAdd(member) {
   member.attend.push("");
   memberUpdate(member);
}

function memberUpdate(it) {
   it.absent = it.attend.filter( a => a === "" ).length;
   it.rate = 100*(1 - (it.absent / it.attend.length)) + "%";
}

function Member(number, name, part, dates) {
   this.id = number;
   this.name = name;
   this.part = part;
   this.attend = [];
   for(let i=0; i<dates; i++)  this.attend.push("");
   const it = this;
   this.absent = this.attend.filter( a => a === "" ).length;
   this.rate = 100*(1 - (this.absent / this.attend.length)) + "%";
}
   

class App extends Component {

   constructor(props) {
      super(props);
      this.state = {
         members: [],
         columns: columns,
         dates: 1
      };
      this.addPerson = this.addPerson.bind(this);
      this.enterName = this.enterName.bind(this);
      this.enterDate = this.enterDate.bind(this);
   }
   addPerson(name, part) {
      this.setState( prev => ({
         members: [...prev.members, new Member(prev.members.length+1, name, part, this.state.dates)]
      }));
   }
   addDate(date) {
      this.setState(prev => {
         let col = prev.columns;
         let mem = prev.members;
         col.splice(-2, 0, DateColumn(prev.dates, date));
         for(let m of mem) m.add();
         return {
            columns: col,
            members: mem,
            dates: prev.dates + 1
         };
      });
   }

   componentDidMount() {
      this.addPerson("Charlie Brown", "Bass");
      this.addPerson("Snoopy", "Tenor");
      this.addPerson("Schroeder", "Tenor");
      this.addPerson("Petty", "Sop");
      this.addPerson("Lucy", "Alto");
   }
   enterName() {
      var it = this;
      Popup.plugins().addPerson(function(name, part){ it.addPerson(name, part); });
   }
   enterDate() {
      var it = this;
      Popup.plugins().addDate(function(date){ it.addDate(date); });
   }

   render() {
      return (
         <div className="App">
            <h3>點名表</h3>
            <Button bsStyle="info" onClick={ this.enterDate } >加入日期</Button>
            <Button bsStyle="warning" onClick={ this.enterName } >加入姓名</Button>
            <BootstrapTable keyField="name" 
               data={ this.state.members } columns={ this.state.columns } 
               cellEdit={ cellEditFactory({ mode: "click", blurToSave: true, 
                  afterSaveCell: (o, n, row, c) => { memberUpdate(row); }
                  }) } />
         </div>
      );
  }
}

export default App;
