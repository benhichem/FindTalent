import { ProgressBar } from "../misc/progressbar.js";

const Bar = new ProgressBar();

Bar.init(10);

Bar.update(5);

Bar.update(6);

Bar.update(7);
