import { useNavigate } from "react-router";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Breadcrumbs() {
	const navigate = useNavigate();

	function onClick(){ 
		localStorage.removeItem('token');
		navigate('/')
	}

	return (
		<div className="breadcrumbs">
			<div className="container">
				<div className="breadcrumb title">
					<h1>TO DO LISTS</h1>
				</div>
				<div className="breadcrumb_icons">
					<div className="breadcrumb profile">
						
					</div>
					<div className="breadcrumb logout pointer" onClick={onClick}>
						
					</div>
					<ThemeSwitcher />
				</div>
			</div>
		</div>
	)
}