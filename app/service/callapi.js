function CallApi() {
  this.fetchData = () => {
    let promise = axios({
      url: "https://6519a404818c4e98ac609bd3.mockapi.io/api/academy",
      method: "GET",
    });
    return promise;
  };
  this.addPersonApi = (person) => {
    let promise = axios({
      url: "https://6519a404818c4e98ac609bd3.mockapi.io/api/academy",
      method: "POST",
      data: person,
    });
    return promise;
  };
  this.deletePersonById = function (id) {
    let promise = axios({
      url: `https://6519a404818c4e98ac609bd3.mockapi.io/api/academy/${id}`,
      method: "DELETE",
    });
    return promise;
  };
  this.getPersonById = (id) => {
    let promise = axios({
      url: `https://6519a404818c4e98ac609bd3.mockapi.io/api/academy/${id}`,
      method: "GET",
    });
    return promise;
  };
  this.updatePersonById = (person) => {
    let promise = axios({
      url: `https://6519a404818c4e98ac609bd3.mockapi.io/api/academy/${person.id}`,
      method: "PUT",
      data: person,
    });
    return promise;
  };
}
