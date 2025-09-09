import React from 'react';
import { ChefHat, Clock, Star, BookOpen, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router';
import './home.css';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="home-container">

      <main className="main">
        <div className="hero fade-in-up">
          <div className="hero-icon-container">
            <div className="hero-icon">
              <ChefHat size={48} color="#ea580c" />
              <div className="sparkle-icon">
                <Sparkles size={24} color="#eab308" />
              </div>
            </div>
          </div>
          
          <p className="hero-title">
            Your AI-Powered<br />
            <span className="hero-highlight">Cooking Companion</span>
          </p>
          
          <p className="hero-subtitle">
            Discover personalized recipes, track your cooking journey, and level up your culinary skills with Chef Claude!
          </p>

          <div className="hero-buttons">
            <button onClick={() => navigate("/signup")}className="primary-btn">Start Cooking Today</button>
          </div>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon blue">
              <BookOpen size={24} color="#2563eb" />
            </div>
            <h3 className="feature-title">Smart Recipe Discovery</h3>
            <p className="feature-text">
              Get AI-generated recipe recommendations based on your available ingredients, dietary preferences, and cooking skill level.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon green">
              <Clock size={24} color="#16a34a" />
            </div>
            <h3 className="feature-title">Track Your Progress</h3>
            <p className="feature-text">
              Monitor your cooking journey with detailed stats, completion rates, and skill progression insights.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon purple">
              <Star size={24} color="#9333ea" />
            </div>
            <h3 className="feature-title">Rate & Review</h3>
            <p className="feature-text">
              Rate and review your recipes and keep cooking to improve them!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}