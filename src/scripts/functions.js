

const getSavedRecipes = () => {
  const getRecipes = localStorage.getItem('recipes')
  try {
    return getRecipes ? JSON.parse(getRecipes) : []
  } catch (e) {
    return []
  }
}

const saveRecipes = (recipes) => {
  localStorage.setItem('recipes', JSON.stringify(recipes))
}

const removeRecipe = (recipes, id) => {
  let rmRecipeIndex = recipes.findIndex(recipe => {
    return recipe.id === id
  })

  if (rmRecipeIndex > -1) {
    recipes.splice(rmRecipeIndex, 1)
  }
}

const recipeStatus = (recipe, p) => {
  let readyStatusText = ''
  const x = recipe.ingredients.map(ingredient => {
    return ingredient.ihave
  })
  const all = x.every(el => el === true)
  const some = x.some(el => el === true)

  const nodata = !recipe.ingredients
  const nothave = x.every(el => !el === true)
  const none = nodata || nothave

  if (none) {
    readyStatusText = `You have none of the ingredients`
    p.classList.add('none')
  } else if (all) {
    readyStatusText = `You have all the ingredients`
    p.classList.add('all')
  } else if (some) {
    readyStatusText = `You have some of the ingredients`
    p.classList.add('some')
  }
  return readyStatusText
}

const generateRecipeElements = (recipe) => {
  const element = document.createElement('a')
  element.setAttribute('href', `edit.html#${recipe.id} `)
  element.classList.add('element')

  const title = document.createElement('h2')
  if (recipe.title) {
    title.textContent = recipe.title
  } else {
    title.textContent = 'Unnamed Recipe'
  }

  const p = document.createElement('p')
  p.classList.add('recipe-status')
  const span = document.createElement('span')
  p.appendChild(span)
  span.textContent = recipeStatus(recipe, p)

  element.appendChild(title)
  element.appendChild(p)
  return element
}

const renderRecipes = (recipes, filters) => {
  const filteredRecipes = recipes.filter(recipe => {
    return recipe.title.toLowerCase().includes(filters.searchText.toLowerCase())
  })

  document.querySelector('#recipes').innerHTML = ''
  filteredRecipes.forEach(recipe => {
    document.querySelector('#recipes').appendChild(generateRecipeElements(recipe))
  })
}


export { getSavedRecipes, saveRecipes, removeRecipe, recipeStatus, generateRecipeElements, renderRecipes }
