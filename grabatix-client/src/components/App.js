import React, { useEffect, useState, useContext } from "react"
import { LiveAnnouncer } from "react-aria-live";
import { AppContext } from "../providers/AppProvider"
import { FaMoon, FaSun } from "react-icons/fa"
import InputGroup from "./FormComponents/InputGroup"
import CheckBoxGroup from "./FormComponents/CheckBoxGroup"
import RadioGroup from "./FormComponents/RadioGroup"
import TextAreaGroup from "./FormComponents/TextAreaGroup"
import './App.css';

const supportsDarkMode = () =>
    window && window.matchMedia("(prefers-color-scheme: dark)").matches === true

const App = () => {
  const context = useContext(AppContext);
  let initTheme = typeof window !== 'undefined' && window.__theme ? window.__theme : null;
  if ( !initTheme ) {
    initTheme = supportsDarkMode() ? "dark" : "light";
  }
  const [theme, setTheme] = useState(initTheme)
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
  const ONCE = []
  useEffect(() => {
    setTheme(window.__theme)
    window.__onThemeChange = () => setTheme(window.__theme)
  }, ONCE)
  return (
    <LiveAnnouncer>
      <div className="App">
        <div className="site-content">
          <h1>GRABATIX</h1>
          <button className="box dark" onClick={()=>{}}>Click Me</button>
          <a href="#">Link</a>
          <div
            className="dark-switcher"
            onClick={e => window && window.__setPreferredTheme(theme === "dark" ? "light" : "dark")}
            aria-label={
              theme === "dark"
                ? "Click to Disable NightMode"
                : "Click to Enable Night Mode"
            }
            title={
              theme === "dark"
              ? "Disable Night Mode"
              : "Enable Night Mode"
            }
            tabIndex={0}
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </div>
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
          />
          <RadioGroup
            id={`test-radio2`}
            name="test-group"
            checked={radioId === `test-radio2`}
            handleInputChange={handleInputChange}
            label="Test Radio Button 2"
          />
          <CheckBoxGroup
            id={'checkbox-test'}
            checked={checked}
            handleInputChange={handleInputChange}
            label="Test Checkbox"
          />
        </div>
      </div>
    </LiveAnnouncer>
  );
}

export default App;
