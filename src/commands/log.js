import chalk from "chalk";

const COLOR = "#22edfc";

export default function(text) {
  console.log(chalk.hex(COLOR)(text));
}
