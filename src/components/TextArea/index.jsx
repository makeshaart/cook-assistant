import React from "react"

export const TextArea = ({ recipe }) => {
    return (
        <div>
            <h1>{recipe.title}</h1>
            <p>Ingredients Amount: {recipe.ingredientsAmount}</p>
            <p>Steps to Cook: {recipe.steps}</p>
            <p>Time To Cook: {recipe.timeToCook}</p>
            <p>Difficulty: {recipe.difficulty}</p>
        </div>
    );
};