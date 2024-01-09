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
			<caption class="step__hd">订购信息</caption>
			<thead role="rowgroup">
				<tr role="row">
					<th role="columnheader">餐品</th>
					<th role="columnheader">单价</th>
					<th role="columnheader">数量</th>
					<th role="columnheader">金额</th>
				</tr>
			</thead>
			<tbody role="rowgroup">
				<template>
					<tr role="row" class="h-item">
						<td role="cell" class="p-name">土耳其烤鸡肉披萨</td>
						<td role="cell" class="spec-price number">69</td>
						<td role="cell" class="qty number">2</td>
						<td role="cell" class="sub-total number">138</td>
					</tr>
				</template>
			</tbody>
			<tfoot role="rowgroup">
				<tr role="row"><th role="rowheader" colspan="3">送餐费</th><td class="number">3</td></tr>
				<tr role="row">
					<th role="rowheader" colspan="3">
						<label for="coupon-code">优惠蜜语</label><input
						id="coupon-code"
						name="coupon-code"
						type="text"
						maxlength="25"
						size="6"
						oninput="this.parentNode.dataset.content = this.value" />
					</th>
					<td class="number">-3
				</tr>
				<tr role="row"><th role="rowheader" colspan="3">总计</th><td class="number">138</td></tr>
				<tr role="row">
					<th role="rowheader" colspan="3">
						<label for="comment">备注</label><input
							id="comment"
							name="comment"
							type="text"
							maxlength="45"
							size="6"
							oninput="this.parentNode.dataset.content = this.value" />
						</th>
					<td>
				</tr>
				<tr role="row">
					<th role="rowheader" colspan="3"><fieldset>
						<legend id="if-Preorder">预订</legend>
						<label aria-hidden="true"><input type="checkbox" />预订</label><!--this dedicated label is for styling purpose-->
						<input
							aria-labelledby="if-Preorder"
							type="datetime-local"
							name="preorder-time"
							step="600000"
							bind:value={DateRange} {min} {max} />
					</fieldset></th>
					<td>
				</tr>
			</tfoot>
		</table>

		<address>
			配送信息
			<dl>
				<dt itemref="Urumqi" data-dt="city">城市
				<dd id="Urumqi">乌鲁木齐市
				<dt itemref="street-address">地址
				<dd id="street-address"><input
					name="customer-address"
					required
					maxlength="30"
					size="6"
					oninput="this.parentNode.dataset.content = this.value" />
				<dt itemref="phone-number">手机号
				<dd id="phone-number"><input
					name="customer-telephone" 
					type="tel"
					required
					maxlength="11"
					size="6"
					oninput="this.parentNode.dataset.content = this.value" />
				<dt itemref="address">称呼
				<dd id="address"><input
					name="customer-name" 
					type="text"
					required
					maxlength="15"
					size="5"
					oninput="this.parentNode.dataset.content = this.value" />
			</dl>
		</address>

		<fieldset class="payment">
			<legend>付款方式</legend>
			<ol>
				<li class="payment-input">
					<label>
						<input value="Cash" type="radio" required name="payment" />
						现金
					</label>
				</li>
				<li class="payment-input">
					<label>
						<input value="alipay_wap" type="radio" required name="payment" />
						支付宝
					</label>
				</li>
				<li class="payment-input">
					<label>
						<input value="wx_pub" type="radio" required name="payment" />
						微信支付
					</label>
				</li>
			</ol>
		</fieldset>

		<button type="submit">提交订单</button>
	</form>
</dialog>

<style lang="scss">
	$numcol: 4;
	/**Typesetting
   */
	caption, address, legend { font-size:var(--s-1); letter-spacing:var(--letter-spacing); }
	th,td,th > label, dl > * { font-size:var(--s-1); line-height:var(--line-height); }
	tbody td:first-of-type { text-wrap:balance; text-align-last:right; }
	address { font-style:unset; }

	/**Layout
   */
	.this\.cart {
		position:static;
		padding: var(--padding);

		form { --padding:.2em; --line-height:var(--s0); }
		form > * + * {  margin-block-start:var(--s1); }
		:is(table,table > *) > * + * {  margin-block-start:.35em; }
		thead { margin-block-start:0;} 
		dl :nth-child(2n+3) {  margin-block-start:var(--s-2); }
		table th > fieldset legend, dt[data-dt="city"] { display:none; } //TODO: a11y

		table {
			--numcol: #{$numcol};
			--numcol1:5; --numcol2:2; --numcol3:2; --numcol4:2;
			inline-size: min-content;
			display:flex; flex-flow:column;

			thead, tbody, tfoot {
				display:flex; flex-flow:column;
				justify-content: space-between;
			}

			thead, tbody {
				@for $i from 1 to $numcol {
					tr > :nth-child(#{$i}) { inline-size: calc(
						var(--numcol#{$i}) * 1em + (var(--numcol#{$i}) - 1) * var(--letter-spacing));
					}
				}
			}

			tr     { display:flex; justify-content:space-between; }
			tr > * { box-sizing:content-box; }
			th, td { align-self:center; }

			tr > :not(:first-child):last-child { inline-size: calc(
				var(--numcol4) * 1em + (var(--numcol4) - 1) * var(--letter-spacing));
			}
				
			th > fieldset {
				display:contents;
				label  {
					order:-1;
					display:flex;
		
					&:has(input:not(:checked)) + input { visibility:hidden; }
					input { order:-1; margin-inline-end:.5em; }
				}
			}
		}
		
		address,
		th:has(>label,>fieldset) {
			&, & dd:has(input) {
				display:flex; flex-flow:column;
				inline-size: fit-content;

				&::before { content:attr(data-content); block-size:0; visibility:hidden; // as invisible lining
					white-space: pre-wrap;
				}

				dl dt, > label { margin-block-end:calc((var(--line-height) + var(--padding)) * -1); }

				input, label + input {
					inline-size:auto;
					padding:0; border-width:0;
					background: transparent;
					resize: none;
				}
			}
		}
	}

	/**Appearance
   */
	.this\.cart  {
		border:0; color:inherit; background:var(--tabpanel_bg);

		h1 { visibility:var(--visibility); font-size:var(--s1); }
		td.number { text-combine-upright:all; }
		label,dt { padding-inline-start:var(--padding); }
		button, th fieldset label { cursor:pointer; }

		dl dd:has(input),
		th > label,
		th fieldset label
		{ 
			border: 0;
			outline: var(--primary_cl) solid 1px;
			padding-block: var(--padding);
		}

		legend#if-Preorder::after,
		label:has(+ input:optional)::after { content:"(可选)"; font-size:smaller; }

		dt:has(+ dd > input:required)::after { content:"*"; font-size:smaller; color:var(--alert_cl); }
	}
</style>
