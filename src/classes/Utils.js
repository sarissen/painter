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

  static isEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  static sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default Utils;
