
export function fetchData(city){
  return dispatch => {
    return new Promise((res, rej) => {
      fetch(`https://vast-shore-74260.herokuapp.com/banks?city=${city}`)
      .then(res => res.json())
      .then(data => {
        var spread =  data.map((bank,i)=> {
          return {...bank, isFavourite: false}
        });
        localStorage.setItem("banksInfo",JSON.stringify(spread));
        dispatch({ type: "GET_BANKS_INFO", payload: spread});
        res();
      }).catch(err => {
        console.log(err);
        rej();
      });
    })
  }
};