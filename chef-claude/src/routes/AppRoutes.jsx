import React from 'react'
import { Route, Routes } from 'react-router'
import Header from '../components/Header/Header'
import Home from '../pages/Home/Home'
import HeaderNoAuth from '../components/Header/HeaderNoAuth'
import Login from '../pages/Auth/Login'
import Signup from '../pages/Auth/Signup'
import SignedInLayout from '../layouts/SignedInLayout/SignedInLayout'
import Dashboard from '../pages/Dashboard/Dashboard'
import GenerateRecipe from '../pages/GenerateRecipe/GenerateRecipe'
import YourRecipes from '../pages/YourRecipes/YourRecipes'
import StartCooking from '../pages/StartCooking/StartCooking'
import UserProfile from '../pages/UserProfile/UserProfile'
import ViewRecipe from '../pages/ViewRecipe/ViewRecipe'
import NotFound from '../pages/NotFound/NotFound'
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute'

export default function AppRoutes() {
  return (
    <>
    <Routes>

      <Route element={<Header/>}>
        <Route index element={<Home />} />
      </Route>


      <Route element={<HeaderNoAuth />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*"  element={<NotFound />}/>
      </Route>

      <Route element={<SignedInLayout />}>
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/getrecipe" element={<ProtectedRoute><GenerateRecipe /></ProtectedRoute>}/>
        <Route path="/yourrecipes" element={<ProtectedRoute><YourRecipes /></ProtectedRoute>}/>
        <Route path="/startcooking" element={<ProtectedRoute><StartCooking /></ProtectedRoute>}/>
        <Route path="/userprofile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>}/>
        <Route path="/viewrecipe" element={<ProtectedRoute><ViewRecipe /></ProtectedRoute>}/>
      </Route>



      

    </Routes>


    </>
  )
}
