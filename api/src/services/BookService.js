import BookDTO from '../domain/dto/BookDTO.js';

export class BookService {
    constructor(bookRepository) {
        this.bookRepository = bookRepository;
    }

    async listBooks() {
        return (await this.bookRepository.findAll()).map(BookDTO.fromEntity);
    }

    async getBook(id) {
        const b = await this.bookRepository.findById(id);
        return b;
    }

    async createBook(data) {
        return BookDTO.fromEntity(await this.bookRepository.createBook(data))
    }

    async updateBook(id, data) {
        const b = await this.bookRepository.updateBook(id, data);
        return b ? BookDTO.fromEntity(b) : null;
    }

    async deleteBook(id) {
        return await this.bookRepository.deleteBook(id);
    }

    async searchBooks(query) {
        return await this.bookRepository.search(query);
    }

}