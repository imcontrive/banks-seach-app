const initState = {
  banksInfo:[]
}

export default function banksReducer(state=initState,action){
  switch(action.type) {
    case 'GET_BANKS_INFO' :
      return {
        ...state, banksInfo: action.payload
      }
    case 'FAV_BANKS_DATA' :
      return {
        ...state, banksInfo: action.payload
      }
    default : 
      return state;
  }
}
