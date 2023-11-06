import ReactDOM from 'react-dom/client'
import store from "~/store";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import './assets/css/tailwind.css'
import AppRoutes from "./routes";
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Provider store={store}>
            <Toaster position='top-right' />
            <AppRoutes />
        </Provider>
    </BrowserRouter>
)