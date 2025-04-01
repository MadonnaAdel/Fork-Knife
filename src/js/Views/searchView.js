class SearchView{
    #parentEl = document.querySelector('.search');
    #query;

    getQuery(){
        let inputValue = this.#parentEl.querySelector('.search__field').value;
        this.#query = inputValue.toLowerCase();
        this.#clear();
        return this.#query;
    }
    #clear(){
        this.#parentEl.querySelector('.search__field').value = '';
    }
    addHandelerSearch(handel){
        this.#parentEl.addEventListener('submit',function(e){
            e.preventDefault()
            handel();
        })
    }

}
export default new SearchView();