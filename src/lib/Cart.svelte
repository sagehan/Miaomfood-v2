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
						maxlength="15" />
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
							maxlength="15"/>
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
				<dt>城市
				<dd>乌鲁木齐市
				<dt>地址
				<dd><input
					name="customer-address"
					required
					maxlength="30" />
				<dt>手机号
				<dd><input
					name="customer-telephone" 
					type="tel"
					required
					maxlength="11" />
				<dt>称呼
				<dd><input
					name="customer-name" 
					type="text"
					required
					maxlength="10" />
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
	th,td,th > label { line-height:var(--line-height); }
	tbody td:first-of-type { text-wrap:balance; text-align-last:right; }
	dl > * { font-size:var(--s-2); line-height:var(--line-height); }

	/**Layout
   */
	.this\.cart {
		position:static;
		padding: var(--padding);

		form > * + * {  margin-block-start:var(--s1); }
		:is(table,table > *) > * + * {  margin-block-start:var(--s-2); }
		thead { margin-block-start:0;} 
		dl :nth-child(2n+3) {  margin-block-start:var(--s-2); }

		form { --padding:.2em; --line-height:var(--s0); }

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

			tr > :not(:first-child):last-child { inline-size: calc(
				var(--numcol4) * 1em + (var(--numcol4) - 1) * var(--letter-spacing));
			}

			tr     { display:flex; justify-content:space-between; }
			tr > * { box-sizing:content-box; }
			th, td { align-self:center; }
			th:has(>label,>fieldset) { display:flex; flex-flow:column; }
				
			th > fieldset {
				display:contents;
				legend { display:none; } //TODO: a11y
				label  {
					order:-1;
					display:flex;
					input { order:-1; }
				}
			}
		}
		
		address dl dt,
		table th > label { margin-block-end: calc(var(--line-height) * -1); }
		
		address dl dd input,
		table th label + input { padding:var(--padding); background:transparent; }
	}

	/**Appearance
   */
	.this\.cart  {
		border:0; color:inherit; background:var(--tabpanel_bg);

		h1 { visibility:var(--visibility); font-size:var(--s1); }
		td.number { text-combine-upright:all; }

		dl dd :is(input,textarea),
		th > label + input,
		th fieldset label + input
		{
			border: 0;
			outline: var(--primary_cl) solid 1px;
			padding-block-start: .5em;
			padding-block-end: .25em;
		}

		legend#if-Preorder::after,
		label:has(+ input:optional)::after { content:"（可选）"; }

		dt:has(+ dd > input:required)::after { content:"*"; color:var(--alert_cl); }
	}

</style>