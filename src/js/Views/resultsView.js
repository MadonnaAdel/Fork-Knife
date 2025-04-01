import View from "./View";
import previewRecipeView from "./previewRecipeView";

class ResultsView extends View{
    _parentEl= document.querySelector('.results');
    renderMore (data) {
        const html = data.map(this._genrateMarkup.bind(this)).join('');
        this._parentEl.insertAdjacentHTML('beforeend', html);
    };
    _genrateMarkup(){
        return this._data?.map(result => previewRecipeView.render(result,false)).join('');
    }
    addInfintyScrollPafenation(handel){
        this._parentEl.addEventListener('scroll',handel)
    }
}
export default new ResultsView();