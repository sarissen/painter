class Utils {
  static cumulativeOffset(element) {
    let top = 0;
    let left = 0;
    let currElement = element;
    do {
      top += currElement.offsetTop || 0;
      left += currElement.offsetLeft || 0;
      currElement = currElement.offsetParent;
    } while (currElement);

    return {
      top,
      left,
    };
  }
}

export default Utils;
