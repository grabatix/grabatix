import React, { useEffect, useState } from "react"
import { FaMoon, FaSun } from "react-icons/fa"
import logo from './logo.svg';
import './App.css';

function App() {
  const initTheme = typeof window !== 'undefined' && window.__theme ? window.__theme : null;
  const [theme, setTheme] = useState(initTheme)
  const ONCE = []
  useEffect(() => {
    setTheme(window.__theme)
    window.__onThemeChange = () => setTheme(window.__theme)
  }, ONCE)
  return (
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
          <div className="form-group">
            <label htmlFor="test">Test</label>
            <input type="text" name="test" placeholder="some value" defaultValue=""/>
          </div>
        </div>
        <div className="radio-group">
          <input
            name={`test-radio`}
            id={`test-radio`}
            type="radio"
            checked={false}
            onChange={()=>{}}
            className=""
          />
          <label htmlFor={`test-radio`}>{`Test Radio`}</label>
        </div>
        <div className="checkbox-group">
          <input
            type="checkbox"
            id={'checkbox-test'}
            name={'checkbox-test'}
            checked={true}
            onChange={()=>{}}
            className=""
          />
			    <label htmlFor={'checkbox-test'}>{`Test Checkbox`}</label>
        </div>
      </div>
    </div>
  );
}

export default App;
