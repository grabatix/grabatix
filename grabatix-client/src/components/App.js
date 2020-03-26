import React, { useState, useContext } from "react"
import { LiveAnnouncer } from "react-aria-live";
import { AppContext } from "../providers/AppProvider"
import AdminLayout from "../layouts/admin"

import DarkSwitcher from "./DarkSwitcher"
import Button from "./Button"
import InputGroup from "./FormComponents/InputGroup"
import CheckBoxGroup from "./FormComponents/CheckBoxGroup"
import RadioGroup from "./FormComponents/RadioGroup"
import TextAreaGroup from "./FormComponents/TextAreaGroup"
import SubmitButton from "./FormComponents/SubmitButton"
import './App.css';

import FlexContainer from "./FlexContainer";

const App = () => {
  const context = useContext(AppContext);
  const [isLoggedIn, setLogin] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [checked, setChecked] = useState(false);
  const [radioId, setRadioId] = useState('');
  const handleInputChange = e => {
    if (e.target.type === 'checkbox') {
      setChecked(e.target.checked)
    } else if (e.target.type === 'radio') {
      setRadioId(e.target.id)
    } else if (e.target.type === 'textarea') { 
      setTextareaValue(e.target.value)
    } else {
      setInputValue(e.target.value)
    }
  }

  const setAccountOpen = async () => true
  const setReportsOpen = async () => true
  return (
    <LiveAnnouncer>
      <div className="App">
        <div className="site-content">
          <AdminLayout 
            isLoggedIn={isLoggedIn} 
            setLoginStatus={setLogin} 
            setAccountOpen={setAccountOpen} 
            setReportsOpen={setReportsOpen}>
          </AdminLayout>
        </div>
      </div>
    </LiveAnnouncer>
  );
}

export default App;
