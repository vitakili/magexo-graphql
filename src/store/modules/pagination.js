
export default ({
    namespaced:true,
    state: {
        currentPage: 1,
      },
    mutations: {
        CHANGE_PAGE(state, i) {
            state.currentPage = i
        },
        ON_PREV(state) {
            state.currentPage--
        },
        ON_NEXT(state) {
            state.currentPage++
          },
        ON_LAST_PAGE(state, totalPages) {
           state.currentPage =  totalPages
        },
        ON_FIRST_PAGE(state) {
            state.currentPage =  1
         }
    },
    actions: {
      changePage(context, i) {
        context.commit('CHANGE_PAGE', i)
      },
      onPrev(context) {
        context.commit('ON_PREV')
      },
      onNext(context) {
        context.commit('ON_NEXT')
      },
      onLastPage(context, totalPages) {
        context.commit('ON_LAST_PAGE')
      },
      onFirstPage(context) {
        context.commit('ON_FIRST_PAGE')
      }
    },
    getters: {
        getCurrentPage (state) {
            return state.currentPage
        }
    }
})
