import ReactDOM from 'react-dom/client'
import store from "~/store";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import './assets/css/tailwind.css'
import AppRoutes from "./routes";

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Provider store={store}>
            <AppRoutes />
        </Provider>
    </BrowserRouter>
)