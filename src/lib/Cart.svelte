<script>
	/**
     * @type {boolean}
     */
	export let open;
	export let
		DateRange = new Date().toISOString().slice(0, -8), //TODO: get local ISO datetime string
		min = DateRange,
		max = DateRange;
</script>

<dialog {open} class="this.cart">
	<h1>订购单</h1>

	<form title="订购单" id="order_form">
		<table role="grid">
			<caption id="cart_cap" class="step__hd">
				<strong>订购信息</strong>
				<!--details>TODO: a11y</details-->
			</caption>
			<tfoot role="rowgroup">
				<tr role="row"><th role="rowheader" colspan="3">小费<td role="cell" class="numerical">3</td>
				<tr role="row">
					<th role="rowheader"><label for="coupon-code">蜜语</label>
					<td role="cell" colspan="2"><input
						id="coupon-code" name="coupon-code"
						type="text"
						size="1"
						oninput="this.parentNode.dataset.content = this.value" />
					<td role="cell" class="numerical">-3</td>
				<tr role="row">
					<th role="rowheader" colspan="3">总计
					<td role="cell" class="numerical">138</td>
				<tr role="row">
					<th role="rowheader"><label for="comment">留言</label>
					<td role="cell" colspan="3"><input
						id="comment" name="comment"
						type="text"
						size="1"
						oninput="this.parentNode.dataset.content = this.value" />
					<td role="cell"></td>
			</tfoot>
			<tbody role="rowgroup">
				<tr role="row"><th role="columnheader" scope="rowgroup" colspan="4" id="shopping-list">订购清单</th>
				<tr role="row">
					<th role="columnheader" id="item_hd">餐品
					<th role="columnheader" id="price_hd">单价
					<th role="columnheader" id="qty_hd">数量
					<th role="columnheader" id="total_hd">金额</th>
				<tr role="row" class="h-item">
					<td role="cell" headers="item_hd">土耳其烤鸡肉披萨
					<td role="cell" headers="price_hd" class="numerical">69
					<td role="cell" headers="qty_hd" class="qty numerical">2
					<td role="cell" headers="total_hd" class="sub-total numerical">138</td>
				</tr>
			<tbody role="rowgroup">
				<tr role="row">
					<th role="columnheader" scope="rowgroup" colspan="4">配送信息</th>
				<tr role="row">
					<th role="rowheader">
						<label for="preorder-date">日期</label>
					<td role="cell">
						<input
							type="text"
							id="preorder-date" name="preorder-date"
							size="2"
							aria-describedby="date_confirm"
							oninput="this.parentNode.dataset.content = this.value" />
						<!--TODO: a11y-->
						<output
							id="date_confirm"
							for="preorder-date"
							aria-live="assertive">
							<small>您输入的日期为：<br/><span class="numerical">20</span><span class="numerical">24</span>年<span class="numerical">1</span>月<span class="numerical">12</span>日</small></output>
					<td role="cell"></td>
				<tr role="row">
					<th role="rowheader">
						<label for="preorder-time">时间</label>
					<td role="cell">
						<input
							type="time"
							id="preorder-time" name="preorder-time"
							size="4"
							oninput="this.parentNode.dataset.content = this.value" />
					<td role="cell"></td>				
				<tr role="row">
					<th role="rowheader"><label for="addressLocality">城市</label><td role="cell" colspan="2"><input
						value="乌鲁木齐" disabled size="4" list="cities">
						<datalist id="cities">
							<select id="addressLocality" name="addressLocality">
								<option value="乌鲁木齐" selected>乌鲁木齐</option>
							</select>
						</datalist><td role="cell"></td>
				<tr role="row">
					<th role="rowheader"><label for="customer-street">街区</label><td role="cell" colspan="2"><input
						id="customer-street" name="customer-street"
						type="text"						
						required
						size="1"
						oninput="this.parentNode.dataset.content = this.value" /><td role="cell"></td>
				<tr role="row">
					<th role="rowheader"><label for="customer-residential">建筑</label><td role="cell" colspan="2"><input
						id="customer-residential" name="customer-residential"
						type="text"
						required
						size="1"
						oninput="this.parentNode.dataset.content = this.value" /><td role="cell"></td>
				<tr role="row">
					<th role="rowheader"><label for="customer-room">房号</label><td role="cell" colspan="2"><input
						id="customer-room" name="customer-room"
						type="text"
						size="1"
						oninput="this.parentNode.dataset.content = this.value" /><td role="cell"></td>
				<tr role="row">
					<th role="rowheader"><label for="customer-telephone">电话</label><td role="cell" colspan="2"><input
						id="customer-telephone" name="customer-telephone"
						aria-describedby="tel_hint"
						type="tel"
						required
						minlength="7"
						inputmode="tel" autocomplete="tel"
						pattern="^1[3|5|7|8][0-9]{9}$" title="须为11位手机号或7位乌市座机号!"
						size="7"
						oninput="this.parentNode.dataset.content = this.value" />
						<output><small>须为<span class="numerical">11</span>位手机号，<br/>或7位乌市座机号！</small></output>
						<td role="cell"></td>
				<tr role="row">
					<th role="rowheader"><label for="customer-name">称呼</label><td role="cell" colspan="2"><input
						id="customer-name" name="customer-name"
						type="text"
						required
						autocomplete="name"
						spellcheck="false"
						pattern="^[a-zA-Z\u4e00-\u9fa5]{2,8}$" title="须为字数二至八的中文或英文!"
						size="4"
						oninput="this.parentNode.dataset.content = this.value" /><td role="cell"></td>
				</tr>
			<tbody role="rowgroup">
				<tr role="row"><th role="columnheader" colspan="4" scope="rowgroup" id="payment">付款方式</th>
				<tr role="row">
					<td role="cell"><input
						id="cash-payment" name="payment"
						aria-labelledby="payment cash-label"
						value="Cash"
						type="radio"
						required
						checked
						/><label for="cash-payment" id="cash-label">现金到付</label>
					<td role="cell"><input
						id="alipay-payment" name="payment"
						aria-labelledby="payment alipay-label"
						value="alipay_wap"
						type="radio"
						required
						/><label for="alipay-payment" id="alipay-label">支付宝</label>
					<td role="cell"><input
						id="wechat-payment" name="payment"
						aria-labelledby="payment wechat-label"
						value="wx_pub"
						type="radio"
						required
						/><label for="wechat-payment" id="wechat-label">微信支付</label>			
					<td>
		</table>
		<button type="submit">提交订单</button>
	</form>
</dialog>

<style lang="scss">
	/**Typesetting
   */
	:is(output) { & {font-size:small; line-height:var(--s-1); }; small,span {line-height:inherit;} }
	caption, button  { font-size:var(--s-1); font-weight:bold; letter-spacing:var(--letter-spacing); }
	th,td,th > label { font-size:var(--s-1); line-height:var(--line-height); }
	.numerical { text-combine-upright:all; }
	[headers="item_hd"] { text-wrap:balance; text-indent:-.35em; text-align-last:right; }
	[role="cell"]:has(input) { text-orientation:upright; }

	/**Layout
   */
	.this\.cart {
		position:static;
		padding: var(--padding);

		caption, [id="addressLocality"] { display:none; } //TODO: a11y
		form { --padding:.2em; --line-height:var(--s0); display:contents; }
		:is(form,[role="grid"]) > * + * {  margin-block-start:var(--s1); }
		:is([role="grid"] > *)  > * + * {  margin-block-start:.35em; }

		[role="grid"] { --numcol:4; &, [role="rowgroup"] { display:flex; flex-flow:column; inline-size:fit-content; }}

		[role="row"] {
			display:flex; align-items:center;

			&:has(#shopping-list) ~ [role="row"] { flex-flow:column; }
			&:has(input:is(:optional,:not(:only-child))) { align-items:end; }
		}

		[role="rowheader"]:has(+ [role="cell"] > input) { display:contents; }
		:is([role="cell"],[role="columnheader"]):has(label,input) { padding:0; }
		:is([role="cell"],[role="columnheader"],[role="rowheader"]):not(:has(label,input)), label, input { padding:.35em; }

		[role="cell"]:has(> input:is([type="text"],[type="tel"],[type="time"])) {
			display:flex; flex-flow:column-reverse;

			input ~ * {
				order: 1;
				margin-inline-start: .2em;
				max-inline-size: 12em;
			}

			&::before { content:attr(data-content); block-size:0; visibility:hidden; // as invisible lining
				white-space: pre-wrap;
			}
		}

		[role="rowgroup"]:has(#shopping-list) {
			order: -1;
			flex-flow: row wrap;

			& > :first-child { order: -1; }
			&::before {content:"";flex-basis:100%;width:0;} // simulate <hr>

			[role="row"]:has(#shopping-list) ~ * > :first-child { block-size:calc(
				var(--line-height) * 3 + var(--padding) * 2);
			}

			[role="cell"][headers="item_hd"] { inline-size:calc(
				var(--numcol) * 1em + (var(--numcol) - 1) * var(--letter-spacing) + .35em);
				padding-inline-start: calc(.35em * 2);
			}
		}
	}

	/**Appearance
   */
	.this\.cart  {
		border:0; color:inherit; background:var(--tabpanel_bg);

		h1 { visibility:var(--visibility); font-size:var(--s1); }
		button, label { cursor:pointer; }
		:has(+ [role="cell"] > input:disabled) label { cursor:initial; }

		[role="row"]:has(label,input) {
			--outline_cl: oklch(from var(--primary_cl) calc(l + 10) calc(c * .65) h);

			label {
				border-radius: .35em .35em 0 0;
				background: var(--drinks_bg);
			}
			input {
				border: 0;
				border-radius: 0 0 .35em .35em;
				outline: var(--drinks_bg) solid 1px;
			}
		}

		[role="cell"]:has( > input:optional:not(:disabled))::after {
			content: "可选";
			font-size:xx-small; line-height:1;
			inline-size: fit-content;
			padding-block-start:  .2em;
			padding-inline-start: .5em;
		}
	}
</style>
