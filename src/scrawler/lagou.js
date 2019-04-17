const request = require('request');
const uuid = require('uuid/v4');
const fakeUa = require('fake-useragent');
const FormData = require('form-data');
const fetch = (opts) => new Promise((resolve, reject) => {
	opts.json = true;
	request(opts, (err, resp, body) => {
		if (err) {
			reject(err);
			return;
		}
		resolve(body);
	});
});
module.exports = async function register(kn, recent = 5) {
	const url = `https://www.lagou.com/jobs/list_${kn}`;
	const queue = Array.apply(null, { length: recent })
	                   .map((_, i) => {
		                   const fd = new FormData();
		                   const postData = {
			                   first: i === 0,
			                   pn   : i + 1,
			                   kn
		                   };
		                   Object.keys(postData)
		                         .forEach(k => fd.append(k, postData[k]));
		                   console.log(fd)
		                   return fetch({
			                   url     : url,
			                   method  : 'POST',
			                   qs      : {
				                   px      : 'default',
				                   jd      : 'B轮,C轮,D轮及以上,上市公司,不需要融资',
				                   city    : '北京',
				                   district: '朝阳区',
				                   bizArea : '望京'
			                   },
			                   formData: fd,
			                   headers : {
				                   'Accept'         : 'application/json, text/javascript, */*; q=0.01',
				                   'Accept-Encoding': 'gzip, deflate, br',
				                   'Accept-Language': 'zh-CN,zh;q=0.9',
				                   'Connection'     : 'keep-alive',
				                   'Content-Length' : '25',
				                   'Content-Type'   : 'application/x-www-form-urlencoded; charset=UTF-8',
				                   'Cookie'         : '_ga=GA1.2.161331334.1522592243;' +
				                   'user_trace_token=20180401221723-' + uuid() + '; ' +
				                   'LGUID=20180401221723-' + uuid() + '; ' +
				                   'index_location_city=%E6%B7%B1%E5%9C%B3; ' +
				                   'JSESSIONID=' + uuid() + '; ' +
				                   '_gid=GA1.2.1140631185.1523090450; ' +
				                   'Hm_lvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1522592243,1523090450; ' +
				                   'TG-TRACK-CODE=index_search; _gat=1; ' +
				                   'LGSID=20180407221340-' + uuid() + '; ' +
				                   'PRE_UTM=; PRE_HOST=; PRE_SITE=https%3A%2F%2Fwww.lagou.com%2F; ' +
				                   'PRE_LAND=https%3A%2F%2Fwww.lagou.com%2Fjobs%2Flist_golang%3FlabelWords%3D%26fromSearch%3Dtrue%26suginput%3D; ' +
				                   'Hm_lpvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1523110425; ' +
				                   'LGRID=20180407221344-' + uuid() + '; ' +
				                   'SEARCH_ID=' + uuid(),
				                   'Host'           : 'www.lagou.com',
				                   'Origin'         : 'https://www.lagou.com',
				                   'Referer'        : 'https://www.lagou.com/jobs/list_golang?labelWords=&fromSearch=true&suginput=',
				                   'User-Agent'     : fakeUa()
			                   }
		                   });
	                   });
	const results = await Promise.all(queue);
	console.log(results);
};
