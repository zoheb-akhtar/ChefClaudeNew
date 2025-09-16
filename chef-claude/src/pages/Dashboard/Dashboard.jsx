import React, { useEffect, useState } from 'react'
import api from "../../api/apiInstance.js"
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx';
import useCurrentUser from '../../hooks/useCurrentUser.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import getDifficultyCardStyle from '../../utils/getDifficultyCardStyle.js';
import getFavoriteDifficulty from '../../utils/getFavoriteDifficulty.js';
import "./dashboard.css"
import ActiveRecipeCard from '../../components/Dashboard/ActiveRecipesCard/ActiveRecipeCard.jsx';
import MostUsedIngredient from '../../components/Dashboard/MostUsedIngredient/MostUsedIngredient.jsx';
import RecentActivityCard from '../../components/Dashboard/RecentActivityCard/RecentActivityCard.jsx';

export default function Dashboard() {
    const [user, error] = useCurrentUser();
    const [isLoading, setIsLoading] = useState(false);
    const [activeRecipes, setActiveRecipes] = useState([]);
    const [noActiveRecipe, setNoActiveRecipe] = useState(false);
    const [userJourney, setUserJourney] = useState({
      totalRecipesCreated: 0,
      mostCookedRecipe: {
        title: "",
        times_cooked: 0
      }
    })
    const [recentActivity, setRecentActivity] = useState([]);
    const [userStats, setUserStats] = useState({
      averageRating: 0,
      averageDifficulty: 0,
      highestRated: {
        title: "",
        rating: 0
      },
      mostUsedIngredients: []
    })
    const [userMonth, setUserMonth] = useState({
      recipesCompleted: 0,
      newFavorites: 0,
      cookingDays: 0
    })

    useEffect(() => {
      setIsLoading(true);
      async function getDashboardInfo() {
        try {
          await getActiveRecipe();
          await getUserJourney();
          await getRecentActivity();
          await getUserStats();
          await getUserMonth();
        } catch (error) {
          console.error(error?.response?.data?.error || "Something went wrong. Please try again later.")
        } finally {
          setIsLoading(false)
        }
      }

      getDashboardInfo();
    }, [])

    async function getActiveRecipe() {
      try {
        const res = await api.get("/dashboard/active_recipes");
        if (res.data.activeRecipes.length === 0) {
          setNoActiveRecipe(true);
          return;
        } 
        setActiveRecipes(res.data.activeRecipes);
      } catch (error) {
        console.error(error?.response?.data?.error || "Something went wrong. Please try again later.")
      }
    }

    async function getUserJourney() {
      try {
        const res = await api.get("/dashboard/user_journey");
        setUserJourney({
          totalRecipesCreated: res.data.userJourney.totalRecipesCreated,
          mostCookedRecipe: {
            title: res.data.userJourney.mostCookedRecipe.title,
            times_cooked: res.data.userJourney.mostCookedRecipe.times_cooked
          }
        })
      } catch (error) {
        console.error(error?.response?.data?.error || "Something went wrong. Please try again later.")
      }
    }

    async function getRecentActivity() {
      try {
        const res = await api.get("/dashboard/recent_activity");
        setRecentActivity(res.data.recentActivity)
      } catch (error) {
        console.error(error?.response?.data?.error || "Something went wrong. Please try again later.")
      }
    }

    async function getUserStats() {
      try {
        const res = await api.get("/dashboard/user_stats")
        setUserStats({
          averageRating: res.data.userStats.averageRating,
          averageDifficulty: res.data.userStats.averageDifficulty,
          highestRated: {
            title: res.data.userStats.highestRated.title,
            rating: res.data.userStats.highestRated.rating
          },
          mostUsedIngredients: res.data.userStats.mostUsedIngredients
        })
      } catch (error) {
        console.error(error?.response?.data?.error || "Something went wrong. Please try again later.")
      }
    }

    async function getUserMonth() {
      try {
        const res = await api.get("/dashboard/user_month")
        setUserMonth({
          recipesCompleted: res.data.userMonth.recipesCompleted,
          newFavorites: res.data.userMonth.newFavorites,
          cookingDays: res.data.userMonth.cookingDays
        })
      } catch (error) {
        console.error(error?.response?.data?.error || "Something went wrong. Please try again later.")
      }
    }

    if (isLoading) return <Loader />
    if (error) return <ErrorMessage error={error} bgColor="#fbfbf9"/>

    return (
        <div className="dashboard-container fade-in-up">
            <div className="dashboard-header">
                <h1>Hi {user?.first_name}!</h1>
                <p>Here's what's cooking in your kitchen</p>
            </div>

            {activeRecipes.length > 0 && activeRecipes.map((recipe, index) => {
              return <ActiveRecipeCard key={index} recipe={recipe}/>
            })}
                
            
            <div className="dashboard-grid">
              
                <div className="dashboard-section journey-section">
                    <h2>Your Cooking Journey</h2>
                    
                    <div className="stat-card large-stat">
                        <div className="stat-number">{userJourney.totalRecipesCreated}</div>
                        <div className="stat-label">Recipes Completed</div>
                    </div>

                    <div className="most-cooked-card">
                        <h3>Most Cooked Recipe</h3>
                        <div className="recipe-name">{userJourney.mostCookedRecipe.title}</div>
                        {userJourney.mostCookedRecipe.title ? <div className="cook-count">{userJourney.mostCookedRecipe.times_cooked} times</div> : "None"}
                    </div>

                    <div className="quick-actions">
                        <button className="action-btn primary" onClick={() => navigate("/getrecipe")}>
                            Generate New Recipes
                        </button>
                        <button className="action-btn secondary" onClick={() => navigate("/yourrecipes")}>
                            View All Recipes
                        </button>
                    </div>
                </div>

                <div className="dashboard-section activity-section">
                    <h2>Recent Activity</h2>
                    
                    {recentActivity.length === 0 && <div className="no-activity-container">
                      <img src="/images/clock.svg"></img>
                      <p className="no-activity-text">No recent activity.</p>
                      </div>}
                    <div className="recent-recipes">
                        {recentActivity.map((recipe, index) => {
                            return <RecentActivityCard key={index} recipe={recipe} index={index}/>
                          })}
                    </div>
                </div>

                <div className="dashboard-section stats-section">
                    <h2>Your Stats</h2>
                    
                    <div className="stat-grid">
                        <div className="stat-card">
                            <div className="stat-number rating-container">
                              {userStats.averageRating.toFixed(1)}
                              <img className="star-icon" src="/images/star.svg"></img>
                            </div>
                            <div className="stat-label">Average Rating</div>
                        </div>
                        
                        <div className="stat-card">
                            <div className="stat-number">{userStats.averageDifficulty.toFixed(0 || 1)}/10</div>
                            <div className="stat-label">Average Difficulty</div>
                        </div>
                    </div>

                    <div 
                    style={{
                      backgroundColor: getDifficultyCardStyle(userStats.averageDifficulty).backgroundColor,
                      borderColor: getDifficultyCardStyle(userStats.averageDifficulty).borderColor
                    }}
                    className="highest-rated-card">
                      <h3 style={{ color: getDifficultyCardStyle(userStats.averageDifficulty).textColor }}>Your Favorite Difficulty</h3>
                      <h2 style={{ color: getDifficultyCardStyle(userStats.averageDifficulty).accentColor }}>{getFavoriteDifficulty(userStats.averageDifficulty)}</h2>
                    </div>

                    <div className="highest-rated-card">
                        <h3>Highest Rated Recipe</h3>
                        <div className="recipe-name">{userStats.highestRated.title ? userStats.highestRated.title : "None"}</div>
                        {userStats.highestRated.title && <div className="rating">{"★".repeat(Math.floor(userStats.highestRated.rating / 2))} {userStats.highestRated.rating}/10</div>}
                    </div>
                </div>
            </div>


            <div className="dashboard-section insights-section">
                <h2>Cooking Insights</h2>
                
                
                <div className="insights-grid">
                    <div className="insight-card">
                        <h3>Favorite Ingredients</h3>
                        <div className="ingredients-list">
                        {userStats.mostUsedIngredients.length === 0 && <div className="no-activity-container">
                          <img src="/images/heart-gray.svg"></img>
                          <p className='no-activity-text'>No favorite ingredients.</p>
                          </div>}
                            {userStats.mostUsedIngredients.slice(0, 5).map((ingredient, index) => {
                                return <MostUsedIngredient key={index} ingredient={ingredient} index={index}/>
                              })}
                        </div>
                    </div>

                    <div className="insight-card">
                        <h3>This Month</h3>
                        <div className="monthly-stats">
                            <div className="monthly-stat">
                                <span className="stat-number">{userMonth.recipesCompleted}</span>
                                <span className="stat-text">recipes completed</span>
                            </div>
                            <div className="monthly-stat">
                                <span className="stat-number">{userMonth.newFavorites}</span>
                                <span className="stat-text">new favorites</span>
                            </div>
                            <div className="monthly-stat">
                                <span className="stat-number">{userMonth.cookingDays}</span>
                                <span className="stat-text">cooking days</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}