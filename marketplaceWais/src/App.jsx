import "./App.css";
import Home from "./pages/Home/Home.jsx";
import ResultadoCompra from "./pages/ResultadoCompra/ResultadoCompra"
import { BrowserRouter as Router, Route, Routes} from "react-router"
import ProtectedRoutes from "./utils/ProtectedRoutes";

function App() {
	return (
		<Router>
			<Routes>
				<Route element={<Home/>} exact path="/Marketplace"/>
				<Route element={<ResultadoCompra/>} exact path="/Marketplace/resultadoCompra"/>
			</Routes>
		</Router>
	);
}

export default App;
