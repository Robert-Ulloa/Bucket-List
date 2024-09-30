import { useState } from 'react';
import BucketForm from './BucketForm';
import Bucket from './Bucket';

function BucketList() {
  const [bucket, setBucket] = useState([]);

  // Function to add a bucket list item
  const addBucketItem = (item) => {
    // if the text is not empty or doesn't contain only whitespace
    if (!item.text || /^\s*$/.test(item.text)) {
      return;
    }
    // Add the new item to the bucket array and update state
    const newBucket = [item, ...bucket];
    setBucket(newBucket);
  };

  // Function to mark bucket list item as complete
  const completeBucketItem = (id) => {
    // If the ID passed to this function matches the ID of the item that was clicked, mark it as complete
    let updatedBucket = bucket.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isComplete: !item.isComplete, // Toggle the completion status
        };
      }
      return item;
    });

    setBucket(updatedBucket);
  };

  // Function to remove bucket list item and update state
  const removeBucketItem = (id) => {
    const updatedBucket = bucket.filter((item) => item.id !== id);
    setBucket(updatedBucket);
  };

  // Function to edit the bucket list item
  const editBucketItem = (itemId, newValue) => {
    // Make sure that the value isn't empty
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    // Map through the list of items and update the item with the matching ID
    setBucket((prev) =>
      prev.map((item) => (item.id === itemId ? newValue : item))
    );
  };

  return (
    <div>
      <h1>What is on your bucket list?</h1>
      <BucketForm onSubmit={addBucketItem} />
      <Bucket
        bucket={bucket}
        completeBucketItem={completeBucketItem}
        removeBucketItem={removeBucketItem}
        editBucketItem={editBucketItem}
      />
    </div>
  );
}

export default BucketList;