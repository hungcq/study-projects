exports.fixVietnamese = function (text) {
	let result = ''
	for (let i = 0; i < text.length; i++) {
		switch (text[i]) {
      case 'á':case 'à':case 'ả':case 'ã':case 'ạ':case 'Á':case 'À':case 'Ả':case 'Ã':case 'Ạ':
      case 'ă':case 'Ă':
      case 'ắ':case 'ằ':case 'ẳ':case 'ẵ':case 'ặ':case 'Ắ':case 'Ằ':case 'Ẳ':case 'Ẵ':case 'Ặ':
      case 'â':case 'Â':
      case 'ấ':case 'ầ':case 'ẩ':case 'ẫ':case 'ậ':case 'Ấ':case 'Ầ':case 'Ẩ':case 'Ẫ':case 'Ậ':
	      result += 'a';
	      break;
      case 'é':case 'è':case 'ẻ':case 'ẽ':case 'ẹ':case 'É':case 'È':case 'Ẻ':case 'Ẽ':case 'Ẹ':
      case 'ê':case 'Ê':
      case 'ế':case 'ề':case 'ể':case 'ễ':case 'ệ':case 'Ế':case 'Ề':case 'Ể':case 'Ễ':case 'Ệ':
        result += 'e';
        break;
      case 'í':case 'ì':case 'ỉ':case 'ĩ':case 'ị':case 'Í':case 'Ì':case 'Ỉ':case 'Ĩ':case 'Ị':
        result += 'i';
        break;
      case 'ó':case 'ò':case 'ỏ':case 'õ':case 'ọ':case 'Ó':case 'Ò':case 'Ỏ':case 'Õ':case 'Ọ':
      case 'ô':case 'Ô':
      case 'ố':case 'ồ':case 'ổ':case 'ỗ':case 'ộ':case 'Ố':case 'Ồ':case 'Ổ':case 'Ỗ':case 'Ộ':
      case 'ơ':case 'Ơ':
      case 'ớ':case 'ờ':case 'ở':case 'ỡ':case 'ợ':case 'Ớ':case 'Ờ':case 'Ở':case 'Ỡ':case 'Ợ':
        result += 'o';
        break;
      case 'ú':case 'ù':case 'ủ':case 'ũ':case 'ụ':case 'Ú':case 'Ù':case 'Ủ':case 'Ũ':case 'Ụ':
      case 'ư':case 'Ư':
      case 'ứ':case 'ừ':case 'ử':case 'ữ':case 'ự':case 'Ứ':case 'Ừ':case 'Ử':case 'Ữ':case 'Ự':
        result += 'u';
        break;
     	case 'ý':case 'ỳ':case 'ỷ':case 'ỹ':case 'ỵ':case 'Ý':case 'Ỳ':case 'Ỷ':case 'Ỹ':case 'Ỵ':
        result += 'y';
        break;
      default:
      	result += text[i].toLowerCase()
     }
  }
	return result
}