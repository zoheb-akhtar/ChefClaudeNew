import React, { useState } from 'react'
import "./tab-button.css"

export default function TabButton({index, setSelectedTab, selectedTab, recipeCategory, extraClassName, handleTabChange}) {
  function handleTabClick() {
    setSelectedTab(index)
    handleTabChange(index);
  }

  return (
    <button onClick={handleTabClick} className={`tab-button ${extraClassName} ${selectedTab === index ? "active" : ""}`}>{recipeCategory}</button>
  )
}
