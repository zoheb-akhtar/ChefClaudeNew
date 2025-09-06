import React from 'react'
import "./item-card.css"


export default function ItemCard({item, index, removeItem, items, setItems}) {


  return (
    <div className="item">
        {item}
        <button onClick={() => removeItem(index)} className="delete-item-button">&#x2715;</button>
    </div>
  )
}
