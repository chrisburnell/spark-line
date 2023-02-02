# spark-line

> Turn any array of integers into a fun little chart.

## Installation

-   **With npm:** `npm install @chrisburnell/spark-line`
-   **Direct download:** [https://github.com/chrisburnell/spark-line/archive/main.zip](https://github.com/chrisburnell/spark-line/archive/main.zip)

## Usage

Include `spark-line.js` in your page however you like (as-is, as part of a build script, etc.).

Use `<spark-line>` in your HTML!

```html
<spark-line values="1,2,3,5,8,13,21"></spark-line>
```

Element attributes:

-   `values`: comma-delimited string of integers _(required)_
-   `line-width`: defines the width/thickness of the line as an integer _(default = 2)_
-   `curve`: toggles applying curves (cardinal splines) to the line _(default = true)_
-   `endpoint`: toggles the display of a point at the end of the line _(default = true)_
-   `color`: defines the color of the line _(default = currentColor)_
-   `endpoint-color`: defines the color of the endpoint _(defaults to whatever color is defined as)_
-   `points`: supercedes endpoint; comma-delimited string of integers representing at which pairing values you want points to appear at; arrays of a length less than the length of the values array will be looped over according to values
-   `colors`: supercedes endpoint-color; comma-delimited string of integers representing the colour of the paired points; arrays of a length less than the length of the values array will be looped over according to values
-   `start-label`: creates a label before the chart
-   `end-label`: creates a label after the chart

## Examples and more

I wrote more about **spark-line** and laid out some examples here: [https://chrisburnell.com/spark-line/](https://chrisburnell.com/spark-line/).

## Contributing

Contributions of all kinds are welcome! Please [submit an Issue on GitHub](https://github.com/chrisburnell/spark-line/issues) or [get in touch with me](https://chrisburnell.com/about/#contact) if you’d like to do so.

## License

This project is licensed under a CC0 license.
