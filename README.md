# FluxCSS

![CSS Brotli Size](https://img.badgesize.io/FluxCSS/FluxCSS/main/dist/css/fluxcss.min.css?compression=brotli&label=CSS%20Brotli%20size)
![JS Brotli Size](https://img.badgesize.io/FluxCSS/FluxCSS/main/dist/js/fluxcss-bundle.min.js?compression=brotli&label=JS%20Brotli%20size)

![NPM](https://img.shields.io/npm/v/@fluxcss/fluxcss?logo=npm&logoColor=fff)
![NPM](https://img.shields.io/npm/dt/@fluxcss/fluxcss?logo=npm&logoColor=fff)

<p align="center"><img src="https://fluxcss.org/assets/logos/logo.svg" width="150" alt="fluxcss logo"></p>

FluxCSS is a lightweight and flexible CSS framework designed to simplify modern web development. Visit our official website: https://fluxcss.org

## Key Features

- Responsive grid system based on Flexbox and CSS Grid
- Customizable color palette with variations
- Pre-designed UI components (buttons, alerts, badges, etc.)
- Utilities for typography, borders, shadows, and more
- Modular approach for easy customization

## Installation

To use FluxCSS in your project, you can either:

1. Download the CSS files from this repository
2. Use a CDN
```html
<link rel="stylesheet" href="https://app.unpkg.com/@fluxcss/fluxcss@0.0.5/files/dist/css/fluxcss.min.css">
```
3. Install via npm
```bash
npm i @fluxcss/fluxcss
```
## Usage

Include the CSS file in your HTML project:

```
<link rel="stylesheet" href="path/to/fluxcss.css">
```

## Customization

FluxCSS uses CSS variables for easy customization. Modify the values in the `:root` section of the CSS file to adapt the framework to your design.

## Documentation

Comprehensive documentation is currently under development. In the meantime, you can refer to the comments in the CSS file to understand the usage of various classes and components.

## Examples

```html
<div class="container">
  <div class="row">
    <div class="col s-12 s-md-6 s-lg-4">
      <button class="btn btn-primary">Primary Button</button>
    </div>
    <div class="col s-12 s-md-6 s-lg-4">
      <div class="alert alert-success">
        Success Alert
      </div>
    </div>
    <div class="col s-12 s-lg-4">
      <span class="badge badge-info">Info Badge</span>
    </div>
  </div>
</div>
```

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

FluxCSS is licensed under the GPL License. See the [LICENSE](LICENSE) file for more details.