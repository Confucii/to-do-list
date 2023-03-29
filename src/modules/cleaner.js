export default function cleaner(elem) {
  while (elem.firstChild) {
    elem.removeChild(elem.firstChild);
  }
}
