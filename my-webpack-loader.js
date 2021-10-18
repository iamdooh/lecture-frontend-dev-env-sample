module.exports = function myWebpackLoader(content) {
  console.log('myWebpackLoader가 실행 되었습니다.');
  return content.replace('console.log(', 'alert(');
};
