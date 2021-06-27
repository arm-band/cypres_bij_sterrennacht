/**
 * zonnebloemen : 設定を生成する
 */
class zonnebloemen
{
    /**
     * getParameters         : 設定用のフラグを生成
     *
     * @param {booelan} flag : フラグ
     *
     * @return {Object}      : 設定パラメータの内容
     */
    getParameters (flag)
    {
        return flag === 'BEFORE' ? {
            outStr: 'before',
            urlKey: 'ref',
            flag  : true,
        } : {
            outStr: 'after',
            urlKey: 'test',
            flag  : false,
        };
    };
    /**
     * getConfig             : 設定を生成
     *
     * @param {Object} data  : JSONファイル のデータ
     * @param {booelan} flag : フラグ
     *
     * @return {Object}      : 設定の内容
     */
    getConfig (data, flag)
    {
        if (data !== undefined && data !== null && Object.keys(data).length > 0) {
            flag ? data.commons['trashAssetsBeforeRuns'] = true : data.commons['trashAssetsBeforeRuns'] = false;
        }
        return data;
    };
};

module.exports = zonnebloemen;
