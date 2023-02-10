// 作用：将css内容，通过style标签插入到页面中
// source为要处理的css源文件
function loader(source) {
  let result = `
    let style = document.createElement('style');
    style.setAttribute("type", "text/css"); 
    style.innerHTML = ${source};
    document.head.appendChild(style)
    `;

    let aaa = ()=> console.log('aaaaaaaaaaaa')
  return aaa;
}
module.exports = loader;
