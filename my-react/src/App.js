import React from 'react';

export default function App() {
  const[showAlert, setShowAlert] = React.useState(false)
  const handleDelete = ()=> {
      setIsSelected(true);
      setShowAlert(true)
  }
  const handleProceed = ()=> {
    setShowAlert(false)
    setIsSelected(false)
  }
    const [isSelected, setIsSelected] = React.useState(false);

  function Summary({ text }) {
    return (
      <React.Fragment>
        <h1>Summary is here</h1>
        <p>{text}</p>
      </React.Fragment>
    )
  }

  return (
    <div>
      <Summary text="Fragments help you avoid unnecessary HTML elements."></Summary>
      <p className = {isSelected ? 'active' : undefined}>Welcome to the page</p>
      {showAlert && (<div data-testid="alert" id="alert">
        <h2>Are you sure?</h2>
        <p>These changes can't be reverted!!</p>
        <button onClick={handleProceed}>Proceed</button>
      </div>
        )}
        {!showAlert && (<div>
        <p>Please Select a Button</p>
        <button onClick={handleDelete}>Delete</button>
        </div>
        )} 
        </div>
  );
}
