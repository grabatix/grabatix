/** @format */

;<AttendantLayout
  isLoggedIn={isLoggedIn}
  setLoginStatus={setLogin}
  setAccountOpen={setAccountOpen}
>
  <LoginModal
    type="login"
    isLoggedIn={isLoggedIn}
    isOpen={isOpen}
    setOpen={handleOpenStatus}
  />
  <h1>GRABATIX</h1>
  <Button
    classNames="box dark"
    innerText="Click Me"
    handleClick={handleOpenStatus}
  />
  <Button classNames="box light" innerText="$5" handleClick={() => {}} />
  <a href="#">Link</a>
  <DarkSwitcher />
  <div style={{ display: `flex`, flexDirection: `row` }}>
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
      error={``}
    />
  </div>
  <div style={{ display: `flex`, flexDirection: `row` }}>
    <TextAreaGroup
      id="textarea-test"
      label="Test Textarea"
      required={false}
      maxLength={240}
      placeholder="Write Here"
      disabled={false}
      handleInputChange={handleInputChange}
      value={textareaValue}
      error={``}
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
    id={`checkbox-test`}
    checked={checked}
    handleInputChange={handleInputChange}
    label="Test Checkbox"
    disabled={false}
  />
  <SubmitButton
    classNames="large"
    handleClick={e => {
      e.preventDefault()
      console.log(`Submit Clicked`)
    }}
  />
</AttendantLayout>
