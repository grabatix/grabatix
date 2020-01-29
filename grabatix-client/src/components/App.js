import React, { useState, useContext } from "react"
import { LiveAnnouncer } from "react-aria-live";
import { AppContext } from "../providers/AppProvider"
import DarkSwitcher from "./DarkSwitcher"
import Button from "./Button"
import InputGroup from "./FormComponents/InputGroup"
import CheckBoxGroup from "./FormComponents/CheckBoxGroup"
import RadioGroup from "./FormComponents/RadioGroup"
import TextAreaGroup from "./FormComponents/TextAreaGroup"
import SubmitButton from "./FormComponents/SubmitButton"
import './App.css';

const App = () => {
  const context = useContext(AppContext);
  
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
  
  return (
    <LiveAnnouncer>
      <div className="App">
        <div className="site-content">
          <h1>GRABATIX</h1>
          <Button classNames="box dark" innerText="Click Me"/>
          <Button classNames="box light" innerText="$5"/>
          <a href="#">Link</a>
          <DarkSwitcher/>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <InputGroup
              id="input-test"
              label="Test Input"
              required={false}
              type="text"
              maxLength={120}
              placeholder="Try me"
              disabled={false}
              validation={`.*`}
              handleInputChange={handleInputChange}
              value={inputValue}
              error={''}
            />
          </div>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <TextAreaGroup 
              id="textarea-test"
              label="Test Textarea"
              required={false}
              maxLength={240}
              placeholder="Write Here"
              disabled={false}
              handleInputChange={handleInputChange}
              value={textareaValue}
              error={''}
            />
          </div>
          <RadioGroup
            id={`test-radio1`}
            name="test-group"
            checked={radioId === `test-radio1`}
            handleInputChange={handleInputChange}
            label="Test Radio Button 1"
            disabled={false}
          />
          <RadioGroup
            id={`test-radio2`}
            name="test-group"
            checked={radioId === `test-radio2`}
            handleInputChange={handleInputChange}
            label="Test Radio Button 2"
            disabled={false}
          />
          <CheckBoxGroup
            id={'checkbox-test'}
            checked={checked}
            handleInputChange={handleInputChange}
            label="Test Checkbox"
            disabled={false}
          />
          <SubmitButton handleClick={(e)=>{ e.preventDefault(); console.log("Submit Clicked");}}/>
        </div>
      </div>
    </LiveAnnouncer>
  );
}

export default App;
