# sveltify

A Browserify transform allowing you to require [Svelte](https://svelte.technology) templates.

Defaults to transforming all `.html` and `.svelte` files.  You can overwrite the transformed extensions with the `extensions` argument.

**If you're using `svelte@2`, you need `sveltify@2`, and vice versa.**

## Usage

```sh
browserify -t [ sveltify --extensions [.htmlz .svelte] ] myfile.js
```

```json
{
  "browserify": {
    "transform": [
      [
        "sveltify",
        {
          "extensions": [
            ".html",
            ".svelte"
          ]
        }
      ]
    ]
  }
}
```

## Svelte Options

Pass options to the Svelte compiler with the `svelte` property:

```sh
browserify -t [ sveltify --svelte [ --dev=true ] ] myfile.js
```

```json
{
  "browserify": {
    "transform": [
      [
        "sveltify",
        {
          "svelte": {
            "dev": true
          }
        }
      ]
    ]
  }
}
```

## License

[WTFPL](http://wtfpl2.com/)
