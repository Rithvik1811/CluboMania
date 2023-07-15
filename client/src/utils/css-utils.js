// https://stackoverflow.com/a/53251599
// const classLister = (styleObject) => (classList) =>
//   classList.reduce((list, myClass) => {
//     let output = list;
//     if (styleObject[myClass]) {
//       if (list) output += " ";
//       output += styleObject[myClass];
//     }
//     return output;
//   }, "");
// const classes = classLister(styles);
// export { classLister };

class StyleManager {
  constructor(styles) {
    this.styles = styles;
  }
  classes(classArray, globals = []) {
    let output = "";
    classArray.forEach((className) => {
      output += `${this.styles[className]} `;
    });
    output += globals.join(" ");
    return output.trim();
  }
}

export default StyleManager;
