export default class BookDTO {
    constructor({id, title, author, year, price}){
        this.id = id;
        this.title = title;
        this.author = author;
        this.year = year;
        this.price = price;
    }

    static fromEntity(entity){
        return new BookDTO(entity);
    }
}

