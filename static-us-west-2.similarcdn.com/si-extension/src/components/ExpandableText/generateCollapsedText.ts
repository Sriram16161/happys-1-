function generateCollapsedText(elem: HTMLElement, text: string): string {
  const origText = elem.textContent; // get original element text
  try {
    // try to shrink the text to fit in
    let safeText = ''; // the text that surely fits in
    let restText = text; // the rest of text currently trying to fit in a subset of it
    // while there's some text trying to fit in
    while (restText.length > 0) {
      // hold the indexes of current cut and previous cut
      let curCutLen = restText.length;
      let lastCutLen = curCutLen;
      // while we got some text trying to add to safe, and the element is overflowing
      while (curCutLen > 0 && elem.scrollHeight > elem.clientHeight) {
        lastCutLen = curCutLen; // set previous cut index to current
        curCutLen = Math.floor(lastCutLen / 2); // take the middle from the previous cut index
        elem.textContent = safeText + restText.substr(0, curCutLen); // set text to safe + the subset trying to fit in
      }
      safeText = elem.textContent || ''; // set safe text to the text we got now
      // if no additional text can be added to fit in, then finish (we got the text we want)
      if (curCutLen === 0) {
        break;
      }
      // set the rest text to the last subset we tried to fit in that was failed, so we'll try to get subset from that text to fit in
      restText = restText.substring(curCutLen, lastCutLen);
      elem.textContent = safeText + restText; // add the last failed subset text to the content (it will surely overflow)
    }
    return safeText;
  } finally {
    // set back original element text
    elem.textContent = origText;
  }
}

export default generateCollapsedText;
