import generateUuId from './uuid-v4'
import { getSavedRecipes, saveRecipes, renderRecipes } from './functions'


let recipes = getSavedRecipes()

let filters = {
  searchText: ''
}

renderRecipes(recipes, filters)

document.querySelector('#search-text').addEventListener('input', e => {
  filters.searchText = e.target.value
  renderRecipes(recipes, filters)
})

document.querySelector('#add-recipe').addEventListener('click', e => {
  const id = generateUuId()
  recipes.push({
    id: id,
    title: '',
    body: '',
    ingredients: []
  })
  saveRecipes(recipes)
  location.assign(`edit.html#${id}`)
})

window.addEventListener('storage', e => {
  if (e.key === 'recipes') {
    recipes = JSON.parse(e.newValue)
  }
  renderRecipes(recipes, filters)
})
