import morgan from 'morgan';

morgan.token('body', (req) => console.log(req.body) || JSON.stringify(req.body));
const logRequest = morgan(':method :url :status :total-time[3] :body');

export default logRequest;
