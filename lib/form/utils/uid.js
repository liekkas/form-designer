function gen(count) {
  var out = "";
  for (var i = 0; i < count; i++) {
    out += ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
  }
  return out;
}

//标准GUID 
//示例 6fdf6ffc-ed77-94fa-407e-a7b86ed9e59d
export function guid() {
  return [gen(2), gen(1), gen(1), gen(1), gen(3)].join("-");
}

//唯一实例
//示例 
// uid() => ed7794fa34fe
// uid(2,'-') => ed77-94fa
// uid(3, '*') => ed77*94fa*34fe
export default function uid() {
  var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;
  var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var arr = [];
  for (var index = 0; index < count; index++) {
    arr.push(gen(1));
  }
  return arr.join(separator);
}