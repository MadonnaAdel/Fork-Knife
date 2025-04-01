import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import icons from 'url:../../img/icons.svg';

export default class View{
    _data;
        _clear (){
            this._parentEl.innerHTML = '';
        }
        render(data , render = true) {
            this._data = data;
            const html = this._genrateMarkup();
            if(!render) return html;
            this._clear();
            this._parentEl.insertAdjacentHTML('afterbegin', html);
        }
        update(data) {
            this._data = data;
            const Newhtml = this._genrateMarkup();
            const viesualDom = document.createRange().createContextualFragment(Newhtml);
            const virsualElments = Array.from(viesualDom.querySelectorAll('*'));
            const realElements = Array.from(this._parentEl.querySelectorAll('*'));
        
            virsualElments.forEach((ele, i) => {
                const currentEle = realElements[i];
            
                if (!ele.isEqualNode(currentEle) && ele.firstChild && ele.firstChild.nodeValue.trim() !== '') {
                    currentEle.textContent = ele.textContent;
                }
            
                if (!ele.isEqualNode(currentEle)) {
                    Array.from(ele.attributes).forEach((attr) => {
                        currentEle.setAttribute(attr.name, attr.value);
                    });
                }
            });
            
        }
        renderSpinner() {
            const html = `
            <div class="spinner">
                    <svg>
                    <use href="${icons}#icon-loader"></use>
                    </svg>
                </div>
        `
            this._clear();
            this._parentEl.insertAdjacentHTML('afterbegin', html);
        }
        toast (message, statue) {
            Toastify({
                text: message || "An error occurred",
                duration: 4000,
                backgroundColor: `linear-gradient(to right,${statue === 'success' ? 'rgb(65, 255, 71),rgb(22, 107, 5)': statue === 'error' ?'rgb(255, 65, 78),rgb(194, 13, 1)': 'rgb(65, 78, 255),rgb(43, 1, 194)'})`,
            }).showToast();
        }
}