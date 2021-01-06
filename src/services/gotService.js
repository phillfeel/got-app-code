
export default class GotService {
  constructor() {
      this._apiBase = 'https://www.anapioficeandfire.com/api';
  }

  getResource = async (url) => {
      const res = await fetch(`${this._apiBase}${url}`);
  
      if (!res.ok) {
        throw new Error(`Could not fetch ${url}` +
          `, received ${res.status}`);
      }
      return await res.json();
  }

  
  getAllBooks = async () => {
    const res = await this.getResource(`/books/`);
    return res.map(this._transformBook);
}

getBook = async (id) => {
    const book = await this.getResource(`/books/${id}/`);
    return this._transformBook(book);
}
  
getAllCharacters = async () =>{
      const res = await this.getResource(`/characters?page=5&pageSize=10`);
      return res.map(this._transformCharacter);
  }
  
 getCharacter = async (id) => {
    const char = await this.getResource(`/characters/${id}`);
    return this._transformCharacter(char);
}
  
getAllHouses = async () => {
  const res = await this.getResource(`/houses/`);
  return res.map(this._transformHouse);
}

getHouse = async (id) => {
  const house = await this.getResource(`/houses/${id}/`);
  return this._transformHouse(house);
}

  isSet(data) {
    if (data) {
        return data
    } else {
        return 'no data :('
    }
} 

_extractId = (item) => {
  const idRegExp = /\/([0-9]*)$/;
  //console.log(item.url.match(idRegExp)[1]);
  return item.url.match(idRegExp)[1];
}

_transformCharacter = (character) => {
  return {
    id: this._extractId(character),
    name: this.isSet(character.name),
    gender: this.isSet(character.gender),
    born: this.isSet(character.born),
    died: this.isSet(character.died),
    culture: this.isSet(character.culture)
  }
}

_transformHouse = (house) => {
  return {
      id: this._extractId(house),
      name: this.isSet(house.name),
      region: this.isSet(house.region),
      words: this.isSet(house.words),
      titles: this.isSet(house.titles),
      ancestralWeapons: this.isSet(house.ancestralWeapons)
  };
}

_transformBook = (book) => {
  return {
      id: this._extractId(book),
      name: this.isSet(book.name),
      numberOfPages: this.isSet(book.numberOfPages),
      publisher: this.isSet(book.publisher),
      released: this.isSet(book.released)
  };
}
      


} 
