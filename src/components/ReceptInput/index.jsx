import React, { useState } from "react"

export const ReceptInput = ({ onRecipeGenerated }) => {
  const [ingredients, setIngredients] = useState('');

  const handleGenerateRecipe = async () => {
    try {
      const response = await axios.post('/api/generate-recipe', { ingredients });
      onRecipeGenerated(response.data);
    } catch (error) {
      console.error('Error generating recipe:', error);
    }
  };

  return (
    <>
      <input
        placeholder="Enter ingredients..."
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />
      <button onClick={handleGenerateRecipe}>Generate Recipe</button>
    </>
  );
};