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
	<h1>购物车</h1>

	<form>
		<table role="table" id="cart-items">
			<caption class="step__hd">
				<strong>订购信息</strong>
				<!--details>TODO: a11y</details-->
			</caption>
			<tfoot role="rowgroup">
				<tr role="row"><th role="rowheader" colspan="3">送餐费<td role="cell" class="number">3</td>
				<tr role="row">
					<th role="rowheader"><label for="coupon-code">优惠蜜语</label>
					<td role="cell" colspan="2"><input
						id="coupon-code" name="coupon-code"
						type="text"
						maxlength="25"
						size="1"
						oninput="this.parentNode.dataset.content = this.value" />
					<td role="cell" class="number">-3</td>
				<tr role="row">
					<th role="rowheader" colspan="3">总计
					<td role="cell" class="number">138</td>
				<tr role="row">
					<th role="rowheader"><label for="comment">备注</label>
					<td role="cell" colspan="3"><input
						id="comment" name="comment"
						type="text"
						maxlength="45"
						size="1"
						oninput="this.parentNode.dataset.content = this.value" />
					<td role="cell"></td>
				<tr role="row">
					<th role="columnheader" colspan="3">
						<input
							id="preorder-checkbox" name="is-preorder"
							type="checkbox" />
						<label for="preorder-checkbox">预订</label>
					<td role="cell"></td>
				<tr role="row">
					<td role="cell" colspan="3">
						<input
							type="datetime-local"
							name="preorder-time"
							step="600000"
							bind:value={DateRange} {min} {max} />
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
					<td role="cell" headers="price_hd" class="number">69
					<td role="cell" headers="qty_hd" class="qty number">2
					<td role="cell" headers="total_hd" class="sub-total number">138</td>
				</tr>
			<tbody role="rowgroup">
				<tr role="row">
					<th role="columnheader" scope="rowgroup" colspan="4">配送信息</th>
				<tr role="row">
					<th role="rowheader" id="addressLocality">城市<td role="cell" colspan="2">乌鲁木齐市<td role="cell"></td>
				<tr role="row">
					<th role="rowheader"><label for="customer-street">街区名</label><td role="cell" colspan="2"><input
						id="customer-street" name="customer-street"
						type="text"						
						required
						maxlength="15"
						size="8"
						oninput="this.parentNode.dataset.content = this.value" /><td role="cell"></td>
				<tr role="row">
					<th role="rowheader"><label for="customer-residential">建筑／小区</label><td role="cell" colspan="2"><input
						id="customer-residential" name="customer-residential"
						type="text"
						required
						maxlength="10"
						size="3"
						oninput="this.parentNode.dataset.content = this.value" /><td role="cell"></td>
				<tr role="row">
					<th role="rowheader"><label for="customer-room">楼号／房号</label><td role="cell" colspan="2"><input
						id="customer-room" name="customer-room"
						type="text"
						maxlength="12"
						size="1"
						oninput="this.parentNode.dataset.content = this.value" /><td role="cell"></td>
				<tr role="row">
					<th role="rowheader"><label for="customer-telephone">手机号</label><td role="cell" colspan="2"><input
						id="customer-telephone" name="customer-telephone"
						type="tel"
						required
						maxlength="11"
						size="1"
						oninput="this.parentNode.dataset.content = this.value" /><td role="cell"></td>
				<tr role="row">
					<th role="rowheader"><label for="customer-name">称呼</label><td role="cell" colspan="2"><input
						id="customer-name" name="customer-name"
						type="text"
						required
						maxlength="15"
						size="1"
						oninput="this.parentNode.dataset.content = this.value" /><td role="cell"></td>
				</tr>
			<tbody role="rowgroup">
				<tr role="row"><th role="columnheader" colspan="4" scope="rowgroup" id="payment">付款方式</th>
				<tr role="row">
					<td role="cell"><input
						id="cash-payment" name="payment"
						value="Cash"
						type="radio"
						required
						/><label for="cash-payment">现金</label>
					<td role="cell"><input
						id="alipay-payment" name="payment"
						value="alipay_wap"
						type="radio"
						required
						/><label for="alipay-payment">支付宝</label>
					<td role="cell"><input
						id="wechat-payment" name="payment"
						value="wx_pub"
						type="radio"
						required
						/><label for="wechat-payment">微信支付</label>			
					<td>
		</table>
		<button type="submit">提交订单</button>
	</form>
</dialog>

<style lang="scss">
	/**Typesetting
   */
	caption, button { font-size:var(--s-1); letter-spacing:var(--letter-spacing); }
	th,td,th > label { font-size:var(--s-1); line-height:var(--line-height); }
	[headers="item_hd"] { text-wrap:balance; text-align-last:right; }
	[role="cell"]:has(input[type="tel"]) { &::before,input { letter-spacing:normal; text-orientation:upright; } }

	/**Layout
   */
	.this\.cart {
		position:static;
		padding: var(--padding);

		caption,
		[id="addressLocality"] { display:none; } //TODO: a11y

		form { --padding:.2em; --line-height:var(--s0); display:contents; }
		:is(form,[role="table"]) > * + * {  margin-block-start:var(--s1); }
		:is([role="table"] > *)  > * + * {  margin-block-start:.35em; }

		[role="table"] { --numcol:4;
			&,
			[role="rowgroup"],
			[role="row"]:has(#shopping-list) ~ [role="row"] {
				inline-size: fit-content;
				display:flex; flex-flow:column;
			}

			[role="row"] { display:flex; }
			[role="cell"], [role="rowheader"], [role="columnheader"] { padding:var(--padding); align-self:center; }
		}

		[role="rowgroup"]:has(#shopping-list) {
			order: -1;
			flex-flow: row wrap;

			& > :first-child { order: -1; }
			&::before {content:"";flex-basis:100%;width:0;} // simulate <hr>

			[role="row"]:has(th#shopping-list) ~ * > :first-child { block-size:calc(
				var(--line-height) * 3 + var(--padding) * 2);
			}

			[role="cell"][headers="item_hd"] { inline-size:calc(
				var(--numcol) * 1em + (var(--numcol) - 1) * var(--letter-spacing));
			}
		}

		:is([role="rowgroup"]) {
			[role="row"]:has([role="cell"] > input) { position:relative; }
			[role="rowheader"]:has(+ [role="cell"] > input) { z-index:1; }
			[role="cell"]:has(> input:not([type="radio"])) { position:absolute; inset-inline-start:0; }

			//input { padding:0; border-width:0; }

			[role="cell"]:has(> input:is([type="text"],[type="tel"])) {
				display:flex; flex-flow:column;

				&::before { content:attr(data-content); block-size:0; visibility:hidden; // as invisible lining
					white-space: pre-wrap;
				}
			}
		}
	}

	/**Appearance
   */
	.this\.cart  {
		border:0; color:inherit; background:var(--tabpanel_bg);

		h1 { visibility:var(--visibility); font-size:var(--s1); }
		button, label { cursor:pointer; }
		[role="cell"].number { text-combine-upright:all; }

		th label {
			--outline_cl: oklch(from var(--primary_cl) calc(l + 10) calc(c * .65) h);
			outline: var(--outline_cl) solid 1px;

			&:has(input:focus-visible) { box-shadow:0 0 5px 1px var(--primary_cl) }
		}

		[for="preorder-checkbox"]::after,
		[role="rowheader"]:has(+ [role="cell"] > input:optional) label::after
		{ content:"\00FE56"; font-size:smaller; text-orientation:upright; }

		[role="rowheader"]:has(+ [role="cell"] > input:required) label::after
		{ content:"*"; font-size:smaller; color:var(--alert_cl); }

		[role="rowheader"] > label { color: oklch(from var(--activity_bg) l c h); }

		[role="cell"] input:focus-visible { outline:unset; }
		[role="cell"] input:focus { background-color: oklch(from var(--primary_cl) calc(l + 10) calc(c * .65) h); }
	}
</style>
