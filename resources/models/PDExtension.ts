const _db = require(`${process.env.NODE}/resources/models/mysql`);

function _KEY(length: number) {
	var str = "";
	for (let i = 0; i < length; i++) {
		const char: string = "abcdefghijklmnopurstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		str += char.charAt(Math.floor(Math.random() * char.length));
	};
	return str;
};

const fitTag: RegExp = /(#|＃)[A-Za-z0-9\u4e00-\u9fa5\_]{1,}/g;
const fitLineURL1: RegExp = /https:\/\/line.me\/ti\/p\/(%40|@)?[0-9A-Za-z\.\-\_]{1,}/g;
const fitLineURL2: RegExp = /https:\/\/lin.ee\/(%40|@)?[0-9A-Za-z\.\-\_]{1,}/g;
const fitLineID: RegExp = /(%40|@)?[0-9A-Za-z\.\-\_]{1,}/g;
const fitMessager: RegExp = /(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?/g;
const fitURL: RegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
const fitEmail: RegExp = /([a-zA-Z0-9_\.-]+)@([\da-zA_Z\.-]+)\.([a-zA-Z\.]{2,6})/g;
const fitPhone: RegExp = /\(?\+?(0|886)(-|\))?9[0-9]{2}-?[0-9]{3}-?[0-9]{3}/g;
const fitHTML: RegExp = /\<(script|a|p|b|h1|h2|h3|h4|h5|h6|div|li)([A-Za-z0-9 -_="'@:/]{0,})\>/gi;
const fitSpace: RegExp = /(\n|\s)/g;

const lengthStoL = (a: string, b: string) => a.length - b.length;
const lengthLtoS = (a: string, b: string) => b.length - a.length;
const random = () => Math.random() > .5 ? -1 : 1;

// interface String {
// 	/* ---------------------------------------- */ insert(index: number, string: string): string;
// 	/* ---------------------------------------- */ regexTag(): any;
// 	/* ---------------------------------------- */ getTags(): any;
// 	/* ---------------------------------------- */ getMessager(): string;
// 	/* ---------------------------------------- */ delURL(): string;
// 	/* ---------------------------------------- */ fitHref(): string;
// 	/* ---------------------------------------- */ fitHTML(): string;
// 	/* ---------------------------------------- */ regexURL(): any;
// 	/* ---------------------------------------- */ regexEmail(): any;
// 	/* ---------------------------------------- */ regexPhone(): any;
// 	/* ---------------------------------------- */ regexLine(): any;
// 	/* ---------------------------------------- */ getEmail(): string;
// 	/* ---------------------------------------- */ getPhone(): string;
// 	/* ---------------------------------------- */ getLine(): string;
// 	/* ---------------------------------------- */ isEmail(): boolean;
// 	/* ---------------------------------------- */ isHTML(): boolean;
// 	/* ---------------------------------------- */ isJSON(): boolean;
// 	/* ---------------------------------------- */ isEmpty(): boolean;
// 	/* ---------------------------------------- */ getURL(): string;
// 	/* ---------------------------------------- */ getURLs(): any;
// 	/* ---------------------------------------- */ delTopBottom(): string;
// 	/* ---------------------------------------- */ delWrap(): string;
// 	/* ---------------------------------------- */ delSpace(): string;
// 	/* ---------------------------------------- */ toArray(split: string): string[];
	
	
// 	/**
// 	 * joball.tw usage
// 	 */
// 	_error(req: any, res: any, err: Error): any;
// 	_get_404(res: any): any;
// 	_post_404(res: any): any;
// 	_report(req: any, err: Error): any;
// 	_info(body: string): any;
// 	_mail(json: any): any;
// 	_updateUserWatch(req: any): any;
// 	_updateServiceWatch(user_id: string, req: any): any;
// 	_updateCaseWatch(user_id: string, req: any): any;
// 	_updateAlbumWatch(user_id: string, req: any): any;
// 	_htmlTitle(q: string): string;
// 	_htmlDescriptionRow(q: string): string;
// 	_htmlDescriptionBody(): string;
// 	_htmlTag(description: string, q: string): string;
// 	_mark(keywords: string): string;
// };
// /**
//  * joball.tw usage
//  */
// String.prototype._report = function (req: any, err: Error) {
// 	const mailer = require(`${process.env.NODE}/models/mailer`);
// 	mailer.sendMail({
// 		from: "JOBALL找專家<noreply@joball.tw>",
// 		to: "chiuchingwei@icloud.com",
// 		subject: `Error: ${req.originalUrl} [${String(this)}]`,
// 		html: `Req: {<br>
// 			params: ${JSON.stringify(req.params)},<br>
// 			query : ${JSON.stringify(req.query)},<br>
// 			body	: ${JSON.stringify(req.body)}<br>
// 		}<br>
// 		--------<br>
// 		Error: ${err.message}`,
// 	}, (err: Error) => {
// 		if (err) return console.error(err.message);
// 	});
// };
// String.prototype._get_404 = function (res: any) {
// 	res.render("body/other/404", {
// 		head: {
// 			noindex: true,
// 			title: "404｜JOBALL找專家 - 外包. 接案. 作品展示",
// 			description: "內容不存在／已被移除",
// 			cover: "",
// 			path: `/404`,
// 			icon: "",
// 			param: {},
// 			query: {}
// 		},
// 		json: {
// 			msg: String(this)
// 		},
// 	});
// };
// String.prototype._post_404 = function (res: any) {
// 	res.json({ err: 1, msg: `${String(this)} (已將問題回報開發者。)` })
// };
// String.prototype._error = function (req, res, err) {
// 	const mailer = require(`${process.env.NODE}/models/mailer`);
// 	mailer.sendMail({
// 		from: "JOBALL找專家<noreply@joball.tw>",
// 		to: "chiuchingwei@icloud.com",
// 		subject: `Error: ${req.originalUrl} [${String(this)}]`,
// 		html: `Req: {<br>
// 			params: ${JSON.stringify(req.params)},<br>
// 			query : ${JSON.stringify(req.query)},<br>
// 			body	: ${JSON.stringify(req.body)}<br>
// 		}<br>
// 		--------<br>
// 		Error: ${err.message}`,
// 	}, (err: Error) => {
// 		if (err) return console.error(err.message);
// 	});
// 	if (res) res.json({ err: 1, msg: "插入／讀取資料的過程出現錯誤\n已回報管理者錯誤資訊。" })
// };
// String.prototype._info = function (req_body: any) {
// 	/* model */
// 	const mailer = require(`${process.env.NODE}/models/mailer`);
// 	mailer.sendMail({
// 		from: "JOBALL找專家<noreply@joball.tw>",
// 		to: "chiuchingwei@icloud.com",
// 		subject: String(this),
// 		html: req_body,
// 	}, (err: Error) => {
// 		if (err) return console.error(err.message);
// 	});
// };
// String.prototype._mail = function (json: any) {
// 	/* model */
// 	const mailer = require(`${process.env.NODE}/models/mailer`);
// 	mailer.sendMail({
// 		from: "JOBALL找專家<noreply@joball.tw>",
// 		to: String(this),
// 		cc: "cc@joball.tw",
// 		subject: json.subject,
// 		html: json.html,
// 	}, (err: Error) => {
// 		if (err) return console.error(err.message);
// 	});
// };
// String.prototype._updateUserWatch = function (req: any) {
// 	/* model */
// 	const db = require(`${process.env.NODE}/models/mysql`);
// 	/* constant */
// 	const auth = req.session.auth;
// 	const now = Math.floor(Date.now() / 1000);
// 	const user_id = String(this);
// 	/* check */
// 	if (auth && auth.id === user_id) return;
// 	/* cache not exist */
// 	if (!req.session.data) return (
// 		req.session.data = {
// 			user: [{
// 				id: user_id,
// 				updated: now
// 			}],
// 			service: [],
// 			album: [],
// 			corp: [],
// 			case: []
// 		},
// 		update()
// 	);
// 	const users = req.session.data.user.filter((target: any) => target.id === user_id);
// 	/* cache / user not exist */
// 	if (!users.length) return (
// 		req.session.data.user.push({
// 			id: user_id,
// 			updated: now
// 		}),
// 		update()
// 	);
// 	/* cache / user not expire */
// 	if (users[0].updated > now - 60 * 5) return;
// 	/* cache / user expire */
// 	users[0].updated = now;
// 	update();
// 	/* function */
// 	function update() {
// 		db.write.query(`
// 		UPDATE joball.user 
// 		SET watch = watch + 1 
// 		WHERE id = ?
// 		`, [
// 			user_id
// 		], (err: Error, r: any) => {
// 			if (err) return console.error(err.message);
// 		});
// 	};
// };
// String.prototype._updateServiceWatch = function (user_id: string, req: any) {
// 	/* model */
// 	const db = require(`${process.env.NODE}/models/mysql`);
// 	/* constant */
// 	const auth: any = req.session.auth;
// 	const now: number = Math.floor(Date.now() / 1000);
// 	const service_id: String = String(this);
// 	/* check */
// 	if (auth && auth.id === user_id) return;
// 	/* cache not exist */
// 	if (!req.session.data) return (
// 		req.session.data = {
// 			user: [],
// 			service: [{
// 				id: service_id,
// 				updated: now
// 			}],
// 			album: [],
// 			corp: [],
// 			case: []
// 		},
// 		update()
// 	);
// 	const services = req.session.data.service.filter((target: any) => target.id === service_id);
// 	/* cache / service not exist */
// 	if (!services.length) return (
// 		req.session.data.service.push({
// 			id: service_id,
// 			updated: now
// 		}),
// 		update()
// 	);
// 	/* cache / service not expire */
// 	if (services[0].updated > now - 60 * 5) return;
// 	/* cache / service expire */
// 	services[0].updated = now;
// 	update();
// 	/* function */
// 	function update() {
// 		db.write.query(`
// 		UPDATE joball.service 
// 		SET watch_total = watch_total + 1 
// 		WHERE id = ?
// 		`, [
// 			service_id
// 		], (err: Error, r: any) => {
// 			if (err) return console.error(err.message);
// 		});
// 	};
// };
// String.prototype._updateCaseWatch = function (user_id: string, req: any) {
// 	/* model */
// 	const db = require(`${process.env.NODE}/models/mysql`);
// 	/* constant */
// 	const auth: any = req.session.auth;
// 	const expire: number = Math.floor(Date.now() / 1000);
// 	const case_id: String = String(this);
// 	/* check */
// 	if (auth && auth.id === user_id) return;
// 	/* cache not exist */
// 	if (!req.session.data) return (
// 		req.session.data = {
// 			user: [],
// 			service: [],
// 			album: [],
// 			corp: [],
// 			case: [{
// 				id: case_id,
// 				updated: expire
// 			}]
// 		},
// 		update()
// 	);
// 	const cases = req.session.data.case.filter((target: any) => target.id === case_id);
// 	/* cache / case not exist */
// 	if (!cases.length) return (
// 		req.session.data.case.push({
// 			id: case_id,
// 			updated: expire
// 		}),
// 		update()
// 	);
// 	/* cache / case not expire */
// 	if (cases[0].updated > expire - 60 * 5) return;
// 	/* cache / case expire */
// 	cases[0].updated = expire;
// 	update();
// 	/* function */
// 	function update() {
// 		db.write.query(`
// 		UPDATE joball.case 
// 		SET watch = watch + 1 
// 		WHERE id = ?
// 		`, [
// 			case_id
// 		], (err: Error, r: any) => {
// 			if (err) return console.error(err.message);
// 		});
// 	};
// };
// String.prototype._updateAlbumWatch = function (user_id: string, req: any) {
// 	/* model */
// 	const db = require(`${process.env.NODE}/models/mysql`);
// 	/* constant */
// 	const auth: any = req.session.auth;
// 	const expire: number = Math.floor(Date.now() / 1000);
// 	const album_id: String = String(this);
// 	/* check */
// 	if (auth && auth.id === user_id) return;
// 	/* cache not exist */
// 	if (!req.session.data) return (
// 		req.session.data = {
// 			user: [],
// 			service: [],
// 			album: [{
// 				id: album_id,
// 				updated: expire
// 			}],
// 			corp: [],
// 			case: []
// 		},
// 		update()
// 	);
// 	const albums = req.session.data.album.filter((target: any) => target.id === album_id);
// 	/* cache / album not exist */
// 	if (!albums.length) return (
// 		req.session.data.album.push({
// 			id: album_id,
// 			updated: expire
// 		}),
// 		update()
// 	);
// 	/* cache / album not expire */
// 	if (albums[0].updated > expire - 60 * 5) return;
// 	/* cache / album expire */
// 	albums[0].updated = expire;
// 	update();
// 	/* function */
// 	function update() {
// 		db.write.query(`
// 		UPDATE joball.album 
// 		SET watch_total = watch_total + 1 
// 		WHERE id = ?
// 		`, [
// 			album_id
// 		], (err: Error, r: any) => {
// 			if (err) return console.error(err.message);
// 		});
// 	};
// };
// String.prototype._htmlTitle = function (keywords: string) {
// 	/* variable */
// 	var str: string = String(this);
// 	/* mark keywords */
// 	if (keywords) keywords.toArray(',').sort(lengthStoL).forEach((e: string) => {
// 		/* constant */
// 		const regex = RegExp(e, 'gi');
// 		/* replace val */
// 		str = str.replace(regex, `<b>${e}</b>`)
// 	});
// 	return str.delTopBottom().replace(/(\n*)?\n/g, '');
// };
// String.prototype._htmlDescriptionRow = function (keywords: string) {
// 	/* variable */
// 	var str: string = String(this);
// 	var map: any = {};
// 	/* empty tag */
// 	// str.regexTag().forEach((target: string) => {
// 	// 	/* constant */
// 	// 	const key		: string = _KEY(50);
// 	// 	const regex	: RegExp = new RegExp(target, 'g');
// 	// 	/* insert map */
// 	// 	map[key] = target;
// 	// 	/* replace val */
// 	// 	str = str.replace(regex, key);
// 	// });
// 	/* replace url */
// 	str.regexURL().forEach((target: string) => {
// 		/* constant */
// 		const key: string = _KEY(50);
// 		const regex: RegExp = new RegExp(target, 'g');
// 		/* insert map */
// 		map[key] = "--";
// 		/* replace val */
// 		str = str.replace(regex, key);
// 	});
// 	/* replace email */
// 	str.regexEmail().forEach((target: string) => {
// 		/* constant */
// 		const key: string = _KEY(50);
// 		const regex: RegExp = new RegExp(target, 'g');
// 		/* insert map */
// 		map[key] = "--";
// 		/* replace val */
// 		str = str.replace(regex, key);
// 	});
// 	/* replace phone */
// 	str.regexPhone().forEach((target: string) => {
// 		/* constant */
// 		const key: string = _KEY(50);
// 		const regex: RegExp = new RegExp(target, 'g');
// 		/* insert map */
// 		map[key] = "--";
// 		/* replace val */
// 		str = str.replace(regex, key);
// 	});
// 	/* replace random_key */
// 	map.getKeys().forEach((key: string) => {
// 		const regex = new RegExp(key, 'g');
// 		str = str.replace(regex, map[key]);
// 	});
// 	var index: number = 0;
// 	if (keywords) keywords.split(',')
// 		.filter(($1: string) => $1.length > 0)
// 		.sort((a: string, b: string) => a.length - b.length).forEach(($1: string) => {
// 			const regex = RegExp($1, 'gi');
// 			str = str.replace(regex, `<b>${$1}</b>`)
// 			if (str.indexOf($1) !== -1 && !index) index = str.indexOf($1);
// 		});
// 	index = (index - 10 > 0) ? (index - 10) : 0;
// 	str = `${keywords && index > 0 ? '...' : ""}${str.slice(index, str.length)}`;
// 	return str.delTopBottom().replace(/(\n*)?\n/g, '<br>')
// };
// String.prototype._htmlDescriptionBody = function () {
// 	/* variable */
// 	var str: string = String(this).fitHTML();
// 	var map: any = {};
// 	/* empty tag */
// 	str.regexTag().forEach((target: string) => {
// 		/* constant */
// 		const key: string = _KEY(50);
// 		const regex: RegExp = new RegExp(target, 'g');
// 		/* insert map */
// 		map[key] = `<b>${target}</b>`;
// 		/* replace val */
// 		str = str.replace(regex, key);
// 	});
// 	/* reolace tag */
// 	str.regexURL().forEach((target: string) => {
// 		/* constant */
// 		const key: string = _KEY(50);
// 		const regex: RegExp = new RegExp(target, 'g');
// 		/* insert map */
// 		map[key] = `<a href="${target.replace(/\\/g, '')}" target="_blank">連結</a>`;
// 		/* replace val */
// 		str = str.replace(regex, key);
// 	});
// 	/* reolace email */
// 	str.regexEmail().forEach((target: string) => {
// 		/* constant */
// 		const key: string = _KEY(50);
// 		const regex: RegExp = new RegExp(target, 'g');
// 		/* insert map */
// 		map[key] = `<a href="mailto:${target}">信箱</a>`;
// 		/* replace val */
// 		str = str.replace(regex, key);
// 	});
// 	/* reolace phone */
// 	str.regexPhone().forEach((target: string) => {
// 		/* constant */
// 		const key: string = _KEY(50);
// 		const phone: string = target.replace(/(\+|\-|\(|\))/g, '');
// 		const regex: RegExp = new RegExp(target, 'gi');
// 		/* insert map */
// 		map[key] = `<b onclick="_confirm('系統提示', '是否撥打號碼？', () => location.href = 'tel:${phone}')">手機</b>`;
// 		/* replace val */
// 		str = str.replace(regex, key);
// 	});
// 	map.getKeys().forEach((key: string) => {
// 		let regex = new RegExp(key, 'gi');
// 		str = str.replace(regex, map[key]);
// 	})
// 	return str.delTopBottom().replace(/(\n*)?\n\n/g, '<br><br>').replace(/\n/g, '<br>')
// };
// String.prototype._htmlTag = function (description: string, keywords: string) {
// 	var tag: any = String(this).split(',').filter((tag: any) => tag.length);
// 	description.regexTag().forEach((description_tag: string) => {
// 		var str: string = description_tag.replace(/(\#|＃)/g, '');
// 		var ary: any = tag.filter((target: string) => target !== str)
// 		ary.push(str);
// 		tag = ary;
// 	});
// 	if (!tag.length) return "";
// 	if (!keywords) return `<p>${tag.join('</p><p>')}</p>`;
// 	var str = tag.join(',');
// 	if (keywords) keywords.split(',')
// 		.filter((target: string) => target.length)
// 		.sort((a: string, b: string) => a.length - b.length)
// 		.forEach((target: string) => {
// 			const regex = RegExp(target, 'gi');
// 			str = str.replace(regex, `<b>${target}</b>`);
// 		});
// 	const newTag = str.split(',').filter((e: any) => e.length);
// 	return `<p>${newTag.join('</p><p>')}</p>`;
// };
// String.prototype._mark = function (keywords: string) {
// 	/* variable */
// 	var str: string = String(this);
// 	/* mark keywords */
// 	if (keywords) keywords.toArray(',').sort(lengthStoL).forEach((e: string) => {
// 		const regex = RegExp(e, 'gi');
// 		str = str.replace(regex, `<b>${e}</b>`)
// 	});
// 	return str;
// };
// /**
//  * common usage
//  */
// String.prototype.toArray = function (split: string) {
// 	const str: string = String(this);
// 	return str.split(split).filter((target: string) => target.length);
// };
// String.prototype.isHTML = function () {
// 	const str: string = String(this);
// 	return fitHTML.test(str);
// };
// String.prototype.isEmail = function () {
// 	const str: string = String(this);
// 	console.log(`pdextension`, str, fitEmail.test(str))
// 	return fitEmail.test(str);
// };
// String.prototype.getEmail = function () {
// 	const str: string = String(this);
// 	return fitEmail.test(str) ? str.replace(/(\n|\s)/g, '') : "";
// };
// String.prototype.getPhone = function () {
// 	const str: string = String(this);
// 	return fitPhone.test(str) ? str.replace(/(\(|\)|\-|\+|\n|\s)/g, '') : "";
// };
// String.prototype.getLine = function () {
// 	const str: string = String(this);
// 	if (
// 		(str.getURLs().length > 1) ||
// 		(str.getURLs().length === 1 && !fitLineURL1.test(str) && !fitLineURL2.test(str)) ||
// 		(!str.getURLs().length && !fitLineID.test(str))
// 	) return "";
// 	return str.replace(/(\n|\s)/g, '');
// };
// String.prototype.getMessager = function () {
// 	var str: string = String(this);
// 	const ary: any = str.match(fitMessager);
// 	str = ary ? ary[ary.length - 1] : str;
// 	if (/php/.test(str)) return "";
// 	return str.replace(/(\n|\s)/g, '');
// };
// String.prototype.getURL = function () {
// 	const str: string = String(this);
// 	if (
// 		str.getURLs().length > 1 ||
// 		!str.getURLs().length
// 	) return "";
// 	return str;
// };
// String.prototype.getTags = function () {
// 	const tags: any = this.match(fitTag);
// 	if (!tags) return [];
// 	var ary: any = [];
// 	for (let i = 0; i < tags.length; i++) {
// 		const tag: string = String(tags[i]).replace(/#/, '')
// 		const regex: RegExp = new RegExp(tag, 'gi');
// 		ary.push({
// 			tag: tag,
// 			regex: regex
// 		});
// 	};
// 	return ary;
// }
// String.prototype.getURLs = function () {
// 	const urls: any = this.match(fitURL);
// 	if (!urls) return [];
// 	let ary: any = [];
// 	for (let i = 0; i < urls.length; i++) {
// 		const url: string = String(urls[i]).replace(/\?/, '\\?').replace(/\=/, '\\=').replace(/\)/g, '').replace(/\(/g, '');
// 		const regex: RegExp = new RegExp(url, 'gi');
// 		ary.push({
// 			url: url,
// 			regex: regex
// 		});
// 	};
// 	return ary;
// };
// String.prototype.delTopBottom = function () {
// 	const str: string = String(this);
// 	return str.replace(/^((\s|\n)*)?(\s|\n)/g, '').replace(/((\s|\n)*)?(\s|\n)$/g, '');
// };
// String.prototype.delWrap = function () {
// 	const str: string = String(this);
// 	return str.replace(/\n/g, '');
// };
// String.prototype.delSpace = function () {
// 	const str: string = String(this);
// 	return str.replace(/ /g, '');
// };
// String.prototype.delURL = function () {
// 	var str: string = String(this);
// 	str.getURLs().forEach(($1: any) => {
// 		str = str.replace($1.regex, '');
// 	});
// 	return str
// };
// String.prototype.regexTag = function () {
// 	/* constant */
// 	const ary: any = String(this).match(fitTag);
// 	/* variable */
// 	var map: any = {};
// 	/* insert map */
// 	if (ary) ary.forEach((target: string) => map[target] = 0);
// 	return ary ? map.getKeys().sort(lengthLtoS) : [];
// };
// String.prototype.regexLine = function () {
// 	/* constant */
// 	const ary1: any = String(this).match(fitLineURL1);
// 	const ary2: any = String(this).match(fitLineURL2);
// 	/* variable */
// 	var map: any = {};
// 	/* insert map */
// 	if (ary1) ary1.forEach((target: string) => map[target] = 0);
// 	if (ary2) ary2.forEach((target: string) => map[target] = 0);
// 	return (ary1.length || ary2.length) ? map.getKeys().sort(lengthLtoS) : [];
// };
// String.prototype.regexURL = function () {
// 	/* constant */
// 	const ary: any = String(this).match(fitURL);
// 	/* variable */
// 	var map: any = {};
// 	/* insert map */
// 	if (ary) ary.forEach((target: string) =>
// 		map[target
// 			.replace(/\s/g, '')
// 			.replace(/\?/, '\\?')
// 			.replace(/\=/, '\\=')
// 			.replace(/\)/g, '')
// 			.replace(/\(/g, '')] = 0
// 	);
// 	return ary ? Object.keys(map).sort(lengthLtoS) : [];
// };
// String.prototype.regexEmail = function () {
// 	/* constant */
// 	const ary: any = String(this).match(fitEmail);
// 	/* variable */
// 	var map: any = {};
// 	/* insert map */
// 	if (ary) ary.forEach((target: string) => map[target.delSpace()] = 0);
// 	return ary ? map.getKeys().sort(lengthLtoS) : [];
// };
// String.prototype.regexPhone = function () {
// 	/* constant */
// 	const ary: any = String(this).match(fitPhone);
// 	/* variable */
// 	var map: any = {};
// 	/* insert map */
// 	if (ary) ary.forEach((target: string) => map[target.delSpace()] = 0);
// 	return ary ? map.getKeys().sort(lengthLtoS) : [];
// };
// String.prototype.isEmpty = function () {
// 	return this.replace(/(\n| )/g, '').length === 0;
// };
// String.prototype.insert = function (index: number, string: string) {
// 	if (index > 0) {
// 		return this.substring(0, index) + string + this.substr(index);
// 	};
// 	return string + this;
// };
// String.prototype.isJSON = function () {
// 	try {
// 		let data: string = String(this);
// 		JSON.parse(data);
// 	} catch (err) {
// 		return false;
// 	};
// 	return true;
// };
// String.prototype.fitHTML = function () {
// 	if (!this) return "";
// 	let str: string = String(this);
// 	[
// 		{ key: "\'", val: "&#39;" },
// 		{ key: "\"", val: "&quot;" },
// 		{ key: "\>", val: "&gt;" },
// 		{ key: "\<", val: "&lt;" },
// 		// {key:"\n",val:""},
// 		// {key:"  ",val:""},
// 	].forEach((e: any) => {
// 		let reg = new RegExp(e.key, 'gi');
// 		str = str.replace(reg, e.val);
// 	});
// 	return str;
// };
// String.prototype.fitHref = function () {
// 	if (!this) return "";
// 	let str: string = String(this);
// 	[
// 		{ key: "\'", val: "&#39;" },
// 		{ key: "\"", val: "&quot;" },
// 		{ key: "\>", val: "&gt;" },
// 		{ key: "\<", val: "&lt;" },
// 		{ key: " ", val: "+" },
// 	].forEach((e: any) => {
// 		let reg = new RegExp(e.key, 'gi');
// 		str = str.replace(reg, e.val);
// 	});
// 	return str;
// };
//
// interface Number {
// 	getYear(): string;
// 	getMonth(): string;
// 	getDate(): string;
// 	getH(): string;
// 	getM(): string;
// 	getS(): string;
// 	getHH(): string;
// 	getMM(): string;
// 	getSS(): string;
// 	getGone(): string;
// 	getCarry(): string;
// 	getPrice(): string;
// 	getColor(): string;
// }
// Number.prototype.getYear = function () {
// 	let date: number = Number(this);
// 	let time: Date = new Date(date * 1000);
// 	return String(time.getFullYear());
// };
// Number.prototype.getMonth = function () {
// 	let date: number = Number(this);
// 	let time: Date = new Date(date * 1000);
// 	return String(time.getMonth() + 1).length > 1 ? String(time.getMonth() + 1) : `0${String(time.getMonth() + 1)}`;
// };
// Number.prototype.getDate = function () {
// 	let date: number = Number(this);
// 	let time: Date = new Date(date * 1000);
// 	return String(time.getDate()).length > 1 ? String(time.getDate()) : `0${String(time.getDate())}`;
// };
// Number.prototype.getH = function () {
// 	let date: number = Number(this);
// 	let time: Date = new Date(date * 1000);
// 	return String(time.getHours());
// };
// Number.prototype.getHH = function () {
// 	let date: number = Number(this);
// 	let time: Date = new Date(date * 1000);
// 	return String(time.getHours()).length > 1 ? String(time.getHours()) : `0${String(time.getHours())}`;
// };
// Number.prototype.getM = function () {
// 	let date: number = Number(this);
// 	let time: Date = new Date(date * 1000);
// 	return String(time.getMinutes());
// };
// Number.prototype.getMM = function () {
// 	let date: number = Number(this);
// 	let time: Date = new Date(date * 1000);
// 	return String(time.getMinutes()).length > 1 ? String(time.getMinutes()) : `0${String(time.getMinutes())}`;
// };
// Number.prototype.getS = function () {
// 	let date: number = Number(this);
// 	let time: Date = new Date(date * 1000);
// 	return String(time.getSeconds());
// };
// Number.prototype.getSS = function () {
// 	let date: number = Number(this);
// 	let time: Date = new Date(date * 1000);
// 	return String(time.getSeconds()).length > 1 ? String(time.getSeconds()) : `0${String(time.getSeconds())}`;
// };
// Number.prototype.getGone = function () {
// 	let now: number = Math.floor(Date.now() / 1000);
// 	let second: number = now - Number(this);
// 	let time: Date = new Date(Number(this) * 1000);
// 	switch (true) {
// 		case (second >= 86400 * 365): return `${time.getFullYear()}年${time.getMonth() + 1}月${time.getDate()}日-${time.getHours()}:${time.getMinutes()}`;
// 		case (second >= 86400 * 30): return `${Math.floor(second / (86400 * 30))}月前`;
// 		case (second >= 86400 * 7): return `${Math.floor(second / (86400 * 7))}週前`;
// 		case (second >= 86400): return `${Math.floor(second / 86400)}天前`;
// 		case (second >= 3600): return `${Math.floor(second / 3600)}小時前`;
// 		case (second >= 60): return `${Math.floor(second / 60)}分鐘前`;
// 		default: return `${second}秒前`;
// 	};
// };
// Number.prototype.getCarry = function () {
// 	let number: string = String(this)
// 	let length: number = number.length;
// 	switch (true) {
// 		case (length >= 10): return number.insert(length - 3, ",").insert(length - 6, ",").insert(length - 9, ",");
// 		case (length >= 7): return number.insert(length - 3, ",").insert(length - 6, ",");
// 		case (length >= 4): return number.insert(length - 3, ",");
// 		default: return number;
// 	};
// };
// Number.prototype.getPrice = function () {
// 	let number: number = Number(this)
// 	switch (true) {
// 		case (number >= 1000): return `$${Math.floor(number / 1000)}k`;
// 		case (number > 0): return `$${number}`;
// 		default: return `${number}`;
// 	};
// };
// Number.prototype.getColor = function () {
// 	var number: number = Number(this);
// 	var str: string = String(number);
// 	const r: string = String(number).slice(str.length - 6, str.length - 4).replace(/8/g, "a").replace(/9/g, "b");
// 	const g: string = String(number).slice(str.length - 4, str.length - 2).replace(/8/g, "a").replace(/9/g, "b");
// 	const b: string = String(number).slice(str.length - 2, str.length).replace(/8/g, "a").replace(/9/g, "b");
// 	return `#${r}${g}${b}`;
// };

// interface Object {
// 	getKeys(): string[];
// };
// Object.prototype.getKeys = function () {
// 	return Object.keys(this);
// };

// /**
//  * 未整理
//  */
// exports.prodFit = (title: string, prod: string) => {
// 	let ary = prod.split(' '), fit = 0;
// 	if (prod.split(' ').length > 3) {
// 		ary.shift();
// 	};
// 	for (let i = 0; i < ary.length; i++) {
// 		let reg = new RegExp(ary[i], 'i')
// 		if (title.match(reg)) {
// 			fit += 1;
// 		};
// 	};
// 	return (ary.length > 3 ? 3 : ary.length) <= fit;
// };
// exports.parse = {
// 	product: (body: string, completed: (bodyRedult: any) => void) => {
// 		const obj = JSON.parse(body);
// 		const keys = Object.keys(obj);
// 		let result: any = {};
// 		for (let i = 0; i < keys.length; i++) {
// 			const major = keys[i];
// 			const minorKeys = Object.keys(obj[major]);
// 			if (!result[major]) {
// 				result[major] = [];
// 			};
// 			for (let j = 0; j < minorKeys.length; j++) {
// 				const minors = obj[major][minorKeys[j]]
// 				for (let k = 0; k < minors.length; k++) {
// 					const minor = minors[k];
// 					if (!result[major]) {
// 						result[major] = [];
// 					};
// 					result[major].push({
// 						key: minorKeys[j],
// 						value: minor
// 					});
// 				};
// 			};
// 		};
// 		completed(result)
// 	}
// }