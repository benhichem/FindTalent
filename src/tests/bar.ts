// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { ProgressBar } from "../misc/progressbar.js";
import { get } from "https";

const Bar = new ProgressBar();

Bar.init(10);

Bar.update(5);

Bar.update(6);

Bar.update(7);
/* const request = get(URL, response => {
	const total = response.headers["content-length"];
	let current = 0;

	Bar.init(total);

	response.on("data", chunk => {
		current += chunk.length;
		Bar.update(current);
	});

	response.on("error", e => console.log(e.message));

	response.on("end", () => console.log("Finished!"));
}); */
