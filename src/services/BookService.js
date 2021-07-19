import API from './api';

export default class BookService {

    static getReportLast7 = () =>
    {
       return API.get('/api/book/getteststimereportlast7');
    }


}