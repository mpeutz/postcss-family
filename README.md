
# Postcss-Family
PostCSS-Family is a partial port of [Family.scss](https://lukyvj.github.io/family.scss/). This port is is missing the child-index mixin. 

> Family is a set of **26** smart Postcss functions which will help you to manage
> the style of `:nth-child`'ified elements, in an easy and classy way.
> *- Family.scss*

:warning: requires postcsss nesting plugin called after postcss-family

## Usage

You can call the family command using the at rule `@fam` followed by the appropriate keyword and parameter (if applicable).

```css
/* input.css */
ul li {
  background: blue;

  @fam first(3) {
    background: blue;
  }
}
```

```css
/* output.css */
ul li {
  background: blue;
}
ul li:nth-child(-n + 3) {
  background: blue;
}

```

## PostCSS-Family Available keywords

#### Sequence Queries

- first
- last
- after-first
- from-end
- between
- even-between
- odd-between
- n-between
- all-but
- each
- every
- first-from-last
- middle
- all-but-first-last



#### Quantity Queries

- first-of
- last-of
- at-least
- at-most
- in-between

#### No Parameter Queries

- first-child
- even
- odd
- all-but-first
- all-but-last
- first-last
- unique
- only

