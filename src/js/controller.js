import * as model from './model'
import recipeView from './Views/recipeView';
import { async } from 'regenerator-runtime';
import 'regenerator-runtime'
import 'core-js/stable'
import searchView from './Views/searchView';
import resultsView from './Views/resultsView';
import bookMarkView from './Views/bookMarkView';
import addRecipe from './Views/addRecipe';
import { toast } from 'react-toastify';

const controllerRecipe = async function () {
  try {
    const id = window.location.hash.slice(1) ;
    if(!id) return ;
    recipeView.renderSpinner();
    resultsView.update(model?.getResultsPage());
    bookMarkView.update(model.state.bookMarks);
    await model.renderRecipe(id);
    recipeView.render(model?.state?.recipe);
    addRecipe;
  } catch (err) {
    recipeView.toast(`${err.message} this recipe not found please try again leter`,'error')
    console.error(err)
  }
}

const controllerSearch = async function () {
  try{
    const query = searchView.getQuery();
  
    if(!query) throw Error('please write in search in input before click in search button');
    resultsView.renderSpinner();
    await model.renderSearch(query);
    const {result} = model.state.search;
    const firstResults = model.getResultsPage(model.state.search.page); 
    resultsView.renderSpinner();
    resultsView.render(firstResults);
    if(!result || Array.isArray(result) && result.length === 0){
        resultsView.toast('no result for your search pleaze try again ;)');
        return;
    }
  }catch(err){
    recipeView.toast(`${err.message}`,'error')
    console.error(err)
  }
}
let isFetching = false;

const controlleinfintyScrollPage = async function(){
  
    if (isFetching) return;
  
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
      isFetching = true; 
      const newResults =  model.getResultsPage(model.state.search.page++); 
      
      if (!newResults || newResults.length === 0) {
        isFetching = false; 
        return;
      }
      
      resultsView.renderMore(newResults);
      isFetching = false; 
    }
}
const controlleServingsUpdste = function (newServings){
    model.updateServings(newServings);
    recipeView.update(model.state.recipe);

}
const controlleToggeleBookMarket = function (){
    model.toggeleBookMark(model.state.recipe);
    recipeView.update(model.state.recipe);
    bookMarkView.render(model.state.bookMarks);
    bookMarkView.update(model.state.bookMarks);
    
}
const controlleBookMark =function(){
  bookMarkView.render(model.state.bookMarks);
}

const controlleUpload = async function(newRecipe){
try{
  // const res = await model.uploadRecipe(newRecipe);
   
    addRecipe.toast(res.message,'error')
}catch(err){
  addRecipe.toast(err.message)
}
  

}

const init = function (){
    resultsView.addInfintyScrollPafenation(controlleinfintyScrollPage);
    recipeView.addUpdateServings(controlleServingsUpdste);
    recipeView.addBookMark(controlleToggeleBookMarket);
    bookMarkView.addLoadBookmarks(controlleBookMark);
    recipeView.handelListenerRender(controllerRecipe);
    searchView.addHandelerSearch(controllerSearch);
    addRecipe.addHandelUpload(controlleUpload);
}
init();


