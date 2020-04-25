import generateUuId from '../uuid-v4'
import { getSavedRecipes, saveRecipes, removeRecipe } from '../functions'
import 'normalize.css/normalize.css'
import '../styles/styles.scss'

let recipes = getSavedRecipes()
let recipeId = location.hash.substring(1)
let recipe = recipes.find(recipe => {
  return recipe.id === recipeId
})
let ingredients = recipe.ingredients

const titleElement = document.querySelector('#recipe-title')
const bodyElement = document.querySelector('#recipe-body')
const ingredientElement = document.querySelector('#add-ingredient')
const rmBtn = document.querySelector('#delete-recipe')


const removeIngredients = (id) => {
  const targetIndex = ingredients.findIndex(ingredient => {
    return ingredient.id === id
  })
  if (targetIndex > -1) {
    ingredients.splice(targetIndex, 1)
  }

}

const toggleIngredient = (id) => {
  const target = ingredients.find(ingredient => {
    return ingredient.id === id
  })
  if (target) {
    target.ihave = !target.ihave
  }
}

const generateIngredientList = (ingredient) => {
  const li = document.createElement('li')
  const checkbox = document.createElement('input')
  checkbox.setAttribute('type', 'checkbox')
  checkbox.checked = ingredient.ihave
  checkbox.addEventListener('change', () => {
    toggleIngredient(ingredient.id)
    saveRecipes(recipes)
    renderIngredients(ingredients)
  })

  const span = document.createElement('span')
  span.textContent = ingredient.name

  const rmBtn = document.createElement('button')
  rmBtn.textContent = 'remove'
  rmBtn.addEventListener('click', () => {
    removeIngredients(ingredient.id)
    saveRecipes(recipes)
    renderIngredients(ingredients)
  })

  li.appendChild(checkbox)
  li.appendChild(span)
  li.appendChild(rmBtn)
  return li
}

const renderIngredients = (ingredients) => {
  document.querySelector('#ingredients__list').innerHTML = ''
  ingredients.forEach(ingredient => {
    document.querySelector('#ingredients__list').appendChild(generateIngredientList(ingredient))
  })
}

titleElement.value = recipe.title
bodyElement.value = recipe.body
renderIngredients(ingredients)

titleElement.addEventListener('input', e => {
  recipe.title = e.target.value
  saveRecipes(recipes)
  // titleElement.value = recipe.title
})

bodyElement.addEventListener('input', e => {
  recipe.body = e.target.value
  saveRecipes(recipes)
  // bodyElement.value = recipe.body
})

rmBtn.addEventListener('click', e => {
  removeRecipe(recipes, recipe.id)
  saveRecipes(recipes)
  location.assign('index.html')
})

ingredientElement.addEventListener('submit', e => {
  e.preventDefault()
  if (e.target.elements.text.value) {
    const id = generateUuId()
    recipe.ingredients.push({
      name: e.target.elements.text.value,
      ihave: false,
      id: id
    })
    saveRecipes(recipes)
    renderIngredients(ingredients)
    e.target.elements.text.value = ''
  }
})


window.addEventListener('storage', e => {
  if (e.key === 'recipes') {
    recipes = JSON.parse(e.newValue)
  }
  recipeId = location.hash.substring(1)
  recipe = recipes.find(recipe => {
    return recipe.id === recipeId
  })

  titleElement.value = recipe.title
  bodyElement.value = recipe.body
})
