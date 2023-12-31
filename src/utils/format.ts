export type instanceObject = Record<string, string>;

/**
 * JSON转url参数
 * @param data Json格式数据
 * */
export const formatJsonToUrlParams = (data: instanceObject): string => {
    return typeof data === 'object'
        ? Object.keys(data)
              .map((key) => {
                  return `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`;
              })
              .join('&')
        : '';
};

export default formatJsonToUrlParams;
