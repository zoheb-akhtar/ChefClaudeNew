import React from 'react'
import ItemCard from '../ItemCard/ItemCard'
import "./form-input.css"

export default function FormInput({inputLabel, placeholder, currentItem, setItems, setCurrentItem, items, localStorageKey}) {

  function addItem() {
    if (currentItem.trim() != "") {
      setItems(prevItems => {
        const updatedItems = [...prevItems, currentItem];
        localStorage.setItem(localStorageKey, JSON.stringify(updatedItems));
        return updatedItems;
      });
      
      setCurrentItem("")
    }

  }

  function removeItem(removeIndex) {
    const filteredItems = items.filter((item, index) => {
      return index != removeIndex;
    })

    setItems(filteredItems)
    localStorage.setItem(localStorageKey, JSON.stringify(filteredItems))
  }

  return (
    <div className="form-group">
      <p className="form-input-label">{inputLabel}</p>
      <div className="form-input-container">
      <input value={currentItem} onChange={(e) => setCurrentItem(e.target.value)} className="generate-form-input" placeholder={placeholder}></input>
      <button onClick={addItem}className="add-item-button">+</button>
      </div>
    
      <div className="items-list-container">
        {items.map((item, index) => {
          return <ItemCard key={index} item={item} index={index} removeItem={removeItem} items={items} setItems={setItems}/>
        })}
      </div>
      </div>
  )
}
