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
					<th role="rowheader" colspan="3"><label>
						优惠蜜语
						<input
							name="coupon-code"
							type="text"
							maxlength="15" />
					</label></th>
					<td class="number">-3
				</tr>
				<tr role="row"><th role="rowheader" colspan="3">总计</th><td class="number">138</td></tr>
				<tr role="row">
					<th role="rowheader" colspan="3"><label for="comment">
						备注
						<input
							type="text"
							name="comment"
							maxlength="15"/>
					</label></th>
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
				<div>
					<dt>称呼
					<dd><input
						name="customer-name" 
						type="text"
						required
						maxlength="10" />
				</div>
				<div>
					<dt>手机号
					<dd><input
						name="customer-telephone" 
						type="tel"
						required
						maxlength="11" />
				</div>
				<div><dt>城市<dd>乌鲁木齐市</div>
				<div>
					<dt>地址
					<dd><textarea
						name="customer-address"
						required
						maxlength="50" />
				</div>
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

	/**Layout
   */
	.this\.cart {
		position:static;
		padding: var(--padding);

		table {
			--numcol: #{$numcol};
			--numcol1:8; --numcol2:2; --numcol3:2; --numcol4:2;
			inline-size: min-content;
			display: flex;
			flex-flow: wrap;

			> * { flex:100%; }//justify-content:space-between; }
			tr > * { box-sizing: content-box; }

			thead, tbody {
				inline-size: max-content;
				display: flex;
				flex-wrap: wrap;

				@for $i from 1 to $numcol {
					tr :nth-child(#{$i}) {
						inline-size: calc(var(--numcol#{$i}) * 1em + (var(--numcol#{$i}) - 1) * var(--letter-spacing)); 
					}
				}
			}

			tfoot {
				display: flex;
				flex-flow: wrap;

				th[colspan="3"] {
					flex:calc(3 / var(--numcol) * 100%);
					> :is(label,fieldset) > * { flex-grow:1; }
				}

				fieldset label { order:-1; display:flex; }
			}

			tr :not(:first-child):last-child {
				inline-size: calc(var(--numcol4) * 1em + (var(--numcol4) - 1) * var(--letter-spacing));
			}

			th:has(label,fieldset) { display:flex; flex-flow:wrap; /*inline-size:min-content;*/ }
			th > fieldset legend { display:none; } //TODO: a11y
			th label input { order:1; }
			th:has(label,fieldset) + td { align-self:flex-end; }

			tr,
			:is(td,th) > :is(label,fieldset) 
			{ display:contents; }

			tr::after,
			:is(td,th) > :is(label,fieldset)::before
			{ order:1; content:""; flex:100%; width:0; } // simulate <hr>
		}

		address :has(> dt + dd) { display:flex; flex-flow:column; }
	}

	/**Appearance
   */
	.this\.cart  {
		color:inherit; border:0; background: var(--tabpanel_bg);

		h1 { visibility:var(--visibility); font-size:var(--s1); }
		td.number { text-combine-upright:all; }

		legend#if-Preorder::after,
		label:has(input:optional)::after { content:"（可选）"; position:relative; }

		dt:has(+ dd > :is(input,textarea):required)::after { content:"*"; color:var(--alert_cl); }
	}

</style>