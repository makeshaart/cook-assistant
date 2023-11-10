import React, { useState } from 'react';
import './App.css'
import OpenAI from 'openai';

const App = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState(null);
  const [image, setImage] = useState(null);


  const handleGenerateRecipe = async () => {
    const openai = new OpenAI({
      apiKey: "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",
      organization: "org-oJqA3X89TZTCik3UCUQadzTQ",
      dangerouslyAllowBrowser: true,
    })
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: "user", content: `Please create best recipe with ${ingredients}  in JSON format in which the title, ingredients, recept, timeToCook field will be a string` }],
      });

      const recipeData = response.choices[0].message.content;

      const imageKey = JSON.parse(response.choices[0].message.content)?.title
      const imageResult = await openai.images.generate({
        prompt: imageKey,
        size: "200x200",
        n: 1,
      })
      
      setImage(imageResult[0].url)
      setRecipe(JSON.parse(recipeData))
      setIngredients('')
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div className='conteiner'>
      <h1>Recipe Generator</h1>
      <div className='input_conteiner'>
        <textarea
          placeholder="Enter the ingredients separated by commas"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <button onClick={handleGenerateRecipe}>Create a recipe</button>
      </div>

      <div>
      {image && image}
      </div>
      {recipe && (
        <div className='text_content'>
          <h2>{recipe.title}</h2>
          <p><h3>Ingredients: </h3>{recipe.ingredients}</p>
          <p><h3>Preparation Steps:</h3> {recipe.recipe}</p>
          <p><h3>Cooking time:</h3> {recipe.timeToCook}</p>
        </div>
      )}
    </div>
  );
};
export default App;
