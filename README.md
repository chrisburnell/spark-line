# spark-line

> Turn any array of integers into a fun little chart.

## Installation

- **With npm:** `npm install @chrisburnell/spark-line`
- **Direct download:** [https://github.com/chrisburnell/spark-line/archive/main.zip](https://github.com/chrisburnell/spark-line/archive/main.zip)

## Usage

Include `spark-line.js` in your page however you like (as-is, as part of a build script, etc.).

Use `<spark-line>` in your HTML!

```html
<spark-line values="1,2,3,5,8,13,21"></spark-line>
```

Element attributes:

- `values`: comma-delimited string of integers *(required)*
- `line-width`: defines the width/thickness of the line as an integer *(default = 2)*
- `curve`: toggles applying curves (cardinal splines) to the line *(default = true)*
- `endpoint`: toggles the display of a point at the end of the line *(default = true)*
- `color`: defines the color of the line *(default = currentColor)*
- `endpoint-color`: defines the color of the endpoint *(defaults to whatever color is defined as)*
- `start-label`: creates a label before the chart
- `end-label`: creates a label after the chart

## Examples and more

I wrote more about **spark-line** and laid out some examples here: [https://chrisburnell.com/spark-line/](https://chrisburnell.com/spark-line/).

## Authors

So far, it’s just myself, [Chris Burnell](https://chrisburnell.com), but I welcome collaborators with ideas to bring to the table!
