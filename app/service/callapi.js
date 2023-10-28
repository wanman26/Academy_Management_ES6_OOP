function CallApi() {
  this.fetchData = () => {
    let promise = axios({
      url: "https://6519a404818c4e98ac609bd3.mockapi.io/api/academy",
      method: "GET",
    });
    return promise;
  };
}
