import "./App.css";
import Home from "./pages/home/home";
import ResultadoCompra from "./pages/ResultadoCompra/ResultadoCompra"
import { BrowserRouter as Router, Route, Routes} from "react-router"
import ProtectedRoutes from "./utils/ProtectedRoutes";

function App() {
	return (
		<Router>
			<Routes>
				<Route element={<Home/>} exact path="/"/>
				<Route element={<ResultadoCompra/>} exact path="/resultadoCompra"/>
			</Routes>
		</Router>
	);
}

export default App;
