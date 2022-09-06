
export default ({
    state: {
        pageToSee: 1,
      },
    mutations: {
        CHANGE_PAGE(state, i) {
            state.pageToSee = i
        },
        ON_PREV(state) {
            state.pageToSee--
        },
        ON_NEXT(state) {
            state.pageToSee++
          },
        ON_LAST_PAGE(state, totalPages) {
           state.pageToSee =  totalPages
        },
        ON_FIRST_PAGE(state) {
            state.pageToSee =  1
         }
    },
    actions: {
      changePage(context, i) {
        context.commit('CHANGE_PAGE', i)
      }
    },
    getters: {
        getCurrentPage (state) {
            return state.pageToSee
        }
    }
})
