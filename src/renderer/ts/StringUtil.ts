const BR = /<br>/gi;
class StringUtil {

    static replaceBr2NewLine(str: string, nl?: string) {
        return str.replace(BR, nl ? nl : "\r\n");
    }

    static urlToReadable(text: string, replaceStr?: string): string {
        var exp = /(\b(h?ttps?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
        return text.replace(exp, replaceStr ? replaceStr : "ユーアールエル");
    }

    static anchorToReadable(text: string, replaceStr?: string): string {
        var exp = /<a href="\/bbs\/read.cgi\/[a-zA-Z]+\/[0-9]+\/[0-9]+\/([0-9]{1,4})" target="_blank">&gt;&gt;[0-9]{1,4}<\/a>/gi;
        return text.replace(exp,
            replaceStr ? replaceStr : "レス$1");
    }

    static urlToLink(text: string): string {
        var exp = /(\b(h?ttps?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
        return text.replace(exp,
            "<a href= \"" + ('$1'.lastIndexOf("ttp", 0) === 0 ? "" : "h") + '$1' + "\" target=\"_blank\">$1</a>");
    }

    static anchorToInnerLink(text: string): string {
        var exp = /<a href="\/bbs\/read.cgi\/[a-zA-Z]+\/[0-9]+\/[0-9]+\/([0-9]{1,4})" target="_blank">&gt;&gt;[0-9]{1,4}<\/a>/gi;
        return text.replace(exp,
            "<a href=\"#MESSAGE-$1\" >&gt;&gt;$1</a>");
    }
    static isAA(text: string, lineLimit?: number, regexp?: RegExp): boolean {
        let regex = /(＼|∪|∩|⌒|从|;;;|:::|\,\,\,|'''|━━━|[|:;, 　]{2}[|!:;.,])/ig;
        console.log(text.split(/\r\n|\r|\n/).length);
        if (text.split(/\r\n|\r|\n/).length < (lineLimit ? lineLimit : 3)) return false;
        return regex.test(text);
        // return text.indexOf('　 ') !== -1
    }

    /**
* 半角カタカナを全角カタカナに変換
* 
* @param {String} str 変換したい文字列
*/
    static replaceHANKAKUtoZENKAKU(str: string): string {
        var kanaMap = {
            'ｶﾞ': 'ガ', 'ｷﾞ': 'ギ', 'ｸﾞ': 'グ', 'ｹﾞ': 'ゲ', 'ｺﾞ': 'ゴ',
            'ｻﾞ': 'ザ', 'ｼﾞ': 'ジ', 'ｽﾞ': 'ズ', 'ｾﾞ': 'ゼ', 'ｿﾞ': 'ゾ',
            'ﾀﾞ': 'ダ', 'ﾁﾞ': 'ヂ', 'ﾂﾞ': 'ヅ', 'ﾃﾞ': 'デ', 'ﾄﾞ': 'ド',
            'ﾊﾞ': 'バ', 'ﾋﾞ': 'ビ', 'ﾌﾞ': 'ブ', 'ﾍﾞ': 'ベ', 'ﾎﾞ': 'ボ',
            'ﾊﾟ': 'パ', 'ﾋﾟ': 'ピ', 'ﾌﾟ': 'プ', 'ﾍﾟ': 'ペ', 'ﾎﾟ': 'ポ',
            'ｳﾞ': 'ヴ', 'ﾜﾞ': 'ヷ', 'ｦﾞ': 'ヺ',
            'ｱ': 'ア', 'ｲ': 'イ', 'ｳ': 'ウ', 'ｴ': 'エ', 'ｵ': 'オ',
            'ｶ': 'カ', 'ｷ': 'キ', 'ｸ': 'ク', 'ｹ': 'ケ', 'ｺ': 'コ',
            'ｻ': 'サ', 'ｼ': 'シ', 'ｽ': 'ス', 'ｾ': 'セ', 'ｿ': 'ソ',
            'ﾀ': 'タ', 'ﾁ': 'チ', 'ﾂ': 'ツ', 'ﾃ': 'テ', 'ﾄ': 'ト',
            'ﾅ': 'ナ', 'ﾆ': 'ニ', 'ﾇ': 'ヌ', 'ﾈ': 'ネ', 'ﾉ': 'ノ',
            'ﾊ': 'ハ', 'ﾋ': 'ヒ', 'ﾌ': 'フ', 'ﾍ': 'ヘ', 'ﾎ': 'ホ',
            'ﾏ': 'マ', 'ﾐ': 'ミ', 'ﾑ': 'ム', 'ﾒ': 'メ', 'ﾓ': 'モ',
            'ﾔ': 'ヤ', 'ﾕ': 'ユ', 'ﾖ': 'ヨ',
            'ﾗ': 'ラ', 'ﾘ': 'リ', 'ﾙ': 'ル', 'ﾚ': 'レ', 'ﾛ': 'ロ',
            'ﾜ': 'ワ', 'ｦ': 'ヲ', 'ﾝ': 'ン',
            'ｧ': 'ァ', 'ｨ': 'ィ', 'ｩ': 'ゥ', 'ｪ': 'ェ', 'ｫ': 'ォ',
            'ｯ': 'ッ', 'ｬ': 'ャ', 'ｭ': 'ュ', 'ｮ': 'ョ',
            '｡': '。', '､': '、', 'ｰ': 'ー', '｢': '「', '｣': '」', '･': '・'
        };

        var reg = new RegExp('(' + Object.keys(kanaMap).join('|') + ')', 'g');
        return str
            .replace(reg, function (match) {
                return kanaMap[match];
            })
            .replace(/ﾞ/g, '゛')
            .replace(/ﾟ/g, '゜');
    }
}

export default StringUtil;