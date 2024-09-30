import { useState } from 'react';
import BucketForm from './BucketForm';

function Bucket(props) {
  const [edit, setEdit] = useState({
    id: null,
    value: '',
    eagerness: '',
  });

  console.log(props.bucket);

  const submitUpdate = (value) => {
    props.editBucketItem(edit.id, value);
    setEdit({
      id: null,
      value: '',
      eagerness: '',
    });
  };

  // If the user is attempting to edit an item, render the bucket form with the edit variable passed as a prop
  if (edit.id) {
    return <BucketForm edit={edit} onSubmit={submitUpdate} />;
  }

  return props.bucket.map((item, index) => (

    <div className={`bucket-row ${item.isComplete ? 'complete' : ''} ${item.eagerness}` } key={index}>

      {/* Mark as complete or incomplete when clicked */}
      <div onClick={() => props.completeBucketItem(item.id)}>
      {item.text}
      </div>
      <div className="icons">
        {/* Set edit state when clicking the edit icon */}
        <p onClick={() => setEdit({ id: item.id, value: item.text, eagerness: item.eagerness })}> ✏️</p>

        {/* Invoke the removeBucketItem method when clicking the delete icon */}
        <p onClick={() => props.removeBucketItem(item.id)}> 🗑️</p>
      </div>
    </div>
  ));
}

export default Bucket;
