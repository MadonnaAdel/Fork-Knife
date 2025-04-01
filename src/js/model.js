import { async } from "regenerator-runtime"
import { getJeson, setJeson } from "./Views/helpers"
import { API_KEY, API_URL, RESULTS_PER_PAGE } from "./confige";

export const state={
    recipe:{},
    search:{
        query:'',
        result:[],
        resultsPerPage: RESULTS_PER_PAGE,
        page: 1,
        resultPagenated:[]
    },
    bookMarks: [],
    
}

export const renderRecipe = async function(id) {
    try{
        const data = await getJeson(`${API_URL}/${id}`);
        const {recipe} = data?.data;
            state.recipe = {
                id: recipe.id,
                cookingTime: recipe.cooking_time,
                imageUrl: recipe.image_url,
                ingredients: recipe.ingredients,
                publisher: recipe.publisher,
                servings: recipe.servings,
                sourceUrl: recipe.source_url,
                title: recipe.title
            }
            if (Array.isArray(state.bookMarks) && state.bookMarks.some((res) => res.id === id)) {
                if (state.recipe) {
                    state.recipe.bookmarked = true; 
                }else state.recipe.bookmarked = false; 
            }
        }catch(err){
        console.error(err);
        throw err
    }
}
export const renderSearch = async function (query) {
    try{
        state.search.query = query;
        const data = await getJeson(`${API_URL}?search=${query}`);
        if(data.result === 0) throw new Error('')
        state.search.result = data?.data?.recipes.map((rec)=>{
            return {
                id: rec.id,
                imageUrl: rec.image_url,
                title: rec.title,
                publisher: rec.publisher,
            }
        })
    }catch(err){
        console.error(err);
        throw err
    }
}
export const getResultsPage = function (page = state.search.page){
    const {resultsPerPage} = state.search;
    state.search.page = page;
    const start = (page - 1) * resultsPerPage;
    const end =   page * resultsPerPage;
    return state.search.result.slice(start,end);
}
export const loadMoreResults = function (){
    const page = state.search.page++ ;
    state.search.resultPagenated = getResultsPage(page);
    if(state.search.resultPagenated.length === 0) return;
    return state.search.resultPagenated;
}
export const updateServings = function (newServings) {
    const oldServings = state.recipe.servings; 
    state.recipe.servings = newServings; 
    state.recipe.ingredients.forEach(ingredient => {
        ingredient.quantity = (ingredient.quantity * newServings) / oldServings;
    });
};
const persisteBookMarks= function(){
    localStorage.setItem('BookMarks', JSON.stringify(state.bookMarks));

}
export const toggeleBookMark = function(recipe){ 
    if(recipe?.bookmarked){
        const index = state.bookMarks.findIndex((res)=> res.id === recipe.id);
        state.bookMarks.splice(index,1)
    }else{
        state.bookMarks.push(recipe);
    }
    if(recipe.id === state.recipe.id)
            state.recipe.bookmarked = ! state.recipe?.bookmarked;
        persisteBookMarks();
}

// export const uploadRecipe =async function (newRecipe){
//     try{
//     const ingredients = Object.entries(newRecipe)
//         .filter(([key, val]) => key.startsWith("ingredient") && val !== "")
//         .map(([_, val]) => {
//             const [quantity, unit, name] = val.replaceAll(" ", "").split(",");
//             return {  
//                 quantity: quantity ? +quantity: null,
//                 unit: unit || "", 
//                 name: name || ""
            
//             };
//             });
//             state.bookMarks.push(newRecipe);
//             persisteBookMarks();
//             const recipe = {
//                 cooking_time: +newRecipe.cookingTime,
//                 image_url: newRecipe.image,
//                 ingredients,
//                 publisher: newRecipe.publisher,
//                 servings: +newRecipe.servings,
//                 source_url: newRecipe.sourceUrl,
//                 title: newRecipe.title,
//                 description : "hey its very good recipe"
//             }
            // const res = await setJeson(`${API_URL}?key=${API_KEY}` , recipe);
//         return res ;
//     }catch (err){
//         throw err;
//     }
// }
const init = function(){
    const bookMarks = localStorage.getItem('BookMarks');
    if(bookMarks) state.bookMarks = JSON.parse(bookMarks);
}

init()