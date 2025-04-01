import View from "./View";
import previewRecipeView from "./previewRecipeView";

class BookMarkView extends View{
    _parentEl= document.querySelector('.bookmarks__list');
    renderMore (data) {
        const html = data.map(this._genrateMarkup.bind(this)).join('');
        this._parentEl.insertAdjacentHTML('beforeend', html);
    };
    addLoadBookmarks(handel){
        window.addEventListener('load',handel);
    }
    _genrateMarkup(){
        return this._data?.map(bookMark => previewRecipeView.render(bookMark,false)).join('');
    }
}
export default new BookMarkView();