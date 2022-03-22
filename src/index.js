import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import raw from "./startup.txt";

ReactDOM.render(
	<React.StrictMode>
		<>
			{fetch(raw)
				.then((r) => r.text())
				.then(console.log) && <></>}
			{(console.log = console.warn = console.error = () => {})}
		</>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
