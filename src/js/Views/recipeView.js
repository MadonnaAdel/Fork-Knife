import icons from '../../img/icons.svg';
import { Fraction } from 'fractional';
import View from './View';


class RecipeView extends View {
    _parentEl = document.querySelector('.recipe');
    _genrateMarkup() {
        return ` <figure class="recipe__fig">
                    <img src=${this._data?.imageUrl} alt="Tomato" class="recipe__img" />
                    <h1 class="recipe__title">
                    <span>${this._data?.title}</span>
                    </h1>
                </figure>
                <div class="recipe__details">
                    <div class="recipe__info">
                        <svg class="recipe__info-icon">
                            <use href="${icons}#icon-clock"></use>
                        </svg>
                        <span class="recipe__info-data recipe__info-data--minutes">${this._data?.cookingTime}</span>
                        <span class="recipe__info-text">minutes</span>
                    </div>
                    <div class="recipe__info">
                        <svg class="recipe__info-icon">
                            <use href="${icons}#icon-users"></use>
                        </svg>
                        <span class="recipe__info-data recipe__info-data--people">${this._data?.servings}</span>
                        <span class="recipe__info-text">servings</span>
                        <div class="recipe__info-buttons">
                            <button class="btn--tiny btn--update-servings " data-update-to="${this._data?.servings - 1}" >
                            <svg>
                                <use href="${icons}#icon-minus-circle"></use>
                            </svg>
                            </button>
                            <button class="btn--tiny btn--update-servings" data-update-to="${this._data?.servings + 1}">
                            <svg>
                                <use href="${icons}#icon-plus-circle"></use>
                            </svg>
                            </button>
                        </div>
                    </div>
                    <div class="recipe__user-generated">
                        <svg>
                            <use href="${icons}#icon-user"></use>
                        </svg>
                    </div>
                    <button class="btn--round bookMark__btn">
                        <svg class=" ">
                            <use href="${icons}#icon-bookmark${this._data?.bookmarked ? '-fill' : ''}"></use>
                        </svg>
                    </button>
                </div>
                <div class="recipe__ingredients">
                    <h2 class="heading--2">Recipe ingredients</h2>
                    <ul class="recipe__ingredient-list">
                    ${this._data?.ingredients?.map(ingredient => this._gnerateIngradiantEle(ingredient)).join('')}
                    </ul>
                </div>
                <div class="recipe__directions">
                    <h2 class="heading--2">How to cook it</h2>
                    <p class="recipe__directions-text">
                    This recipe was carefully designed and tested by
                    <span class="recipe__publisher">The Pioneer Woman</span>. Please check out
                    directions at their website.
                    </p>
                    <a
                    class="btn--small recipe__btn"
                    href=${this._data?.sourceUrl}
                    target="_blank"
                    >
                        <span>Directions</span>
                        <svg class="search__icon">
                            <use href="${icons}#icon-arrow-right"></use>
                        </svg>
                    </a>
                </div>
        `
    }
    _gnerateIngradiantEle(ingredient){
        return `
        <li class="recipe__ingredient">
            <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${ingredient?.quantity?new Fraction( ingredient?.quantity).toString():'' }</div>
            <div class="recipe__description">
                <span class="recipe__unit">${ingredient?.unit}</span>
                    ${ingredient?.description || ''}
            </div>
        </li>
        `
    }
    handelListenerRender(handel) {
        const events = ['load', 'hashchange'];
        events.forEach(e => window.addEventListener(e, handel));
    }
    
    
    addUpdateServings(handel){
        addEventListener('click',(e)=>{
            const btn = e.target.closest('.btn--update-servings');
            if(!btn) return;
            const {updateTo} = btn.dataset;
            if(+updateTo > 0) handel( +updateTo )
        })
    }
    addBookMark(handel){
        addEventListener('click',(e)=>{
            const btn = e.target.closest('.bookMark__btn');
            if(!btn) return;
            handel();
        })
    }
}

export default new RecipeView();