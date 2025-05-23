import { Book } from "./book.model";
import { TBook } from "./book.interface";
import { bookSearchableFields } from "./book.constants";
import QueryBuilder from "../../builder/queryBuilder";

const createBook = async (bookData: TBook) => {
  const result = await Book.create(bookData);
  return result
};

const getAllBooksFromDB = async (query: Record<string, unknown>) => {
  
  const userQuery = new QueryBuilder(Book.find().populate('author'),query)
  .search(bookSearchableFields)
  .filter()
  .sort()
  .paginate()
  .fields();

  const result= await userQuery.modelQuery
  return result;
};


const getSingleBookfromDB = async (_id: string) => {
  const result= await Book.findOne({_id});
  return result
};

const updateBookIntoDB = async (
  productID: string,
  productInfo: TBook
) => {
  const result = await Book.findByIdAndUpdate(productID, productInfo, {
    new: true,
  });
  return result;
};

const deleteBookFromDB = async (_id: string) => {
  console.log(_id);
  
  return await Book.findOneAndDelete({_id});
};

export const bookService = {
    createBook,
    getAllBooksFromDB,
    getSingleBookfromDB,
    updateBookIntoDB,
    deleteBookFromDB

}