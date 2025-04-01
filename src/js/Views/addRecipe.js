import View from "./View";

class AddRecipe extends View{

    _parentEle =document.querySelector('.upload');
    _uploadBtn =document.querySelector('.upload__btn');
    _closeBtn =document.querySelector('.btn--close-modal');
    _window =document.querySelector('.add-recipe-window');
    _overlay =document.querySelector('.overlay');
    _addRecipe =document.querySelector('.nav__btn--add-recipe');

    constructor(){
        super()
        this._addHandelShowUploadWindow();
        this._addHandelHideUploadWindow();
    }
    _toggelUploadWindow(){
        this._overlay.classList.toggle('hidden');
        this._window.classList.toggle('hidden');
    }

    _addHandelShowUploadWindow(){
        // this._addRecipe.addEventListener('click',this._toggelUploadWindow.bind(this));
    }
    _addHandelHideUploadWindow(){
        this._closeBtn.addEventListener('click',this._toggelUploadWindow.bind(this));
        this._overlay.addEventListener('click',this._toggelUploadWindow.bind(this) )
    }
    addHandelUpload(handel){
        this._parentEle.addEventListener('submit', function(e){
            e.preventDefault();
            const dataArr =[...new FormData(this)];
            const data = Object.fromEntries(dataArr);
            handel(data)
        })
    }

}
export default new AddRecipe();