import React, { useCallback, useEffect, useState } from 'react'
import "./your-recipes.css"
import TabButton from '../../components/YourRecipes/TabButton/TabButton'
import useRecipes from '../../hooks/useRecipes'
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage"
import api from "../../api/apiInstance.js"
import RecipeCard from '../../components/YourRecipes/RecipeCard/RecipeCard'
import toast from 'react-hot-toast'
import Modal from '../../components/Modal/Modal'
import Loader from '../../components/Loader/Loader'

export default function YourRecipes() {
  const [recipes, setRecipes, noRecipes, isLoading, setNoRecipes] = useRecipes();
  const [emptySearch, setEmptySearch] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");
  const [favoriteTab, setFavoriteTab] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [cooktimeFilter, setCooktimeFilter] = useState("");
  const [calsFilter, setCalsFilter] = useState("");

  useEffect(() => {
    const debounce = setTimeout(() => {
      handleSearch();
    }, 300);

    return () => {
      clearTimeout(debounce);
    };
  }, [searchQuery, currentStatus, favoriteTab, difficultyFilter, cooktimeFilter, calsFilter]);

  async function handleSearch() {
    setEmptySearch(false);
    setError("");
    
    try {
      const params = new URLSearchParams();
      
      if (searchQuery.trim()) {
        params.append("searchQuery", searchQuery.trim());
      }
      if (currentStatus) {
        params.append("status", currentStatus);
      }
      if (favoriteTab) {
        params.append("favorite", favoriteTab);
      }
      if (calsFilter) {
        params.append("calsPerServing", calsFilter);
      }
      if (cooktimeFilter) {
        params.append("cookTime", cooktimeFilter);
      }
      if (difficultyFilter) {
        params.append("difficulty", difficultyFilter);
      }

      const res = await api.get(`/recipes/get_all_recipes?${params.toString()}`);
      
      if (res.data.recipes.length === 0) {
        if (searchQuery.trim()) {
          setEmptySearch(true);
        } else {
          setNoRecipes(true);
        }
      } else {
        setNoRecipes(false);
        setEmptySearch(false);
      }

      setRecipes(res.data.recipes);
    } catch (error) {
      setError(error?.response?.data?.error || "Something went wrong. Please try again later.");
    }
  }

  const tabs = [{
    recipeCategory: "All",
    extraClassName: "all-tab-button"
  }, {
    recipeCategory: "Completed",
    extraClassName: "",
  }, 
  {recipeCategory: "In Progress",
    extraClassName: "",
  },
  {recipeCategory: "Cook Later",
    extraClassName: "cook-later"
  },
  {recipeCategory: "Favorites",
    extraClassName: "fav-tab-button"
  }];

  async function handleTabChange(index) { 
    setNoRecipes(false);
    setEmptySearch(false);
    setError("");
    setSelectedTab(index);
    
    setSearchQuery("");

    if (index === 1) {
      setCurrentStatus("completed");
      setFavoriteTab("");
    } else if (index === 2) {
      setCurrentStatus("in-progress");
      setFavoriteTab("");
    } else if (index === 3) {
      setCurrentStatus("cook-later");
      setFavoriteTab("");
    } else if (index === 4) {
      setCurrentStatus("");
      setFavoriteTab("true");
    } else {
      setCurrentStatus("");
      setFavoriteTab("");
    }
    
  }

  function deleteRecipe(idToDelete) {
    const filteredRecipes = recipes.filter((recipe) => {
      return recipe.id != idToDelete;
    });
    setRecipes(filteredRecipes);
  }

  function handleDifficultyChange(e) {
    setDifficultyFilter(e.target.value);
  }

  function handleCooktimeChange(e) {
    setCooktimeFilter(e.target.value);
  }

  function handleCalsChange(e) {
    setCalsFilter(e.target.value);

  }

  function handleSearchInputChange(e) {
    setSearchQuery(e.target.value);
  }

  if (isLoading) return <Loader />

  return (
    <div className="your-recipes-page-container">
      <p className="your-recipes-header">Your Recipes</p>

      <div className="tab-buttons-container">
        {tabs.map((tab, index) => {
          return <TabButton 
            key={index} 
            index={index} 
            setSelectedTab={setSelectedTab} 
            selectedTab={selectedTab} 
            recipeCategory={tab.recipeCategory} 
            extraClassName={tab.extraClassName} 
            handleTabChange={handleTabChange}
          />
        })}
      </div>
      
      <div className="search-and-filter-container">
        <div className="search-container">
          <img className="search-icon" src="/images/search.svg" alt="Search" />
          <input 
            value={searchQuery} 
            onChange={handleSearchInputChange} 
            className="search-bar-your-recipes" 
            placeholder="Search recipes (e.g. 'wrap', 'vegan')"
          />
        </div>

        <div className="filters-container">
          <div className="filter-group">
            <label className="dropdown-label" htmlFor="difficulty-filter">Difficulty</label>
            <select 
              onChange={handleDifficultyChange} 
              id="difficulty-filter" 
              className="recipe-filter-dropdown"
              value={difficultyFilter}
            >
              <option value="">All</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label className="dropdown-label" htmlFor="cook-time-filter">Cook Time</label>
            <select 
              onChange={handleCooktimeChange} 
              id="cook-time-filter" 
              className="recipe-filter-dropdown"
              value={cooktimeFilter}
            >
              <option value="">All</option>
              <option value="0-15">Under 15 min</option>
              <option value="15-30">15-30 min</option>
              <option value="30-60">30-60 min</option>
              <option value="60+">Over 1 hour</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="dropdown-label" htmlFor="cals-filter">Calories/Serving</label>
            <select 
              onChange={handleCalsChange} 
              id="cals-filter" 
              className="recipe-filter-dropdown"
              value={calsFilter}
            >
              <option value="">All</option>
              <option value="0-250">0-250 cal</option>
              <option value="250-500">250-500 cal</option>
              <option value="500-750">500-750 cal</option>
              <option value="750+">750+ cal</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="your-recipes-container">
        {recipes && recipes.map((recipe) => {
          return <RecipeCard key={recipe.id} recipe={recipe} deleteRecipeFromPage={deleteRecipe} />
        })}
      </div>
      
      <div className="special-cases-container">
        {error && <ErrorMessage error={error} bgColor="#fbfbf9"/>}
        {noRecipes && <p>No recipes here yet. Generate some to get started!</p>}
        {emptySearch && <p>No results for "{searchQuery}".</p>}
      </div>
    </div>
  )
}