import { useState } from 'react';

function BucketForm(props) {
  const [input, setInput] = useState('');
  let [eagerness, setEagerness] = useState('');

  // Eagerness levels
  const eagernessLevel = ['high', 'medium', 'low'];

  // Handles the submit event when adding a bucket list item
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!eagerness) {
      eagerness = 'low';
    }

    props.onSubmit({
      id: Math.random(Math.floor() * 1000),
      text: input,
      eagerness: eagerness,
    });

    setInput('');
    setEagerness('');
  };

  // Handles input change in the text box
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  // Handle click event for setting eagerness
  const handleEagernessClick = (level) => {
    setEagerness(level); // Set the eagerness level based on the user's choice
  };

  // If "edit" prop exists, we render the update form instead of the add form
  return !props.edit ? (
    <div>
      <form className="bucket-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add to your bucket list"
          value={input}
          name="text"
          className="bucket-input"
          onChange={handleChange}
        />
        <div className="dropdown">
          <button className={`dropbtn ${eagerness}`}>
            {eagerness || 'Priority'}
          </button>
          <div className="dropdown-content">
            {/* Update eagerness onClick */}
            <p onClick={() => handleEagernessClick('high')}>Must do</p>
            <p onClick={() => handleEagernessClick('medium')}>Want to do</p>
            <p onClick={() => handleEagernessClick('low')}>Take it or leave it</p>
          </div>
        </div>
        <button className="bucket-button">Add bucket list item</button>
      </form>
    </div>
  ) : (
    <div>
      <h3>Update entry: {props.edit.value}</h3>
      <form className="bucket-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={props.edit.value}
          value={input}
          name="text"
          className="bucket-input"
          onChange={handleChange}
        />
        <div className="dropdown">
          <button className={`dropbtn ${eagerness}`}>
            {eagerness || 'Priority'}
          </button>
          <div className="dropdown-content">
            <p onClick={() => handleEagernessClick('high')}>Must do</p>
            <p onClick={() => handleEagernessClick('medium')}>Want to do</p>
            <p onClick={() => handleEagernessClick('low')}>Take it or leave it</p>
          </div>
        </div>
        <button className="bucket-button">Update</button>
      </form>
    </div>
  );
}

export default BucketForm;