<script>
	export let 
		DateRange = new Date().toISOString().slice(0, -8), //TODO: get local ISO datetime string
		min = DateRange,
		max = DateRange;
</script>

<article class="this.cart" style="display:contents;">
	<h1>购物车</h1>

	<form>
		<table class="cart-items">
			<caption class="step__hd">订购信息</caption>
			<thead>
				<tr>
					<th>餐品</th>
					<th>单价</th>
					<th>数量</th>
					<th>金额</th>
				</tr>
			</thead>
			<tbody>
				<!--template v-for="i in cartItems"-->
					<tr class="h-item">
						<td class="p-name"></td>
						<td class="spec-price"></td>
						<td class="qty"></td>
						<td class="sub-total money"></td>
					</tr>
				<!--/template-->
			</tbody>
			<tfoot>
				<tr><th colspan="4">优惠蜜语</th></tr>
				<tr>
					<td colspan="3"><label>
						<input type="text" name="coupon-code" maxlength="15" />
					</label><td>
				</tr>
				<tr><th colspan="3">送餐费</th><td></tr>
				<tr><th colspan="3">总计</th><td></tr>
				<tr><th colspan="4">
					<label for="comment">备注说明
						<input type="text" name="comment" maxlength="15" />
					</label>
				</th></tr>
			</tfoot>
		</table>

		<address>
			配送信息
			<dl>
				<div>
					<dt>称呼
					<dd><input
						id="customer-name" type="text" name="customer-name" required maxlength="10" />
				</div>
				<div>
					<dt>手机
					<dd><input
						id="customer-tel" type="tel" name="customer-telephone" required maxlength="11" />
				</div>
				<div><dt>城市<dd>乌鲁木齐市</div>
				<div>
					<dt>地址
					<dd><textarea name="customer-address" required maxlength="50" />
				</div>
			</dl>
		</address>

		<fieldset class="payment">
			<legend>付款方式</legend>

			<fieldset>
				<label>预订<input type="checkbox" /></label>
				<fieldset>
				<input
					type="datetime-local"
					name="preorder-time"
					step="600000"
					bind:value={DateRange} {min} {max}/>
				</fieldset>
			</fieldset>

			<ol>
				<li class="payment-input">
					<input value="Cash" type="radio" name="payment" id="pay-by-cash" />
					<label for="pay-by-cash">现金付</label>
				</li>
				<li class="payment-input">
					<input value="wx_pub" type="radio" name="payment" id="pay-by-wx" />
					<label for="pay-by-wx">微信支付</label>
				</li>
				<li class="payment-input">
					<input value="alipay_wap" type="radio" name="payment" id="pay-by-alipay" />
					<label for="pay-by-alipay">支付宝</label>
				</li>
			</ol>
		</fieldset>

		<button type="submit">提交订单</button>
	</form>
</article>

<style lang="scss">
	/**Typesetting
   */
	.this\.cart > h1 {font-size: var(--s2);}

	/**Layout
   */
	
</style>