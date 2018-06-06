import React, { Component } from 'react';
import Popup from 'react-popup';

class Prompt extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         value: this.props.defaultValue
      };
      this.onChange = (e) => this._onChange(e);
   }
   componentDidUpdate(prevProps, prevState) {
      if (prevState.value !== this.state.value) {
         this.props.onChange(this.state.value);
      }
   }
   _onChange(e) {
      let value = e.target.value;
      this.setState({value: value});
   }

   render() {
      return <input type="text" className="mm-popup__input" 
               value={this.state.value} onChange={this.onChange} />;
   }
}

class RadioPrompt extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         value: ""
      };
      this.onChange = (e) => this._onChange(e);
   }
   componentDidUpdate(prevProps, prevState) {
      if (prevState.value !== this.state.value) {
         this.props.onChange(this.state.value);
      }
   }
   _onChange(e) {
      let value = e.target.value;
      this.setState({value: value});
   }

   render() {
      return (
         <form part={ this.state.value } onChange={ this.onChange } >
            <label className="radio">
               <input type="radio" name="part" value="Sop"/>Sop</label>
            <label className="radio">
               <input type="radio" name="part" value="Alto"/>Alto</label>
            <label className="radio">
               <input type="radio" name="part" value="Tenor"/>Tenor</label>
            <label className="radio">
               <input type="radio" name="part" value="Bass"/>Bass</label>
         </form>
      );
   }
}

Popup.registerPlugin('addPerson', function (callback) {
   let nameValue = null;
   let partValue = null;
   let nameChange = function (value) {
      nameValue = value;
   };
   let partChange = function (value) {
      partValue = value;
   };

   this.create({
      title: '加入姓名',
      content: <div>
               <p>姓名：</p>
               <Prompt onChange={nameChange} value=""/>
               <br/>
               <p>聲部：</p>
               <RadioPrompt onChange={partChange} value="" />
            </div>,
      buttons: {
         left: ['cancel'],
         right: [{
            text: 'Save',
            className: 'success',
            action: function () {
               callback(nameValue, partValue);
               Popup.close();
            }
         }]
      }
   });
});

Popup.registerPlugin('addDate', function (callback) {
   let Value = null;
   let Change = function (value) {
      Value = value;
   };

   this.create({
      title: '加入日期',
      content: <div>
               <p>日期：</p>
               <Prompt onChange={Change} value=""/>
            </div>,
      buttons: {
         left: ['cancel'],
         right: [{
            text: 'Save',
            className: 'success',
            action: function () {
               callback(Value);
               Popup.close();
            }
         }]
      }
   });
});
