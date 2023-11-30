// https://punkapi.com/documentation/v2
const ENDPOINT = "https://api.punkapi.com/v2";
// const axios = require("axios");
import axios from 'axios';

const findFilter = (filter) => {
    let param;
    let number;
    switch (filter) {
      case 'ABV<5':
        param = 'abv_lt'
        number = 5;
        break;
      case 'ABV>5':
        param = 'abv_gt'
        number = 5;
        break;
      case 'IBU<50':
        param = 'ibu_lt'
        number = 50;
        break;
      case 'IBU>50':
        param = 'ibu_gt'
        number = 50;
        break;
      case 'EBC<27':
        param = 'ebc_lt'
        number = 27;
        break;
      case 'EBC>27':
        param = 'ebc_gt'
        number = 27;
        break;
      default:
        console.log('no filter or error!')
        break;
    }
    return [param, number];
}

const api = {
  /**
	  abv_gt	number	Returns all beers with ABV greater than the supplied number
		abv_lt	number	Returns all beers with ABV less than the supplied number
		ibu_gt	number	Returns all beers with IBU greater than the supplied number
		ibu_lt	number	Returns all beers with IBU less than the supplied number
		ebc_gt	number	Returns all beers with EBC greater than the supplied number
		ebc_lt	number	Returns all beers with EBC less than the supplied number
		beer_name	string	Returns all beers matching the supplied name (this will match partial strings as well so e.g punk will return Punk IPA), if you need to add spaces just add an underscore (_).
		yeast	string	Returns all beers matching the supplied yeast name, this performs a fuzzy match, if you need to add spaces just add an underscore (_).
		brewed_before	date	Returns all beers brewed before this date, the date format is mm-yyyy e.g 10-2011
		brewed_after	date	Returns all beers brewed after this date, the date format is mm-yyyy e.g 10-2011
		hops	string	Returns all beers matching the supplied hops name, this performs a fuzzy match, if you need to add spaces just add an underscore (_).
		malt	string	Returns all beers matching the supplied malt name, this performs a fuzzy match, if you need to add spaces just add an underscore (_).
		food	string	Returns all beers matching the supplied food string, this performs a fuzzy match, if you need to add spaces just add an underscore (_).
		ids	string (id|id|...)	Returns all beers matching the supplied ID's. You can pass in multiple ID's by separating them with a | symbol.
	 */

  // search function will need to append filter with &
  getBeers: (page = 1, perPage = 33) => {
    // const { page = 1, perPage = 33 } = options;
    let requestUrl = `${ENDPOINT}/beers?page=${page}&per_page=${perPage}`;
    
    return axios.get(requestUrl).then(result => {
      // console.log('result', result);
      return result.data;
    });
  },
  getRandomBeer: () => {
    return axios.get(`${ENDPOINT}/beers/random`).then(result => {
      return result.data[0];
    });
  },
  getBeerById: id => {
    return axios.get(`${ENDPOINT}/beers/${id}`).then(result => {
      return result.data[0];
    });
  },
  getBeerBySearch: (search, filter = '') => {
    // console.log(search,'search',filter,'filter')
    let param, number;
    let requestUrl = `https://api.punkapi.com/v2/beers?beer_name=${search}`
    if (filter != ''){
      // console.log('begin search for filter', filter);
      [param, number] = findFilter(filter);
      // console.log('param', param, 'number', number);
      requestUrl += `&${param}=${number}`
    }
    return axios.get(requestUrl).then(result => {
      // console.log('searchurl', requestUrl, 'search result', result);
      return result.data;
    });
  },
  getBeerByFilter: (filter) => {
    let param, number;
    [param, number]= findFilter(filter)
    const requestUrl = `https://api.punkapi.com/v2/beers?${param}=${number}`
    return axios.get(requestUrl).then(result => {
      // console.log('filter result', result);
      return result.data;
    });
  }
};

export default api;