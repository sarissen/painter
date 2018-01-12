function stringGen(len) {
  let text = '';

  const charset = 'abcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < len; i += 1) {
    text += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  return text.trim();
}

module.exports = stringGen;
