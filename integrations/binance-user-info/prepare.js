function prepare(ctx, manifest) {
  const cookies = ctx.cookies;

  const authCookie = cookies["p20t"];
  const csrfToken = cookies["cr00"];
  if (!authCookie || !csrfToken) {
    return false;
  }

  // Minified MD5 from https://www.myersdaily.org/joseph/javascript/md5-text.html
  // prettier-ignore
  function _md5(a) {
    // kinda a hack to not format the whole md5 code block
    function md5cycle(_,$){var f=_[0],h=_[1],i=_[2],n=_[3];f=ff(f,h,i,n,$[0],7,-680876936),n=ff(n,f,h,i,$[1],12,-389564586),i=ff(i,n,f,h,$[2],17,606105819),h=ff(h,i,n,f,$[3],22,-1044525330),f=ff(f,h,i,n,$[4],7,-176418897),n=ff(n,f,h,i,$[5],12,1200080426),i=ff(i,n,f,h,$[6],17,-1473231341),h=ff(h,i,n,f,$[7],22,-45705983),f=ff(f,h,i,n,$[8],7,1770035416),n=ff(n,f,h,i,$[9],12,-1958414417),i=ff(i,n,f,h,$[10],17,-42063),h=ff(h,i,n,f,$[11],22,-1990404162),f=ff(f,h,i,n,$[12],7,1804603682),n=ff(n,f,h,i,$[13],12,-40341101),i=ff(i,n,f,h,$[14],17,-1502002290),h=ff(h,i,n,f,$[15],22,1236535329),f=gg(f,h,i,n,$[1],5,-165796510),n=gg(n,f,h,i,$[6],9,-1069501632),i=gg(i,n,f,h,$[11],14,643717713),h=gg(h,i,n,f,$[0],20,-373897302),f=gg(f,h,i,n,$[5],5,-701558691),n=gg(n,f,h,i,$[10],9,38016083),i=gg(i,n,f,h,$[15],14,-660478335),h=gg(h,i,n,f,$[4],20,-405537848),f=gg(f,h,i,n,$[9],5,568446438),n=gg(n,f,h,i,$[14],9,-1019803690),i=gg(i,n,f,h,$[3],14,-187363961),h=gg(h,i,n,f,$[8],20,1163531501),f=gg(f,h,i,n,$[13],5,-1444681467),n=gg(n,f,h,i,$[2],9,-51403784),i=gg(i,n,f,h,$[7],14,1735328473),h=gg(h,i,n,f,$[12],20,-1926607734),f=hh(f,h,i,n,$[5],4,-378558),n=hh(n,f,h,i,$[8],11,-2022574463),i=hh(i,n,f,h,$[11],16,1839030562),h=hh(h,i,n,f,$[14],23,-35309556),f=hh(f,h,i,n,$[1],4,-1530992060),n=hh(n,f,h,i,$[4],11,1272893353),i=hh(i,n,f,h,$[7],16,-155497632),h=hh(h,i,n,f,$[10],23,-1094730640),f=hh(f,h,i,n,$[13],4,681279174),n=hh(n,f,h,i,$[0],11,-358537222),i=hh(i,n,f,h,$[3],16,-722521979),h=hh(h,i,n,f,$[6],23,76029189),f=hh(f,h,i,n,$[9],4,-640364487),n=hh(n,f,h,i,$[12],11,-421815835),i=hh(i,n,f,h,$[15],16,530742520),h=hh(h,i,n,f,$[2],23,-995338651),f=ii(f,h,i,n,$[0],6,-198630844),n=ii(n,f,h,i,$[7],10,1126891415),i=ii(i,n,f,h,$[14],15,-1416354905),h=ii(h,i,n,f,$[5],21,-57434055),f=ii(f,h,i,n,$[12],6,1700485571),n=ii(n,f,h,i,$[3],10,-1894986606),i=ii(i,n,f,h,$[10],15,-1051523),h=ii(h,i,n,f,$[1],21,-2054922799),f=ii(f,h,i,n,$[8],6,1873313359),n=ii(n,f,h,i,$[15],10,-30611744),i=ii(i,n,f,h,$[6],15,-1560198380),h=ii(h,i,n,f,$[13],21,1309151649),f=ii(f,h,i,n,$[4],6,-145523070),n=ii(n,f,h,i,$[11],10,-1120210379),i=ii(i,n,f,h,$[2],15,718787259),h=ii(h,i,n,f,$[9],21,-343485551),_[0]=add32(f,_[0]),_[1]=add32(h,_[1]),_[2]=add32(i,_[2]),_[3]=add32(n,_[3])}function cmn(_,$,f,h,i,n){return $=add32(add32($,_),add32(h,n)),add32($<<i|$>>>32-i,f)}function ff(_,$,f,h,i,n,r){return cmn($&f|~$&h,_,$,i,n,r)}function gg(_,$,f,h,i,n,r){return cmn($&h|f&~h,_,$,i,n,r)}function hh(_,$,f,h,i,n,r){return cmn($^f^h,_,$,i,n,r)}function ii(_,$,f,h,i,n,r){return cmn(f^($|~h),_,$,i,n,r)}function md51(_){txt="";var $,f=_.length,h=[1732584193,-271733879,-1732584194,271733878];for($=64;$<=_.length;$+=64)md5cycle(h,md5blk(_.substring($-64,$)));_=_.substring($-64);var i=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for($=0;$<_.length;$++)i[$>>2]|=_.charCodeAt($)<<($%4<<3);if(i[$>>2]|=128<<($%4<<3),$>55)for(md5cycle(h,i),$=0;$<16;$++)i[$]=0;return i[14]=8*f,md5cycle(h,i),h}function md5blk(_){var $,f=[];for($=0;$<64;$+=4)f[$>>2]=_.charCodeAt($)+(_.charCodeAt($+1)<<8)+(_.charCodeAt($+2)<<16)+(_.charCodeAt($+3)<<24);return f}var hex_chr="0123456789abcdef".split("");function rhex(_){for(var $="",f=0;f<4;f++)$+=hex_chr[_>>8*f+4&15]+hex_chr[_>>8*f&15];return $}function hex(_){for(var $=0;$<_.length;$++)_[$]=rhex(_[$]);return _.join("")}function md5(_){return hex(md51(_))}function add32(_,$){return _+$&4294967295}if("5d41402abc4b2a76b9719d911017c592"!=md5("hello"))function add32(_,$){var f=(65535&_)+(65535&$);return(_>>16)+($>>16)+(f>>16)<<16|65535&f}
    return md5(a);
  }

  manifest.request.set("csrftoken", _md5(cookies["cr00"].value));
  manifest.request.set("p20t", cookies["p20t"].value);

  return true;
}
